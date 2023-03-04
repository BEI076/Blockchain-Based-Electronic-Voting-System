import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./Admin/Admin";
import Manage from "./Admin/Manage/Manage";
import Register from "./Admin/Register/Register";
import User from "./User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
