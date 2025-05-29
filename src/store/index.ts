import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './slices/tenant';
import authReducer from './slices/auth';
import registerReducer from './slices/register';

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    auth: authReducer,
    register: registerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;