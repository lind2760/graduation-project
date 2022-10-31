import React from "react";
import CRouter from "@/routes";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <CRouter />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
