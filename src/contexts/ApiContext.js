import {createContext} from "react";
// app-data
import mockService from "../service";

// --------------------------------------------------------

const ApiContext = createContext(null);

function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={mockService}>
      {children}
    </ApiContext.Provider>
  )
}

export {
  ApiProvider,
  ApiContext
}
