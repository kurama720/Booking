import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Must be only letters")
    .min(2, "The minimum letters be 2!")
    .max(32, "The maximum letters be 32!")
    .required("First Name is required!"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Must be only letters")
    .min(2, "The minimum letters be 2!")
    .max(32, "The maximum letters be 32!")
    .required("Last Name is required!"),
});
