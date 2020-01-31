const STORAGE_KEY = 'STORE';

export function save<T = {}>(storeState: T): void {
  try {
    const serializedState = JSON.stringify(storeState);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    throw new Error('store serialization failed');
  }
}

export function load<T = {}>(): T | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    throw new Error('store deserialization failed');
  }
}
