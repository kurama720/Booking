import React, {FC} from 'react';
import {MailIcon} from "@heroicons/react/solid";
import {BsExclamationCircleFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";


const InputEmail:FC<IPropsInput> = ({error,touched,labelName,name,value,handleChange,handleBlur,placeholder,serverError}) => {
    return (
        <>
            <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
                {labelName}
            </label>
            <div
                className={`flex  rounded-md border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center`}>
                <span className='pl-1.5 '><MailIcon className='h-6 w-5 text-gray-400'/></span>
                <input
                    id={name}
                    name={name}
                    type={name}
                    className={`appearance-none relative block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder={placeholder}
                    autoComplete='off'
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-sm'><span className='pt-1 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
            {
                serverError && <span
                    className='flex justify-start items-start text-red-600 text-sm'><span className='pt-1 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{serverError} Try again!</span>
            }
        </>
    );
};

export default InputEmail;