import React, { FC } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { MailIcon, XIcon } from '@heroicons/react/solid';

interface IResetPasswordFormProps {
  setActive: () => void;
  handleSignUpPopUp: () => void;
}

const ResetPasswordForm: FC<IResetPasswordFormProps> = ({
  setActive,
  handleSignUpPopUp,
}) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter a valid email.'
      )
      .required('Email is required.'),
  });

  const initialValues = {
    email: '',
  };

  const redirectToSignUp = () => {
    setActive();
    handleSignUpPopUp();
  };

  const closeModal = () => {
    setActive();
  };

  const onSubmit = async () => {};

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmit}
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
          className="max-w-md w-full space-y-8 shadow py-8 px-10 bg-white rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-500 font-body font-extrabold">
              Reset password
            </h2>
            <button onClick={closeModal}>
              <XIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
            </button>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor={'email'}
                className="block text-xs text-gray-700 font-body"
              >
                Email
              </label>
              <div
                className={`flex rounded-md border ${
                  errors.email && touched.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                } items-center`}
              >
                <span className="pl-1.5 ">
                  <MailIcon
                    className={`h-6 w-5 ${
                      errors.email && touched.email
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                  />
                </span>
                <input
                  id={'email'}
                  name={'email'}
                  type={'email'}
                  autoComplete="off"
                  className={`appearance-none font-body text-gray-900 text-sm relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder={'name@example.com'}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email && (
                <span className="flex justify-start items-start text-red-600 text-xs font-body">
                  <span className="pt-0.5 pr-1 ">
                    <BsExclamationCircleFill className="text-red-600 w-3 h-3" />
                  </span>
                  {errors.email}
                </span>
              )}
            </div>
            <span className="flex text-gray-600 font-body text-xs">
              If you’re a member, we’ll send you a link to this address that you
              can use to reset your password.
            </span>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={`group relative w-full font-body font-medium flex justify-center py-2 px-16 border border-transparent text-sm font-medium rounded-md  ${
                  !(isValid && dirty)
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-blue-600 text-white'
                }   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Send a link
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <span className="text-gray-600 font-body text-xs">
              Don't have an account yet?
            </span>
            <button
              className="cursor-pointer text-sm font-medium mb-0.5 text-blue-600 ml-2 hover:border-blue-600"
              onClick={redirectToSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
