import Axios, {
  AxiosError,
  AxiosInstance, AxiosRequestHeaders, AxiosResponse, Method,
} from 'axios';
import { Auth } from '../interfaces/auth';
import { logout } from '../slices/auth.slice';
import { store } from './store';
import { DBItems } from '../types/global';
import dbManager from './dbManager';

interface APIInterface {
  method: Method;
  url: string;
  headers?: AxiosRequestHeaders;
  data?: any;
}

export const axios: AxiosInstance = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getToken = (): Promise<Auth> => dbManager.getItem<Auth>(DBItems.AUTH);

export const getAuthHeaders = (at: string): { [key: string]: string } => ({ Authorization: `Bearer ${at}` });

export const api = ({
  method, url, headers, data,
}: APIInterface): Promise<AxiosResponse> => new Promise((resolve, reject) => {
  getToken()
    .then((value) => {
      const authHeaders = getAuthHeaders(value.accessToken);
      axios({
        method, url, headers: { ...headers, ...authHeaders }, data,
      }).then((response: AxiosResponse) => {
        resolve(response);
      }).catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          store.dispatch(logout())
        } else {
          reject(error);
        }
      });
    })
    .catch((error: { reason: string }) => reject(error.reason));
});
