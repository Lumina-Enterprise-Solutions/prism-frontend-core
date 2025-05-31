import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial state
const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  void,
  { email: string; password: string; first_name?: string, last_name?: string }, // input type
  { rejectValue: string } // error type
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    await axios.post('/auth/register', userData, {
      withCredentials: true,
    });
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Register failed');
  }
});

// Slice
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegister: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
