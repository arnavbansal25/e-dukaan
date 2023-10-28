import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { logo } from "../../assets";
import { styles } from "../utils/utils";
import { loginSchema } from "../validation/loginSchema";
import { setCurrUser } from "../../redux/slices/userSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handleLogin = ({ email_phone, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userInfo = users?.filter(
      (u) => u?.email === email_phone || u?.phone === email_phone
    );
    if (userInfo?.length !== 0) {
      toast.success("Logged In Successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setCurrUser(userInfo[0]));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("recent-login", JSON.stringify(userInfo[0]));
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen items-center">
      <div className="py-12 flex-1">
        <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:w-1/2 lg:flex justify-center items-center">
            <img className="rounded-full" src={logo} alt="e-dukaan-logo" />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <div
              onClick={() => {
                navigate("/register");
              }}
              className="flex items-center justify-center my-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                New User? Register!
              </h1>
            </div>
            <Formik
              initialValues={{
                email_phone: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <label className={styles.label} htmlFor="email_phone">
                  Email/Phone
                </label>
                <Field
                  className={styles.field}
                  id="email_phone"
                  name="email_phone"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="email_phone"
                />

                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  className={styles.field}
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="password"
                />
                <div className="mt-8">
                  <button type="submit" className={styles.button}>
                    Login
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
