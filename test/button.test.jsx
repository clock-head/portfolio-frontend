import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../src/components/Button/Button';
import ThemeToggler from '../src/components/ThemeToggler';
import WriteArticle from '../src/components/WriteArticle';

describe('Button component', () => {
  it('should display text "Set Theme" when used in the ThemeToggler Component', () => {
    // Arrange
    render(<ThemeToggler />);

    // Act
    const buttonElement = screen.getByText(/Set Theme/i);

    // Assert
    expect(buttonElement).toBeDefined();
  });

  it('should display text "Submit" when used in the WriteArticle Component', () => {
    // Arrange
    render(<WriteArticle />);

    // Act
    const buttonElement = screen.getByText(/submit/i);

    // Assert
    expect(buttonElement).toBeDefined();
  });
});
