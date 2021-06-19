import AppStorage from 'libs/storage/AppStorage';

export const useLocalStore = () => {
  const get = (key) => {
    return AppStorage.get(key);
  };
  const set = (key, data) => {
    return AppStorage.set(key, data);
  };

  const del = (key) => {
    return AppStorage.remove(key);
  };
  return { get, set, del };
};