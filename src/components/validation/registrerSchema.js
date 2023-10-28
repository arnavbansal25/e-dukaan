import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  phone: Yup.number().required("Required!").min(10, "Invalid Number!"),
  email: Yup.string()
    .required("Required!")
    .matches(/^\w+@\w+\.\w{2,3}$/, "Invalid Email!"),
  password: Yup.string().required("Required!").min(5, "Too Short!"),
});
