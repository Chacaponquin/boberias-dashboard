import { ModalProvider } from "./modal/contexts/ModalProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  { path: "/login", element: <Login /> },
]);

export default function App() {
  return (
    <ModalProvider>
      <Toaster position="top-right" />

      <RouterProvider router={router} />
    </ModalProvider>
  );
}
