import React from 'react';
import * as yup from 'yup';
import {Formik} from "formik";
import { MdErrorOutline } from "react-icons/md"

interface IFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}


const UserSignUpForm = () => {

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('The \'First Name\' field is required'),
        lastName: yup.string().required('The \'Last Name\' field is required'),
        email: yup.string().email('Please enter a valid email').required('The \'E-mail\' field is required'),
        password: yup.string().matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ).required('The \'Password\' field is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')],'Password mismatch').required('The \'Confirm Password\' field is required')

    })

    const initialValues: IFormData = {
        firstName: '',
        lastName: '',
        email: 'name@example.com',
        password: '',
        confirmPassword: ''
    }

    const postReq = (values : IFormData) => {
        console.log(values)
    }


    return (

        <Formik
            initialValues={initialValues}
            validateOnBlur
            onSubmit={values => postReq(values)}
            validationSchema={validationSchema}
        >
            {({
                  values, errors,
                  touched, handleChange,
                  handleBlur, isValid, handleSubmit, dirty
              }) =>
                (
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
                            </div>
                            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                                <div className="rounded-md shadow-sm">
                                    {/*First Name*/}
                                    <div className=''>
                                        <label htmlFor="firstName" className="ml-2 block text-sm text-gray-900">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.firstName && errors.firstName && <span className='flex justify-start items-center text-red-600 text-sm'> <MdErrorOutline /> {errors.firstName}</span>}
                                    </div>

                                    {/*LastName*/}
                                    <div className='mt-3'>
                                        <label htmlFor="lastName" className="ml-2 block text-sm text-gray-900">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.lastName && errors.lastName && <span className='flex justify-start items-center text-red-600 text-sm'><MdErrorOutline /> {errors.lastName}</span>}
                                    </div>
                                    {/*email*/}
                                    <div className='mt-3'>
                                        <label htmlFor="email" className="ml-2 block text-sm text-gray-900">
                                            E-mail
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="E-mail"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.email && errors.email && <span className='flex justify-start items-center text-red-600 text-sm'> <MdErrorOutline /> {errors.email}</span>}
                                    </div>

                                    {/*Password*/}
                                    <div className='mt-3'>
                                        <label htmlFor="password" className="ml-2 block text-sm text-gray-900">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="text"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.password && errors.password && <span className='flex justify-start items-start text-red-600 text-sm'><MdErrorOutline /> {errors.password}</span>}
                                    </div>
                                    {/*Confirm Password*/}
                                    <div className='mt-3'>
                                        <label htmlFor="password" className="ml-2 block text-sm text-gray-900">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Confirm Password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && <span className='flex justify-start items-center text-red-600 text-sm'><MdErrorOutline /> {errors.confirmPassword}</span>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={!(isValid && dirty)}
                                        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </Formik>

    );
};

export default UserSignUpForm;