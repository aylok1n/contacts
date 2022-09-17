import localForage from 'localforage';
import { DBItems } from '../types/global';

const dbManager = {
  setItem<T>(name: DBItems, data: T): Promise<{ data: T }> {
    return new Promise((resolve, reject) => {
      localForage
        .setItem(name, { data })
        .then((value) => resolve(value))
        .catch(() => reject(new Error(`Cannot set ${name} item`)));
    });
  },

  getItem<T>(name: DBItems): Promise<T> {
    return new Promise((resolve, reject) => {
      localForage
        .getItem<{ data: T }>(name)
        .then((value) => {
          if (!value) {
            return reject(new Error(`Item ${name} does not have value`));
          }
          return resolve(value.data);
        })
        .catch(() => reject(new Error(`Cannot get ${name} item`)));
    });
  },

  removeItem(name: string): Promise<void> {
    return localForage.removeItem(name);
  },

};

export default dbManager;
