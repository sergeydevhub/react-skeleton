import { LocalStorageAllowedKeys } from "./types";

export const STORAGE_KEY: LocalStorageAllowedKeys = 'STORE';

type TStorage = Record<LocalStorageAllowedKeys, any>;

export function save<T extends TStorage>(key: keyof T, data: T[keyof T] | object): void {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    throw new Error('store serialization failed');
  }
}

export function loadAll<T extends TStorage>(): T | null | undefined {
  return load(STORAGE_KEY);
}

export function load<T extends TStorage>(key: string): T | null | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    throw new Error('store deserialization failed');
  }
}
