import React, {useEffect, useRef, useState} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {JWT, UserLogin} from "../UserLogInForm/utils/interfaces/interfaces";
import {useAuth} from "../../hooks/auth.hook";
import * as yup from "yup";
import {Paths} from "../../paths/path";
import {LocalKey, LocalStorage} from "ts-localstorage";
import Button from "../../components/Button/Button";
import {
  ChevronDownIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  UserCircleIcon,
  XIcon
} from "@heroicons/react/solid";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const storageName = "userData" as LocalKey<JWT>;

const UserLogInForm = () => {
  const {login, setErrorMessage, errorMessage} = useAuth();
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const refContainPassword = useRef<HTMLInputElement>(null);
  const [email, isEmail] = useState<boolean>(false)
  const [initialState, setInitialState] = useState<UserLogin>({
    email: '',
    password: ''
  })

  let history = useNavigate()

  const submitUserInformation = async (values: UserLogin) => {
    try {
      const data = await axios.post(
          `${process.env.REACT_APP_API_URL}accounts/signin/`,
          values
      );

      if (data) {
        login(data, data.request.status, checked);
        history(Paths.HOME);
      }

    } catch (error) {
      const isAxiosError = (errorData: any): errorData is AxiosError => {
        return errorData.isAxiosError === true
      }
      if (isAxiosError(error)) {
        setErrorMessage(error.message);
      }
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
        .string()
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Enter a valid email."
        )
        .required("Email is required."),
    password: yup.string().required("Password is required."),
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

  const handleConfirmEmail = () => {
    isEmail(true)
  }

  useEffect(() => {
    const storageItem = LocalStorage.getItem(storageName)

    if (visiblePassword && refContainPassword.current) {
      refContainPassword.current.type = "text";
    } else if (!visiblePassword && refContainPassword.current) {
      refContainPassword.current.type = "password";
    }

    if (!!storageItem) {
      const checkStatus = storageItem.checked

      if (checkStatus) {
        const localStorageItem = storageItem.token.config.data
        const data = JSON.parse(localStorageItem)

        setInitialState({
          email: data.email,
          password: data.password,
        })
      }
    }
  }, [visiblePassword, email, login]);


  return (
      <div className="w-screen flex justify-center">
        <Formik
            initialValues={initialState}
            enableReinitialize
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(
                values: UserLogin,
                {setSubmitting}: FormikHelpers<UserLogin>
            ) => {
              setTimeout(() => {
                submitUserInformation(values);
                setSubmitting(false);
              }, 500);
            }}
        >
          {({errors, touched, isValid, dirty, handleChange, handleBlur}) => {
            return (
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
                          <Button
                              context="Log In"
                              classNames="px-3.5 py-2.5 text-sm font-medium leading-4 font-body text-blue-700 bg-sky-100 rounded-md  shadow-sm hover:bg-sky-300  duration-500"
                              onClick={handlePopUp}
                              type="button"
                          />
                        </div>
                    ) : (
                        <div className="flex justify-between w-full items-center">
                          <h2 className=" text-3xl font-extrabold text-gray-500 font-body">
                            Log In
                          </h2>
                          <Button
                              classNames="rounded-3xl flex items-start h-9"
                              type="button"
                              context={
                                <XIcon
                                    className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500"/>
                              }
                              onClick={handlePopUp}
                          />
                        </div>
                    )}
                    {popUpStatus ? (
                        <div>
                          <Form className="mt-8 space-y-6" action="#">
                            <div className="rounded-md">
                              {
                                (!dirty && !touched.email && !!!initialState.email && !!!initialState.email) ||
                                (!dirty && touched.email && errors.email) ||
                                (dirty && touched.email && errors.email) ||
                                (dirty && !touched.email) ||
                                (!email && !!!initialState.email && !!!initialState.email)
                                    ? (
                                        <div className="mb-5 relative">
                                          <label
                                              htmlFor="email-address"
                                              className="text-xs text-gray-700 font-body"
                                          >
                                            Email
                                          </label>
                                          <div
                                              className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                                            <MailIcon className="h-6 w-5" fill="#9CA3AF"/>
                                          </div>
                                          {touched.email && errors.email && (
                                              <>
                                                <div
                                                    className="absolute left-0 pl-3 z-10 top-8 flex items-center pointer-event-none">
                                                  <MailIcon
                                                      className="h-6 w-5"
                                                      fill="#EF4444"
                                                  />
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
                                              placeholder="Email"
                                          />
                                          {touched.email && errors.email && (
                                              <div className='flex pt-[0.6rem]'>
                                                <ExclamationCircleIcon className='w-4 h-4' fill='#EF4444'/>
                                                <p className="text-red-500 text-xs font-body ml-[0.25rem]">
                                                  {errors.email}
                                                </p>
                                              </div>
                                          )}
                                        </div>
                                    ) : (email && !errors.email) || (!!initialState.email && !!initialState.email) ? (
                                        <div className="mb-5 relative">
                                          <div
                                              className="absolute left-4  z-10 top-5 flex items-center pointer-event-none">
                                            <UserCircleIcon
                                                className="h-6 w-6"
                                                fill="#D1D5DB"
                                            />
                                          </div>
                                          <Button
                                              type="button"
                                              onClick={() =>
                                                  console.log("Manage a profile of accounts")
                                              }
                                              context={
                                                <ChevronDownIcon
                                                    className="h-6 w-6"
                                                    fill="#9CA3AF"
                                                />
                                              }
                                              classNames="absolute left-icon z-10 top-5 flex items-center pointer-event-none"
                                          />
                                          <div
                                              className="absolute left-14 z-10 top-5 flex items-center pointer-event-none">
                                            <MailIcon className="h-6 w-5" fill="#9CA3AF"/>
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
                              {dirty && !errors.email && email && (
                                  <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="text-xs text-gray-700 font-body"
                                    >
                                      Password
                                    </label>
                                    <Button
                                        type="button"
                                        onClick={handleVisiblePasswordStatus}
                                        context={
                                          visiblePassword ? (
                                              <EyeOffIcon
                                                  className="h-6 w-5"
                                                  fill="#9CA3AF"
                                              />
                                          ) : (
                                              <EyeIcon className="h-6 w-5" fill="#9CA3AF"/>
                                          )
                                        }
                                        classNames="absolute left-icon  z-10 top-8 flex items-center pointer-event-none"
                                    />
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        key="password"
                                        onChange={handleChange}
                                        innerRef={refContainPassword}
                                        onBlur={handleBlur}
                                        autoComplete="current-password"
                                        className={
                                          (!isValid && !dirty) || !!errorMessage
                                              ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-red-900 rounded-t-md  font-body focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm font-body "
                                              : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md font-body focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-body"
                                        }
                                        placeholder="Enter Password"
                                    />
                                    {touched.password && errors.password && (
                                        <div className='flex pt-[0.6rem]'>
                                          <ExclamationCircleIcon className='w-4 h-4' fill='#EF4444'/>
                                          <p className="text-red-500 text-xs font-body ml-[0.25rem]">
                                            {errors.password}
                                          </p>
                                        </div>
                                    )}
                                    {!!errorMessage && (
                                        <div className='flex pt-[0.6rem]'>
                                          <ExclamationCircleIcon className='w-4 h-4' fill='#EF4444'/>
                                          <p className="text-red-500 text-xs font-body ml-[0.25rem]">
                                            Incorrect password. Try again or click the
                                            "Forgot your password?" link to reset it.
                                          </p>
                                        </div>
                                    )}
                                  </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Field
                                    id="checked"
                                    name="checked"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={handleChacked}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="checked"
                                    className="ml-2 block text-sm text-gray-900 font-body"
                                >
                                  Remember me
                                </label>
                              </div>
                              <div className="text-sm">
                                <Button
                                    type="button"
                                    onClick={() => history(Paths.RESET_PASSWORD)}
                                    classNames="font-medium text-blue-600 hover:text-blue-700 font-body"
                                    context="Forgot your password?"
                                />
                              </div>
                            </div>
                            <div>
                              {email || (!!initialState.email && !!initialState.password) ? (
                                  <Button
                                      type="submit"
                                      disabled={!isValid && !dirty}
                                      context="Log in"
                                      classNames={
                                        (isValid && dirty) || (!!initialState.email && !!initialState.password)
                                            ? "group relative w-full flex justify-center text-white py-2.5 px-4  font-body border border-transparent text-sm font-medium rounded-md  bg-blue-600 leading-5"
                                            : "group relative w-full flex justify-center py-2.5 px-4 font-body border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-200 leading-5"
                                      }
                                  />
                              ) : (
                                  <Button
                                      type='button'
                                      disabled={!!errors.email}
                                      onClick={() => {
                                        handleConfirmEmail()
                                      }}
                                      context="Log in"
                                      classNames={
                                        !!!errors.email && dirty
                                            ? "group relative w-full flex justify-center text-white py-2.5 px-4  font-body border border-transparent text-sm font-medium rounded-md  bg-blue-600 leading-5"
                                            : "group relative w-full flex justify-center py-2.5 px-4 font-body border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-200 leading-5"
                                      }
                                  />
                              )}
                            </div>
                          </Form>
                          <div className="flex mt-8 justify-center items-center">
                      <span className="font-body text-xs">
                        Don't have an account yet?
                      </span>
                            <Button
                                type="button"
                                onClick={() => history(Paths.SIGN_UP)}
                                context="Sign Up"
                                classNames="cursor-pointer text-blue-600 ml-2 text-sm leading-5 font-medium font-body hover:text-blue-700"
                            />
                          </div>
                        </div>
                    ) : (
                        <></>
                    )}
                  </div>
                </div>
            );
          }}
        </Formik>
      </div>
  );
};

export default UserLogInForm;
