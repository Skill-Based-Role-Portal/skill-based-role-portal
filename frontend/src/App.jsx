// General imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Main from "./views/Dashboard/Main";
import RoleListingsPage from "./views/RoleListings/RoleListings";
import CreateRoleListingPage from "./views/RoleListings/CreateRoleListing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Main name={"Home"} />,
        },
        {
          path: "role-listings",
          element: <RoleListingsPage name={"Role Listings"} />,
        },
        // {
        //   path: "create-role-listing",
        //   element: <CreateRoleListingPage name={"Role Creation"} />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
