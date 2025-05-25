import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { describe, expect, it, vi } from 'vitest';

vi.useFakeTimers();

describe('App', () => {
  it('should show loading screen initially', () => {
    render(
      <MemoryRouter initialEntries={['/erp-prism-frontend/']}>
        <App />
      </MemoryRouter>
    );

    // Karena loadingText "Authenticating"
    expect(screen.getByText(/authenticating/i)).toBeInTheDocument();
  });
});
