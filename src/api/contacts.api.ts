
import { AxiosResponse, AxiosError } from 'axios';
import { Contact } from '../interfaces/contact';
import { failed, loading, success } from '../slices/contacts.slice';
import { api } from '../utils/api';
import { store } from '../utils/store';

export const getContacts = async (): Promise<Contact[]> => (
  new Promise((resolve, reject) => {
    store.dispatch(loading());
    api({ method: 'get', url: '/contacts' })
      .then((response: AxiosResponse<Contact[]>) => {
        store.dispatch(success(response.data));
        resolve(response.data);
      })
      .catch((error: AxiosError<string>) => {
        store.dispatch(failed(error.response?.data || 'Cannot get contacts'));
        reject(new Error(error.response?.data || 'Cannot get contacts'));
      });
  })
);
