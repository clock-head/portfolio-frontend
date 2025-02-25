// import Modal from '../components/Modal/Modal';
//import Error from '../src/components/Error/Error.jsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '../src/components/Layout';
import SignUp from '../src/pages/Auth/SignUp';
import { http, HttpResponse } from 'msw';
import { server } from '../src/mocks/server';

describe('error redirect modal behaviour', () => {
  it('should appear upon validation error: "email exists, would you like to sign in?"', () => {
    // send a http post request to mock service workers
    server.resetHandlers(
      http.post('http://localhost:3000/api/1.0/auth/sign-up', () => {
        return new HttpResponse(
          JSON.stringify({
            validationErrors: {
              email: 'this email exists',
            },
          }),
          { status: 402 }
        );
      })
    );
    // mock service workers should return a validation error response

    render(<SignUp />);

    const signUpButton = screen.getByRole('button', { name: /Sign Up/ });

    // upon receiving validation error response, error modal should appear
    const user = userEvent.setup();

    user.click(signUpButton);

    const heading = screen.getByText('this email exists', { exact: false });
    expect(heading).toBeDefined();
  });
});
