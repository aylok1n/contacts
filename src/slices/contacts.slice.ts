import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../interfaces/contact';

interface ContactsStateInterface {
  data: Contact[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactsStateInterface = {
  data: null,
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<Contact[]>) {
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

export const { loading, success, failed, logout } = contactsSlice.actions;
export default contactsSlice.reducer;
