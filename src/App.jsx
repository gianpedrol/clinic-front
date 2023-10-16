import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
/** */
function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
