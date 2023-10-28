import * as Yup from "yup";

export const shopSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  bio: Yup.string().required("Required!"),
  address: Yup.string().required("Required!"),
  lat: Yup.string().required("Required!"),
  long: Yup.string().required("Required!"),
});
