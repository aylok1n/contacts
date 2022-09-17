import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '../interfaces/auth';

interface AuthStateInterface {
  data: Auth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthStateInterface = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<Auth>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    failed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    logout(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    }
  },
});

export const { loading, success, failed, logout } = authSlice.actions;
export default authSlice.reducer;
