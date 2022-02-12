import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { DatabaseIcon } from "@heroicons/react/outline";
import ButtonRegistration from "../../components/UserSignUpForm/ButtonRegistation/ButtonRegistration";
import InputPassword from "../../components/UserSignUpForm/InputPassword/InputPassword";
import { validationSchema } from "./validationSchema";

type ResetPasswordPageParams = {
  uid: string;
  token: string;
};

type FormikInitialState = {
  password: string;
  confirm_password: string;
};

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const ResetPasswordPage: FC = () => {
  const { uid, token } = useParams<ResetPasswordPageParams>();
  const [isTokenValid, setTokenValid] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/accounts/password-reset/${uid}/${token}`)
      .then(() => {
        setTokenValid(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const initialValues: FormikInitialState = {
    password: "",
    confirm_password: "",
  };

  const handleFormSubmit = (values: FormikInitialState) => {
    instance
      .patch("/accounts/password-reset-complete/", {
        password: values.password,
        token,
        uid64: uid,
      })
      .finally(() => navigate("/"));
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
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
        <div className="max-w-md w-full space-y-8 m-auto shadow p-8 bg-white rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-500 font-body">
              Create new password
            </h2>
          </div>
          {isLoading && (
            <DatabaseIcon className="w-8 animate-bounce mx-auto mt-3 text-gray-500" />
          )}
          {!isLoading && isTokenValid && (
            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
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
              <div className="flex items-center justify-between">
                <ButtonRegistration isValid={isValid} dirty={dirty}>
                  Save changes
                </ButtonRegistration>
              </div>
            </form>
          )}
          {!isLoading && !isTokenValid && (
            <span className="block font-body text-gray-700">
              The link is no longer valid. You will be redirected to the main
              page...
            </span>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ResetPasswordPage;
