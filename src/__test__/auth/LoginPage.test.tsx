import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { LoginPage } from '../../pages/Auth/Login';
import { renderWithProviders } from '../../utils/test-utils';

describe('LoginPage', () => {
  it('renders login title', async () => {
    renderWithProviders(<LoginPage />);
    const heading = await screen.findByRole('heading', { name: /Login to your account/i });
    expect(heading).toBeInTheDocument();
  });

  it('always runs this simple test', () => {
    expect(true).toBe(true);
  });
});
