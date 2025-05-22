import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Collection } from "./pages/Collection";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { PlaceOrder } from "./pages/PlaceOrder.jsx";
import { Orders } from "./pages/Orders";
import { ShopContextProvider } from "./context/ShopContext";
import { Verify } from "./pages/Verify.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ShopContextProvider>
        <Root />
      </ShopContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/place-order",
        element: <PlaceOrder />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
