// src/pages/Auth/Login.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/Auth/Login';

// Helper render with router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage', () => {
  it('renders the login title and description', () => {
    renderWithRouter(<LoginPage />);

    expect(
      screen.getByRole('heading', { name: /login to your account/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/enter your email below to login/i)
    ).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders the login button and GitHub login', () => {
    renderWithRouter(<LoginPage />);

    expect(
      screen.getByRole('button', { name: /^login$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /login with github/i })
    ).toBeInTheDocument();
  });

  it('renders forgot password and sign up links', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });
});
