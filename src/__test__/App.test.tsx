import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import '@testing-library/jest-dom';

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
