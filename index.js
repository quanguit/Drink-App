import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import CartProvider from "./src/provider/cart.provider.jsx";
import App from "./App";

ReactDOM.render(
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>,
  document.getElementById("root")
);
