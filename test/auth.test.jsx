import React from 'react';
import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { server } from '../src/mocks/server';

import Form from '../src/components/Form/Form';
import SignUp from '../src/pages/Auth/SignUp';

describe('sign up form', () => {
  it('calls onSubmit with correct data as provided', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Form authType={`Sign Up`} onSubmit={mockSubmit} />
      </MemoryRouter>
    );

    const roleDropDown = screen.getByLabelText(
      'what best describes your role',
      { exact: false }
    );

    expect(roleDropDown).toBeDefined();

    const emailField = screen.getByLabelText('Email');
    const passwordField = screen.getByLabelText('Password');
    const confirmPasswordField = screen.getByLabelText('Confirm Password');
    const firstNameField = screen.getByLabelText('First Name');
    const lastNameField = screen.getByLabelText('Last Name');

    const submitButton = screen.getByRole('button', { name: /Sign Up/ });

    const emailInput = 'test@test.com';
    await user.type(emailField, emailInput);

    const passwordInput = 'p@ssw0rD';
    await user.type(passwordField, passwordInput);

    const confirmPasswordInput = 'p@ssw0rD';
    await user.type(confirmPasswordField, confirmPasswordInput);

    const firstNameInput = 'James';
    await user.type(firstNameField, firstNameInput);

    const lastNameInput = 'Chia';
    await user.type(lastNameField, lastNameInput);

    await user.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith({
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        role: 'project-manager',
        acquisitionChannel: [],
      })
    );
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('should render fieldSet checkboxes', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const dropDownQuestion = screen.getByText(/what best describes your role/i);

    expect(dropDownQuestion).toBeDefined();

    const googleLabel = screen.getByText('Google');
    const linkedInLabel = screen.getByText('LinkedIn');

    expect(googleLabel).toBeDefined();
    expect(linkedInLabel).toBeDefined();
  });

  it('should handle errors and display them on sign up form', async () => {
    server.resetHandlers(
      http.post('http://localhost:3000/api/1.0/auth/sign-up', () => {
        return new HttpResponse(
          JSON.stringify({
            validationErrors: {
              email: 'please enter a valid email',
              password:
                'password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol character',
              confirmPassword: 'passwords do not match.',
              firstName: 'first name required.',
              lastName: 'last name required.',
              acquisition: 'please select at least one.',
            },
          }),
          { status: 402 }
        );
      })
    );

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /Sign Up/ });

    await user.click(submitButton);

    const emailErrorMessage = screen.getByText('please enter a valid email');
    expect(emailErrorMessage).toBeDefined();

    const passwordErrorMessage = screen.getByText(
      'password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol character'
    );
    expect(passwordErrorMessage).toBeDefined();

    const confirmPassword = screen.getByText('passwords do not match.');
    expect(confirmPassword).toBeDefined();

    const firstName = screen.getByText('first name required.');
    expect(firstName).toBeDefined();

    const lastName = screen.getByText('last name required.');
    expect(lastName).toBeDefined();

    const acquisition = screen.getByText('please select at least one.');
    expect(acquisition).toBeDefined();
  });
});
