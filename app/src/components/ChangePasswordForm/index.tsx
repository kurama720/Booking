import React, { FC } from "react";
import { Formik } from "formik";
import { XIcon } from "@heroicons/react/solid";
import ButtonRegistration from "../UserSignUpForm/ButtonRegistation/ButtonRegistration";
import InputPassword from "../UserSignUpForm/InputPassword/InputPassword";
import { validationSchema } from "./validationSchema";

const ChangePasswordForm: FC = () => {
  const initialValues = {
    previous_password: "",
    password: "",
    confirm_password: "",
  };

  const handleFormSubmit = () => {
    console.log("kekw");
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={handleFormSubmit}
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
            <h2 className="text-3xl font-extrabold text-gray-500 font-body">
              Change password
            </h2>
            <button type="button">
              <XIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
            </button>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md ">
              <div className="mt-3">
                <InputPassword
                  error={errors.previous_password}
                  labelName="Current password"
                  value={values.previous_password}
                  name="previous_password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.previous_password}
                  placeholder="Enter Password"
                />
              </div>
              <div className="flex justify-end my-6">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 font-body cursor-pointer">
                  Forgot your password?
                </span>
              </div>
              <div className="mt-3">
                <InputPassword
                  error={errors.password}
                  labelName="New password"
                  value={values.password}
                  name="password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.password}
                  placeholder="Enter Password"
                />
              </div>
              <div className="mt-3 ">
                <InputPassword
                  error={errors.confirm_password}
                  labelName="Confirm new password"
                  value={values.confirm_password}
                  name="confirm_password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.confirm_password}
                  placeholder="Repeat password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ButtonRegistration isValid={isValid} dirty={dirty}>
                Save changes
              </ButtonRegistration>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
