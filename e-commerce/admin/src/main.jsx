import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./Root";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/add" />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
