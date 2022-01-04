import React, {useState} from 'react';
import {Formik, FormikHelpers} from "formik";
import {IUserSignUp} from "./IUserSignUp";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../paths/paths";
import {validationSchema} from "./validationShema";
import InputNames from "./InputNames/InputNames";
import InputEmail from "./InputEmail/InputEmail";
import InputPassword from "./InputPassword/InputPassword";
import InputConfirmPassword from "./InputConfirmPassword/InputConfirmPassword";
import {IServerErrors} from "./IServerErrors";
import ButtonLogIn from "./ButtonLogIn/ButtonLogIn";
import ButtonRegistration from "./ButtonRegistation/ButtonRegistration";
import AuthService from "../../api/AuthService";


const UserSignUpForm = () => {
    const [serverErrors,setServerErrors] = useState<null | IServerErrors>(null)
    let history = useNavigate()


    const redirectToLogIn = () => {
        history(Paths.LOG_IN)
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
            const response = await AuthService.signUp(dataForSignUp)
            if(response){
                setServerErrors(null)
                actions.resetForm()
                history(Paths.LOG_IN)
            }
        } catch (e: any) {
            setServerErrors(e.response.data)
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
                        <div className="max-w-md w-full space-y-8 shadow p-8">
                            <div className='flex items-center justify-between'>
                                <h2 className="text-3xl font-extrabold text-gray-500 font-body font-extrabold">Sign up</h2>
                            </div>
                            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                                <div className="rounded-md ">
                                    {/*First Name*/}
                                    <div className='flex items-center justify-between '>
                                        <InputNames
                                            error={errors.first_name}
                                            labelName={'First Name'}
                                            value={values.first_name}
                                            name={'first_name'}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.first_name}
                                            placeholder={'First Name'}
                                        />

                                        <InputNames
                                            error={errors.last_name}
                                            labelName={'Last Name'}
                                            value={values.last_name}
                                            name={'last_name'}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.last_name}
                                            placeholder={'Last Name'}
                                        />
                                    </div>
                                    {/*email*/}
                                    <div className='mt-3'>
                                        <InputEmail
                                            error={errors.email}
                                            labelName={'E-mail'}
                                            value={values.email}
                                            name={'email'}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.email}
                                            placeholder={'E-mail'}
                                            serverError={serverErrors?.email}
                                            setServerError={setServerErrors}
                                        />
                                    </div>
                                    {/*Password*/}
                                    <div className='mt-3'>
                                        <InputPassword
                                            error={errors.password}
                                            labelName={'Password'}
                                            value={values.password}
                                            name={'password'}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.password}
                                            placeholder={'Enter Password'}
                                            serverError={serverErrors?.password}
                                            setServerError={setServerErrors}
                                        />
                                    </div>
                                    {/*Confirm Password*/}
                                    <div className='mt-3 '>
                                        <InputConfirmPassword
                                            error={errors.confirm_password}
                                            labelName={'Re-enter password'}
                                            value={values.confirm_password}
                                            name={'confirm_password'}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.confirm_password}
                                            placeholder={'Repeat Password'}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <ButtonRegistration isValid={isValid} dirty={dirty}>Create account</ButtonRegistration>
                                </div>
                            </form>
                            <div className="flex items-center justify-center">
                                <span className='text-gray-600 font-body text-xs'>Already have an account?</span>
                                <ButtonLogIn redirectToLogIn={redirectToLogIn}> Log in! </ButtonLogIn>
                            </div>
                        </div>
                    </div>
                )}
        </Formik>
    );
};

export default UserSignUpForm;