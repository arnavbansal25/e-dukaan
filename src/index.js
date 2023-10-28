import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/common/Home";
import Shop from "./components/dashboard/Shop";
import Header from "./components/common/Header";
import ErrorPage from "./components/common/ErrorPage";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import { RegisterForm } from "./components/auth/RegisterForm";

import store from "./redux/store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />
      <Outlet />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/shop/:shopId",
        element: <Shop />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
