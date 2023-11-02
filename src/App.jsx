import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AppProvider } from "./contexts";
import { ChakraProvider } from "@chakra-ui/react";
/** */
function App() {
  return (
    <>
      <ChakraProvider>
        <AppProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AppProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
