const localStorage = window.localStorage;

export default class LocalStorageService {
  getStorageState() {
    return localStorage;
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  hasItem(key) {
    return this.getItem(key);
  }

  initStorage(object) {
    Object.keys(object).forEach((key) => this.setItem(key, object[key]));
  }
}
