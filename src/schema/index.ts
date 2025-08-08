import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address is too short"),
});

export default schema;