import React, {FC, useState} from 'react';
import {BsExclamationCircleFill, BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {InformationCircleIcon} from "@heroicons/react/solid";
import {IPropsInput} from "../IPropsInput";



const InputPassword: FC<IPropsInput> = ({error,touched,labelName,name,value,handleChange,handleBlur, placeholder,serverError}) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsShowPassword(!isShowPassword)
    }


    // const isOneDigit = /\d/.test(value)
    // const isOneUppercase = /[A-Z]/.test(value)
    // const isLength = value.length >= 8

    return (
        <div>
            <label htmlFor={name} className="ml-2 block text-sm text-gray-900 flex items-center">
                {labelName} <InformationCircleIcon className='w-3 h-3 ml-1.5 text-gray-400 '/>
            </label>
            <div
                className={`flex  rounded-md border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center`}>
                <input
                    id={name}
                    name={name}
                    autoComplete='off'
                    type={isShowPassword ? 'text' : 'password'}
                    className={`appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter Password"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <button
                    type='button'
                    className='pr-2'
                    onClick={showPassword}>{isShowPassword
                    ?
                    <BsFillEyeSlashFill className='text-gray-400'/>
                    :
                    <BsFillEyeFill className='text-gray-400'/>
                }
                </button>
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-sm'><span className='pt-1 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
            {
                serverError && <span
                    className='flex justify-start items-start text-red-600 text-sm'><span className='pt-1 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{serverError} Try again!</span>
            }

        </div>
    );
};

export default InputPassword;