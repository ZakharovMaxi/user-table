import React from 'react';
// @mui
import CssBaseline from "@mui/material/CssBaseline";
// context
import { ApiProvider } from "../../contexts/ApiContext";
// components
import Main from "../Main/";

// ---------------------------------------------------------------------------------------------------------------------

export default function App() {
  return (
    <ApiProvider>
      <CssBaseline />
      <Main />
    </ApiProvider>
  );
}
