import { Auth } from '../interfaces/auth';
import { AxiosResponse, AxiosError } from 'axios';
import { failed, loading, logout, success } from '../slices/auth.slice';
import { store } from '../utils/store';
import { axios, getToken } from '../utils/api';
import dbManager from '../utils/dbManager';
import { DBItems } from '../types/global';

export const authorize = (payload?: { email: string, password: string }): Promise<Auth> => (
  new Promise((resolve, reject) => {
    store.dispatch(loading());
    getToken()
      .then((value) => {
        store.dispatch(success(value));
        resolve(value);
      })
      .catch(() => {
        if (payload) {
          axios({ method: 'post', url: '/login', data: payload })
            .then((response: AxiosResponse<Auth>) => {
              dbManager.setItem<Auth>(DBItems.AUTH, response.data);
              store.dispatch(success(response.data));
              resolve(response.data);
            })
            .catch((error: AxiosError<string>) => {
              store.dispatch(failed(error.response?.data || 'Cannot authorize'));
              reject(new Error(error.response?.data || 'Cannot authorize'));
            });
        }
        else store.dispatch(logout());
      });
  })
);
