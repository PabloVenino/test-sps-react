import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/User/Users";
import UserEdit, { userLoader } from "./pages/User/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id",
    element: <UserEdit />,
    loader: userLoader,
  }
]);

export default router;
