import MockService from "./mockService";

import users from "../mock/users.json";
import organisations from "../mock/organisations.json";

// ----------------------------------------------------------------

const initialStorage = {
  ...users,
  ...organisations
};

export default new MockService(initialStorage);
