
import { AxiosResponse, AxiosError } from 'axios';
import { Contact } from '../interfaces/contact';
import {
  failed,
  loadingList,
  success,
  loadingDelete,
  remove,
  loadingForm,
  add,
  edit,
  formFailed
} from '../slices/contacts.slice';
import { api } from '../utils/api';
import { store } from '../utils/store';

export const getContacts = async (): Promise<Contact[]> => (
  new Promise((resolve, reject) => {
    store.dispatch(loadingList());
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

export const createContact = async (data: Omit<Contact, 'id'>): Promise<Contact> => (
  new Promise((resolve, reject) => {
    store.dispatch(loadingForm());
    api({ method: 'post', url: '/contacts', data })
      .then((response: AxiosResponse) => {
        store.dispatch(add(response.data));
        resolve(response.data);
      })
      .catch((error: AxiosError<string>) => {
        store.dispatch(formFailed(error.response?.data || 'Cannot remove'));
        reject(new Error(error.response?.data || 'Cannot remove'));
      });
  })
);

export const editContact = async ({ id, ...patch }: Contact): Promise<Contact> => (
  new Promise((resolve, reject) => {
    store.dispatch(loadingForm());
    api({ method: 'patch', url: `/contacts/${id}`, data: patch })
      .then((response: AxiosResponse) => {
        store.dispatch(edit(response.data));
        resolve(response.data);
      })
      .catch((error: AxiosError<string>) => {
        store.dispatch(formFailed(error.response?.data || 'Cannot remove'));
        reject(new Error(error.response?.data || 'Cannot remove'));
      });
  })
);

export const deleteContact = async (id: Contact['id']): Promise<void> => (
  new Promise((resolve, reject) => {
    store.dispatch(loadingDelete());
    api({ method: 'delete', url: `/contacts/${id}` })
      .then(() => {
        store.dispatch(remove(id));
        resolve();
      })
      .catch((error: AxiosError<string>) => {
        store.dispatch(failed(error.response?.data || 'Cannot remove'));
        reject(new Error(error.response?.data || 'Cannot remove'));
      });
  })
);
