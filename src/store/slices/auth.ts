import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const getTokenFromCookie = (): string | null => {
  return Cookies.get('access_token') || null;
};

const initialState: AuthState = {
  token: getTokenFromCookie(),
  isAuthenticated: !!getTokenFromCookie(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ access_token: string, tenant_id: string }>) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      Cookies.set("access_token", action.payload.access_token, { expires: 7 });
      Cookies.set("tenant_id", action.payload.tenant_id, { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('access_token');
      Cookies.remove('tenant_id');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;