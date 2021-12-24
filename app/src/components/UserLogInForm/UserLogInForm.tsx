import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { UserLogin } from "../UserLogInForm/utils/interfaces/interfaces";
import * as yup from "yup";
import { Paths } from "../../paths/path";
import { useNavigate } from "react-router-dom";
import {
  XIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import axios from "axios";

const UserLogInForm = () => {
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<object>({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);

  const refContain = useRef(null);

  const submitUserInformation = async (values: UserLogin) => {
    try {
      const data = await axios.post(
        `http://localhost:8000${Paths.LOG_IN}`,
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

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please add correct email")
      .required("Please add email"),
    password: yup.string().required("Please add correct password"),
  });

  const handlePopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleChacked = () => {
    setChecked((prev) => !prev);
  };

  const handleRoutePage = () => {
    history(Paths.SIGN_UP);
  };

  const handleVisiblePasswordStatus = () => {
    setVisiblePassword((prev) => !prev);
  };

  useEffect(() => {
    if (visiblePassword) {
      console.log(refContain.current);
    }
  }, [visiblePassword]);

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
            setUserInformation({
              email: values.email,
              password: values.password,
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ errors, touched, isValid, dirty, handleChange, handleBlur }) => (
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
                      <div className="mb-5 relative">
                        <label
                          htmlFor="email-address"
                          className="text-xs text-gray-700"
                        >
                          Email
                        </label>
                        <div className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                          <MailIcon className="h-6 w-5" fill="#9CA3AF" />
                        </div>
                        {!isValid && !dirty ? (
                          <>
                            <div className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                              <MailIcon className="h-6 w-5" fill="#EF4444" />
                            </div>
                            <div className="absolute left-96 pl-3 z-10 top-8 flex items-center pointer-event-none">
                              <ExclamationCircleIcon
                                className="h-6 w-5"
                                fill="#EF4444"
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <Field
                          id="email-address"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          required
                          className={
                            !isValid && !dirty
                              ? "appearance-none rounded-md relative block w-full pl-10 pr-14 px-3 py-2 border border-red-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                              : "appearance-none rounded-md relative block w-full pl-10 pr-14 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          }
                          placeholder="you@example.com"
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                      </div>
                      <div className="relative">
                        <label
                          htmlFor="password"
                          className="text-xs text-gray-700"
                        >
                          Password
                        </label>
                        <button
                          onClick={handleVisiblePasswordStatus}
                          className="absolute left-96 pl-3 z-10 top-8 flex items-center pointer-event-none"
                        >
                          {visiblePassword ? (
                            <EyeOffIcon className="h-6 w-5" fill="#9CA3AF" />
                          ) : (
                            <EyeIcon className="h-6 w-5" fill="#9CA3AF" />
                          )}
                        </button>
                        {!isValid && !dirty ? (
                          <>
                            <div className="absolute left-3/4 pl-3 z-10 top-8 flex items-center pointer-event-none">
                              <ExclamationCircleIcon
                                className="h-6 w-5"
                                fill="#EF4444"
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <Field
                          id="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="current-password"
                          required
                          className={
                            !isValid && !dirty
                              ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                              : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          }
                          placeholder="Enter Password"
                        />
                        {touched.password && errors.password && (
                          <p className="text-red-500 text-xs">
                            {errors.password}
                          </p>
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
                        disabled={!isValid && !dirty}
                        className={
                          isValid && dirty
                            ? "group relative w-full flex justify-center py-2.5 px-4 border text-white border-transparent text-sm font-medium rounded-md text-gray-500 bg-blue-600 leading-5"
                            : "group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-200 leading-5"
                        }
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
