import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./Lib/react-query/QueryProvider.js";
import { AuthProvider } from "./Context/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </ChakraProvider>
);
