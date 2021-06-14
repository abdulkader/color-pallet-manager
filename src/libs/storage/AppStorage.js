import BaseStorage from './BaseStorage';

export const STORAGE_NAME = 'COLOR_PALLET_MANAGER';
export const STORAGE_EXPIRY = 60 * 60 * 24 * 7;
export const STORAGE_CACHE_KEY = 'app_';

class AppStorage extends BaseStorage {
  constructor(options) {
    super(
      options || {
        expiry: STORAGE_EXPIRY,
        name: STORAGE_NAME,
        prefix: STORAGE_CACHE_KEY,
      }
    );
  }
}

export default new AppStorage();
