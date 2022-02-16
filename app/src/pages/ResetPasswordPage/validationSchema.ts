import * as yup from "yup";

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^((?=^\S+$)(?=.*\d)(?=.*[a-zA-Z]).{8,})$/,
      "Password must be at least 8 characters, letters, numbers and no spaces!"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "The passwords don't match!")
    .required("Confirm Password is required!"),
});
