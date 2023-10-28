import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { logo } from "../../assets";
import { styles } from "../utils/utils";
import { registerSchema } from "../validation/registrerSchema";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (var i = 0; i < users?.length; i += 1) {
      if (users[i]?.email === newUser?.email) {
        toast.error("User with same email already registered!");
        return;
      } else if (users[i]?.phone === newUser?.phone) {
        toast.error("User with same phone number already registered!");
        return;
      }
    }

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    toast.success("Registered Successfully, please login!");
    navigate("/login");
  };

  return (
    <div className="flex flex-row w-full">
      <div className="py-12 flex-1">
        <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:w-1/2 lg:flex justify-center items-center">
            <img className="rounded-full" src={logo} alt="e-dukaan-logo" />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="flex items-center justify-center my-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Already a User? Login
              </h1>
            </div>

            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleRegister}
            >
              <Form>
                <label className={styles.label} htmlFor="name">
                  Full Name
                </label>
                <Field className={styles.field} id="name" name="name" />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="name"
                />

                <label className={styles.label} htmlFor="phone">
                  Phone
                </label>
                <Field
                  className={styles.field}
                  // type="number"
                  id="phone"
                  name="phone"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="phone"
                />

                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <Field className={styles.field} id="email" name="email" />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="email"
                />

                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <Field className={styles.field} id="password" name="password" />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="password"
                />
                <div className="mt-8">
                  <button type="submit" className={styles.button}>
                    Register
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
