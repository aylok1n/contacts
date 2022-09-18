import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import contactsSlice from '../slices/contacts.slice';

export const store = configureStore({
  reducer: {
    authSlice,
    contactsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
