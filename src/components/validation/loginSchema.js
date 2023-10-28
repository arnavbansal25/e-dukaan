import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email_phone: Yup.string()
    .required("Required!")
    .matches(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/, "Invalid Email/Phonr!"),
  password: Yup.string().required("Required!").min(5, "Too Short!"),
});
