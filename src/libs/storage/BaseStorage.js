class BaseStorage {
  constructor(options = {}) {
    this.options = {
      appName: 'app',
      expiry: 60 * 60,
      name: '',
      prefix: 'app_',
    };
    Object.assign(this.options, options);
    if (!this.options.name) {
      throw new Error('Storage Name is missing');
    }
    this.storage = typeof window !== 'undefined' ? window.localStorage : {};
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.remove = this.remove.bind(this);
    this.storageKey = `${this.options.appName}__${this.options.prefix}`;
  }

  get(key) {
    const data = this.storage.getItem(`${this.storageKey}${key}`);
    if (data) {
      const parsed = JSON.parse(data);
      const now = Date.now();
      const { expiry } = this.options;
      const { value, timeStored } = parsed;
      if (expiry && now - timeStored > expiry * 1000) {
        this.remove(key);
        return undefined;
      }
      return value;
    }
    return null;
  }

  set(key, value) {
    const timeStored = Date.now();
    const { expiry } = this.options;
    const data = JSON.stringify({
      timeStored,
      ttl: expiry,
      value,
    });
    return this.storage.setItem(`${this.storageKey}${key}`, data);
  }

  remove(key) {
    return this.storage.removeItem(`${this.storageKey}${key}`);
  }
}

export default BaseStorage;
