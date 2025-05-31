import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store';
import { I18nextProvider } from 'react-i18next';
import i18n from '../helper/i18nForTest';

const queryClient = new QueryClient();

export const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[route]}>
                    <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );
};
