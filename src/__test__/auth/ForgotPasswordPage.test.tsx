import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { ForgotPasswordPage } from '../../pages/Auth/forgot-password';

describe('ForgotPasswordPage', () => {
  it('renders forgot_password title', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    const heading = await screen.findByRole('heading', {
      name: /Forgot Password/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('always runs this simple test', () => {
    expect(true).toBe(true);
  });
});
