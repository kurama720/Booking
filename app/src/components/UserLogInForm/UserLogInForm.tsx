import React, { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { UserLogin } from "../UserLogInForm/utils/interfaces/interfaces";
import * as yup from "yup";
import { Paths } from "../../paths/path";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import axios from "axios";

const UserLogInForm = () => {
  const [popUpStatus, setPopUpStatus] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [token, setToken] = useState(null);

  const submitUserInformation = async (values: UserLogin) => {
    try {
      const data = await axios.post(
        `http://localhost:5000${Paths.LOG_IN}`,
        values
      );

      if (data) {
        // setToken(data.token)
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            // token: data.token
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  let history = useNavigate();

  const validationSchema = yup.object().shape({});

  const handlePopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleChacked = () => {
    setChecked((prev) => !prev);
  };

  const handleRoutePage = () => {
    history(Paths.SIGN_UP);
  };

  return (
    <div className="w-screen flex justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(
          values: UserLogin,
          { setSubmitting }: FormikHelpers<UserLogin>
        ) => {
          setTimeout(() => {
            submitUserInformation(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <div
            className={
              popUpStatus
                ? `rounded-md py-8 px-8 w-6/12 max-w-lg mt-36 shadow`
                : `rounded-md  mt-36 shadow`
            }
          >
            <div className="w-full">
              {!popUpStatus ? (
                <div>
                  <button
                    className="px-3.5 py-2.5 text-sm font-medium leading-4  text-blue-700 bg-sky-100 rounded-md  shadow-sm hover:bg-gray-200  duration-500"
                    onClick={handlePopUp}
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full items-center">
                  <h2 className=" text-3xl font-extrabold text-gray-900">
                    Log In
                  </h2>
                  <button
                    className="rounded-3xl hover:bg-gray-200 duration-500"
                    onClick={handlePopUp}
                  >
                    <XIcon className="h-6 w-6" fill="#2563EB" />
                  </button>
                </div>
              )}
              {popUpStatus ? (
                <div>
                  <Form className="mt-8 space-y-6" action="#">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md">
                      <div className="mb-5">
                        <label
                          htmlFor="email-address"
                          className="text-xs text-gray-700"
                        >
                          Email
                        </label>
                        <Field
                          id="email-address"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="you@example.com"
                        />
                        {touched.email && errors.email && <p>{errors.email}</p>}
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="text-xs text-gray-700"
                        >
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="current-password"
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border   border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Enter Password"
                        />
                        {touched.password && errors.password && (
                          <p>{errors.password}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          defaultChecked={checked}
                          onChange={handleChacked}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-200"
                      >
                        Log in
                      </button>
                    </div>
                  </Form>
                  <div className="flex mt-8">
                    <span>Don't have an account yet?</span>
                    <button
                      onClick={handleRoutePage}
                      className="cursor-pointer text-blue-600 ml-2"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UserLogInForm;
