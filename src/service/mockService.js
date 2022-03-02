import LocalStorageService from "./localStorageService";

const storage = new LocalStorageService();

export default class MockService {
  organisations = 'organisations';
  users = 'users';

  constructor(initialStorage) {
    if (initialStorage) storage.initStorage(initialStorage);
  }

  getOrganisations = () => {
    return storage.getItem(this.organisations);
  }

  getOrganisation = (id) => {
    return findItemById(this.getOrganisations(), id);
  }

  getUsers = () => {
    return storage.getItem(this.users);
  }

  setUsers = (users) => {
    storage.setItem(this.users, users);
  }

  getUser = (id) => {
    return findItemById(this.getUsers(), id);
  }
}

function findItemById(array = [], id) {
  return array.find((item) => item.id === id);
}
