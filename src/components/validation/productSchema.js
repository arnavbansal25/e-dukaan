import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  desc: Yup.string().required("Required!"),
  price: Yup.number().required("Required!"),
  // tags: Yup.array().required("Required!"),
  availability: Yup.boolean().required("Required!"),
  count: Yup.number().required("Required!"),
});
