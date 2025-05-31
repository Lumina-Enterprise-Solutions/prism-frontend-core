import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TenantState {
  id: string | null;
  name: string;
}

const initialState: TenantState = {
  id: null,
  name: '',
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (_state, action: PayloadAction<TenantState>) => {
      return action.payload;
    },
    clearTenant: () => initialState,
  },
});

export const { setTenant, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;