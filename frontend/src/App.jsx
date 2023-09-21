import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout/MainLayout";

import Main from "./views/Main";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Main />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
