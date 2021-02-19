import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  get = (key: string) => {
    const value = localStorage.getItem(key);
    try {
      // @ts-ignore
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }


  set = (key: string, value: any, id: number) => {
    const user: any = {
      id: id,
      value: value
    };
    if (value && typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(user) );
    } else {
      localStorage.setItem(key, JSON.stringify(user));
    }
  }

  delete = (key: string | null | undefined) => {
    if (key != null) {
      localStorage.removeItem(key);
    }
  }

  clearAll = () => {
    localStorage.clear();
  }
}
