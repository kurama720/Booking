import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik, FormikHelpers} from "formik";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {BsExclamationCircleFill} from "react-icons/bs";
import {IUserSignUp} from "./IUserSignUp";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Paths} from "../../paths/paths";





const UserSignUpForm = () => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false)
    let history = useNavigate()

    const validationSchema = yup.object().shape({
        first_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
            .min(2, 'The minimum number of letters must be 2!')
            .max(32, 'The maximum number of letters must be 2!').required('The \'First Name\' field is required!'),
        last_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
            .min(2, 'The minimum number of letters must be 2')
            .max(32, 'The maximum number of letters must be 32').required('The \'Last Name\' field is required!'),

        email: yup.string().email('You’ve entered invalid e-mail!').required('The \'E-mail\' field is required!'),

        password: yup.string().matches(/^((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,})$/,
            "Password must be at least 8 characters, one uppercase letter, one lowercase letter!"
        ).required('The \'Password\' field is required'),

        confirm_password: yup.string().oneOf([yup.ref('password')], "Password didn't match").required('The \'Confirm Password\' field is required!')
    })

    const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         e.stopPropagation()
        setIsShowPassword(!isShowPassword)
    }

    const showPasswordConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsShowPasswordConfirm(!isShowPasswordConfirm)
    }

    const handleCancel = () => {
        history('/')
    }

    const onSubmitDataSignUp = async (values: IUserSignUp, actions: FormikHelpers<IUserSignUp>) => {
        const dataForSignUp: IUserSignUp = {
            first_name: values.email,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password
        }
        try {
            // const response = axios.post(`http://localhost:5000${Paths.SIGN_UP}`, dataForSignUp)
            console.log(dataForSignUp)
        }catch (e: any){
            console.error(e.message)
        }finally {
            actions.resetForm()
        }


    }

    const initialValues: IUserSignUp = {
        first_name: '',
        last_name: '',
        email: 'name@example.com',
        password: 'Test1234',
        confirm_password: 'Test1234',
        rememberMe: false
    }


    return (
        <Formik
            initialValues={initialValues}
            validateOnBlur
            onSubmit={onSubmitDataSignUp}
            validationSchema={validationSchema}
        >
            {({
                  values, errors,
                  touched, handleChange,
                  handleBlur, isValid, handleSubmit, dirty
              }) =>
                (
                    <div className="min-h-full flex items-center justify-center mt-3 ">
                        <div className="max-w-md w-full space-y-8 shadow-lg p-8 rounded-md">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-700">Sign up</h2>
                            </div>
                            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                                <div className="rounded-md ">
                                    {/*First Name*/}
                                    <div className=''>
                                        <label htmlFor="first_name" className="ml-2 block text-sm text-gray-900">
                                            First Name
                                        </label>
                                        <div
                                            className={`flex  rounded-md border ${errors.first_name && touched.first_name ? 'border-red-500' : 'border-gray-300'} items-center`}>
                                            <input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                placeholder="Enter First Name"
                                                value={values.first_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span className='pr-1'>{errors.first_name && touched.first_name &&
                                            <BsExclamationCircleFill className='text-red-600'/>}</span>
                                        </div>
                                        {touched.first_name && errors.first_name && <span
                                            className='flex justify-start items-center text-red-600 text-sm'>{errors.first_name}</span>}
                                    </div>

                                    {/*last_name*/}
                                    <div className='mt-3'>
                                        <label htmlFor="last_name" className="ml-2 block text-sm text-gray-900">
                                            Last Name
                                        </label>
                                        <div
                                            className={`flex  rounded-md border ${errors.last_name && touched.last_name ? 'border-red-500' : 'border-gray-300'} items-center`}>
                                            <input
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                placeholder="Enter Last Name"
                                                value={values.last_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span className='pr-1'>{errors.last_name && touched.last_name &&
                                            <BsExclamationCircleFill className='text-red-600'/>}</span>
                                        </div>
                                        {touched.last_name && errors.last_name && <span
                                            className='flex justify-start items-center text-red-600 text-sm'>{errors.last_name}</span>}
                                    </div>
                                    {/*email*/}
                                    <div className='mt-3'>
                                        <label htmlFor="email" className="ml-2 block text-sm text-gray-900">
                                            E-mail
                                        </label>
                                        <div
                                            className={`flex  rounded-md border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} items-center`}>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={`appearance-none relative block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                placeholder="E-mail"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span className='pr-1'>{errors.email && touched.email &&
                                            <BsExclamationCircleFill className='text-red-600'/>}</span>
                                        </div>
                                        {touched.email && errors.email && <span
                                            className='flex justify-start items-center text-red-600 text-sm'> {errors.email}</span>}
                                    </div>

                                    {/*Password*/}
                                    <div className='mt-3'>
                                        <label htmlFor="password" className="ml-2 block text-sm text-gray-900">
                                            Password
                                        </label>
                                        <div
                                            className={`flex  rounded-md border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} items-center`}>
                                            <input
                                                id="password"
                                                name="password"
                                                type={isShowPassword ? 'text' : 'password'}
                                                className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                placeholder="Enter Password"
                                                autoComplete='on'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.password && errors.password ? <span className='pr-1'>
                                            <BsExclamationCircleFill className='text-red-600'/>
                                            </span> : <button
                                                type='button'
                                                className='pr-2'
                                                onClick={showPassword}>{isShowPassword
                                                ?
                                                <BsFillEyeSlashFill className='text-gray-400'/>
                                                :
                                                <BsFillEyeFill className='text-gray-400'/>
                                                              }
                                            </button>
                                            }
                                        </div>
                                        {touched.password && errors.password && <span
                                            className='flex justify-start items-center text-red-600 text-sm'>{errors.password}</span>}
                                    </div>

                                    {/*Confirm Password*/}
                                    <div className='mt-3 '>
                                        <label htmlFor="confirm_password" className="ml-2 block text-sm text-gray-900">
                                            Re-enter password
                                        </label>
                                        <div
                                            className={`flex rounded-md  border ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'border-gray-300'} items-center`}>
                                            <input
                                                id="confirm_password"
                                                name="confirm_password"
                                                type={isShowPasswordConfirm ? 'text' : 'password'}
                                                className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                placeholder="Repeat Password"
                                                autoComplete='on'
                                                value={values.confirm_password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.confirm_password && touched.confirm_password ? <span className='pr-1'>
                                            <BsExclamationCircleFill className='text-red-600'/>
                                            </span> : <button
                                                type='button'
                                                className='pr-2'
                                                onClick={showPasswordConfirm}>{isShowPasswordConfirm
                                                ?
                                                <BsFillEyeSlashFill className='text-gray-400'/>
                                                :
                                                <BsFillEyeFill className='text-gray-400'/>
                                            }
                                            </button>
                                            }
                                        </div>

                                        {touched.confirm_password && errors.confirm_password && <span
                                            className='flex justify-start items-center text-red-600 text-sm'> {errors.confirm_password}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="rememberMme"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={values.rememberMe}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className={`group relative  flex justify-center py-2 px-16 border  text-sm font-medium rounded-md text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!(isValid && dirty)}
                                        className={`group relative  flex justify-center py-2 px-16 border border-transparent text-sm font-medium rounded-md  ${!(isValid && dirty) ? 'bg-gray-200 text-gray-700' : 'bg-indigo-600 text-white'}   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-center">
                                <span>Already have an account?</span>
                                <button className="cursor-pointer text-indigo-600 ml-2">
                                    Login in!
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </Formik>

    );
};

export default UserSignUpForm;