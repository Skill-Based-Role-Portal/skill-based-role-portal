// General imports
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Main from "./views/Dashboard/Main";
import RoleListingsPage from "./views/RoleListings/RoleListings";
import Login from "./views/Auth/Login";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const isHumanResource = currentUser?.access_rights === "Human Resource";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Main name={"Home"} />,
        },
        isHumanResource && {
          path: "role-listings",
          element: <RoleListingsPage name={"Role Listings"} />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
