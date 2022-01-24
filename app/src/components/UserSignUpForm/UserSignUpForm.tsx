import React, { FC, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { XIcon } from "@heroicons/react/solid";
import { IUserSignUp } from "./IUserSignUp";
import { validationSchema } from "./validationShema";
import InputNames from "./InputNames/InputNames";
import InputEmail from "./InputEmail/InputEmail";
import InputPassword from "./InputPassword/InputPassword";
import InputConfirmPassword from "./InputConfirmPassword/InputConfirmPassword";
import { IServerErrors } from "./IServerErrors";
import ButtonLogIn from "./ButtonLogIn/ButtonLogIn";
import ButtonRegistration from "./ButtonRegistation/ButtonRegistration";
import AuthService from "../../api/AuthService";
import { IPropsUserSignUpForm } from "./IPropsUserSignUpForm";

const UserSignUpForm: FC<IPropsUserSignUpForm> = ({
  setActive,
  handleLogInPopUp,
}) => {
  const [serverErrors, setServerErrors] = useState<IServerErrors>({
    email: "",
    password: "",
  });

  const redirectToLogIn = () => {
    setActive();
    handleLogInPopUp();
  };

  const closeModal = () => {
    setActive();
  };

  const onSubmitDataSignUp = async (
    values: IUserSignUp,
    actions: FormikHelpers<IUserSignUp>
  ) => {
    const dataForSignUp: IUserSignUp = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
    };
    try {
      const response = await AuthService.signUp(dataForSignUp);
      if (response) {
        setServerErrors({ email: "", password: "" });
        actions.resetForm();
        setActive();
        handleLogInPopUp();
      }
    } catch (e: any) {
      setServerErrors(e.response.data);
    }
  };

  const initialValues: IUserSignUp = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmitDataSignUp}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <div
          className="max-w-md w-full space-y-8 shadow p-8 bg-white rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-500 font-body font-extrabold">
              Sign up
            </h2>
            <button onClick={closeModal}>
              <XIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
            </button>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md ">
              <div className="flex items-center justify-between ">
                <InputNames
                  error={errors.first_name}
                  labelName="First Name"
                  value={values.first_name}
                  name="first_name"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.first_name}
                  placeholder="First Name"
                />
                <InputNames
                  error={errors.last_name}
                  labelName="Last Name"
                  value={values.last_name}
                  name="last_name"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.last_name}
                  placeholder="Last Name"
                />
              </div>
              <div className="mt-3">
                <InputEmail
                  error={errors.email}
                  labelName="E-mail"
                  value={values.email}
                  name="email"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.email}
                  placeholder="name@example.com"
                  serverError={serverErrors?.email}
                  setServerError={setServerErrors}
                />
              </div>
              <div className="mt-3">
                <InputPassword
                  error={errors.password}
                  labelName="Password"
                  value={values.password}
                  name="password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.password}
                  placeholder="Enter Password"
                  serverError={serverErrors?.password}
                  setServerError={setServerErrors}
                />
              </div>
              <div className="mt-3 ">
                <InputConfirmPassword
                  error={errors.confirm_password}
                  labelName="Re-enter password"
                  value={values.confirm_password}
                  name="confirm_password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.confirm_password}
                  placeholder="Repeat Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ButtonRegistration isValid={isValid} dirty={dirty}>
                Create account
              </ButtonRegistration>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <span className="text-gray-600 font-body text-xs">
              Already have an account?
            </span>
            <ButtonLogIn redirectToLogIn={redirectToLogIn}>
              {" "}
              Log in!{" "}
            </ButtonLogIn>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default UserSignUpForm;
