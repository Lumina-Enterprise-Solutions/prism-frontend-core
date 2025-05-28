import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './slices/tenant';
import authReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;