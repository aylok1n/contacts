import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../interfaces/contact';

interface ContactsStateInterface {
  data: Contact[] | null;
  loadingList: boolean;
  loadingDelete: boolean;
  loadingForm: boolean;
  error: string | null;
  deleteError: string | null,
  errorForm: string | null;
}

const initialState: ContactsStateInterface = {
  data: null,
  loadingList: false,
  loadingDelete: false,
  error: null,
  deleteError: null,
  loadingForm: false,
  errorForm: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    loadingList(state) {
      state.loadingList = true;
      state.error = null;
    },
    success(state, action: PayloadAction<Contact[]>) {
      state.loadingList = false;
      state.data = action.payload;
      state.error = null;
    },
    failed(state, action: PayloadAction<string>) {
      state.loadingList = false;
      state.data = null;
      state.error = action.payload;
    },
    loadingDelete(state) {
      state.loadingDelete = true;
    },
    remove(state: ContactsStateInterface, action: PayloadAction<Contact['id']>) {
      state.data = state.data?.filter((contact: Contact) => contact.id !== action.payload) || null
      state.loadingDelete = false;
    },
    loadingForm(state) {
      state.loadingForm = true;
      state.errorForm = null
    },
    add(state: ContactsStateInterface, action: PayloadAction<Contact>) {
      state.data = state.data ? [...state.data, action.payload] : null
      state.loadingForm = false;
      state.errorForm = null;
    },
    edit(state: ContactsStateInterface, action: PayloadAction<Contact>) {
      state.data = state.data?.map((contact) => contact.id === action.payload.id ? action.payload : contact) || null
      state.loadingForm = false;
      state.errorForm = null;
    },
    formFailed(state, action: PayloadAction<string>) {
      state.loadingForm = false;
      state.errorForm = action.payload;
    }
  },
});

export const {
  loadingList,
  success, failed,
  loadingDelete,
  remove,
  loadingForm,
  add,
  edit,
  formFailed
} = contactsSlice.actions;
export default contactsSlice.reducer;
