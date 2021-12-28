import React, { useState, useEffect, useRef } from "react";
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
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import axios from "axios";

const UserLogInForm = () => {
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [token, setToken] = useState(null);

  const refContain = useRef<HTMLInputElement>(null);

  const submitUserInformation = async (values: UserLogin) => {
    try {
      const data = await axios.post(
        `http://localhost:8000/accounts/signin`,
        values
      );

      console.log(data);
      // if (data) {
      //   setToken(data.token)
      //   localStorage.setItem(
      //     "userInfo",
      //     JSON.stringify({
      //       token: data.token
      //     })
      //   );
      // }
    } catch (err) {
      console.error(err);
    }
  };

  let history = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
        "Email is invalid"
      )
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handlePopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleChacked = () => {
    setChecked((prev) => !prev);
  };

  const handleVisiblePasswordStatus = () => {
    setVisiblePassword((prev) => !prev);
  };

  useEffect(() => {
    if (visiblePassword && refContain.current) {
      refContain.current.type = "text";
    } else if (!visiblePassword && refContain.current) {
      refContain.current.type = "password";
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
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ errors, touched, isValid, dirty, handleChange, handleBlur }) => (
          <div
            className={
              popUpStatus
                ? `rounded-md py-8 px-10 w-body max-w-lg mt-36 shadow`
                : `rounded-md  mt-36 shadow`
            }
          >
            <div className="w-full">
              {!popUpStatus ? (
                <div>
                  <button
                    className="px-3.5 py-2.5 text-sm font-medium leading-4 font-body text-blue-700 bg-sky-100 rounded-md  shadow-sm hover:bg-sky-300  duration-500"
                    onClick={handlePopUp}
                    type="button"
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full items-center">
                  <h2 className=" text-3xl font-extrabold text-gray-500 font-body">
                    Log In
                  </h2>
                  <button
                    className="rounded-3xl flex items-start h-9"
                    type="button"
                    onClick={handlePopUp}
                  >
                    <XIcon className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500" />
                  </button>
                </div>
              )}
              {popUpStatus ? (
                <div>
                  <Form className="mt-8 space-y-6" action="#">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md">
                      {(!dirty && !touched.email) ||
                      (!dirty && touched.email && errors.email) ||
                      (dirty && touched.email && errors.email) ||
                      (dirty && !touched.email) ? (
                        <div className="mb-5 relative">
                          <label
                            htmlFor="email-address"
                            className="text-xs text-gray-700 font-body"
                          >
                            Email
                          </label>
                          <div className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                            <MailIcon className="h-6 w-5" fill="#9CA3AF" />
                          </div>
                          {touched.email && errors.email && (
                            <>
                              <div className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                                <MailIcon className="h-6 w-5" fill="#EF4444" />
                              </div>
                            </>
                          )}
                          <Field
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              !isValid && !dirty
                                ? "appearance-none rounded-md relative block w-full pl-10 pr-14 px-3 py-2 border border-red-300 placeholder-gray-500 text-gray-900  font-body rounded-t-md focus:outline-none font-body focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                : "appearance-none rounded-md relative block w-full pl-10 pr-14 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 font-body rounded-t-md focus:outline-none focus:ring-indigo-500 font-body focus:border-indigo-500 sm:text-sm"
                            }
                            placeholder="you@example.com"
                          />
                          {touched.email && errors.email && (
                            <p className="text-red-500 text-xs font-body">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      ) : !errors.email && touched.email && dirty ? (
                        <div className="mb-5 relative">
                          <div className="absolute left-4  z-10 top-5 flex items-center pointer-event-none">
                            <UserCircleIcon
                              className="h-6 w-6"
                              fill="#D1D5DB"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              console.log("Manage a profile of accounts")
                            }
                            className="absolute left-icon z-10 top-5 flex items-center pointer-event-none"
                          >
                            <ChevronDownIcon
                              className="h-6 w-6"
                              fill="#9CA3AF"
                            />
                          </button>
                          <div className="absolute left-14 z-10 top-5 flex items-center pointer-event-none">
                            <MailIcon className="h-6 w-5" fill="#9CA3AF" />
                          </div>
                          <Field
                            id="email-address"
                            name="email"
                            type="email"
                            disabled={true}
                            autoComplete="email"
                            key="email"
                            className="appearance-none bg-gray-50 rounded-3xl relative block w-full pl-20 pr-14 px-3 py-5  placeholder-gray-500 text-gray-900  font-body focus: outline-none focus: caret-transparent"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                      {dirty && !errors.email && (
                        <div className="relative">
                          <label
                            htmlFor="password"
                            className="text-xs text-gray-700 font-body"
                          >
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={handleVisiblePasswordStatus}
                            className="absolute left-icon  z-10 top-8 flex items-center pointer-event-none"
                          >
                            {visiblePassword ? (
                              <EyeOffIcon className="h-6 w-5" fill="#9CA3AF" />
                            ) : (
                              <EyeIcon className="h-6 w-5" fill="#9CA3AF" />
                            )}
                          </button>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            key="password"
                            onChange={handleChange}
                            innerRef={refContain}
                            onBlur={handleBlur}
                            autoComplete="current-password"
                            className={
                              !isValid && !dirty
                                ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-gray-900 rounded-t-md  font-body focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm font-body "
                                : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md font-body focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-body"
                            }
                            placeholder="Enter Password"
                          />
                          {touched.password && errors.password && (
                            <p className="text-red-500 text-xs font-body">
                              {errors.password}
                            </p>
                          )}
                        </div>
                      )}
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
                          className="ml-2 block text-sm text-gray-900 font-body"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <button
                          type="button"
                          onClick={() => history(Paths.RESET_PASSWORD)}
                          className="font-medium text-blue-600 hover:text-blue-700 font-body"
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={!isValid && !dirty}
                        className={
                          isValid && dirty
                            ? "group relative w-full flex justify-center text-white py-2.5 px-4  font-body border border-transparent text-sm font-medium rounded-md  bg-blue-600 leading-5"
                            : "group relative w-full flex justify-center py-2.5 px-4 font-body border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-200 leading-5"
                        }
                      >
                        Log in
                      </button>
                    </div>
                  </Form>
                  <div className="flex mt-8 justify-center items-center">
                    <span className="font-body text-xs">
                      Don't have an account yet?
                    </span>
                    <button
                      type="button"
                      onClick={() => history(Paths.SIGN_UP)}
                      className="cursor-pointer text-blue-600 ml-2 text-sm leading-5 font-medium font-body hover:text-blue-700"
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
