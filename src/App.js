import React from "react";
import Router from "./route";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
