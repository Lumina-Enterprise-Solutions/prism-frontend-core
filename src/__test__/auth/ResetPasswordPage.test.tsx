import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { ResetPasswordPage } from '../../pages/Auth/reset-password';

describe('ResetPasswordPage', () => {
  it('renders reset_password title', async () => {
    renderWithProviders(<ResetPasswordPage />);
    const heading = await screen.findByRole('heading', {
      name: /Reset Password/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('always runs this simple test', () => {
    expect(true).toBe(true);
  });
});
