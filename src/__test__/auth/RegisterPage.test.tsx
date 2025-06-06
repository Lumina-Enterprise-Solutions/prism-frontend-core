import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { RegisterPage } from '../../pages/Auth/register';

describe('RegisterPage', () => {
  it('renders register title', async () => {
    renderWithProviders(<RegisterPage />);
    const heading = await screen.findByRole('heading', {
      name: /Create an account/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('always runs this simple test', () => {
    expect(true).toBe(true);
  });
});
