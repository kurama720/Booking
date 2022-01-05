import React, {FC} from 'react';
import {MailIcon} from "@heroicons/react/solid";
import {BsExclamationCircleFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";
import Input from "../Input/Input";

const InputEmail:FC<IPropsInput> = ({error, touched, labelName, name, value, handleChange, handleBlur, placeholder, serverError, setServerError}) => {

   const handleFocus = () => {
     if(serverError && setServerError){
         setServerError({email: ''})
     }
   }

    return (
        <>
            <label htmlFor={name} className="block text-xs text-gray-700 font-body">
                {labelName}
            </label>
            <div
                className={`flex  rounded-md border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center`}>
                <span className='pl-1.5 '><MailIcon className={`h-6 w-5 ${error && touched ? 'text-red-400': 'text-gray-400'}`}/></span>
                <Input name={name} value={value} handleChange={handleChange} handleBlur={handleBlur} placeholder={placeholder} type={'email'} handleFocus={handleFocus}/>
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
            {
                serverError && <span
                    className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{serverError} Try again!</span>
            }
        </>
    );
};

export default InputEmail;
