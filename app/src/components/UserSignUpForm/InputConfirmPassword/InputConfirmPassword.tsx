import React, {FC, useState} from 'react';
import {BsExclamationCircleFill, BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";


const InputConfirmPassword: FC<IPropsInput> = ({error,touched,labelName,name,value,handleChange,handleBlur,placeholder}) => {
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false)

    const showPasswordConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsShowPasswordConfirm(!isShowPasswordConfirm)
    }
    return (
        <>
            <label htmlFor={name} className="block text-xs text-gray-700 font-body">
                {labelName}
            </label>
            <div
                className={`flex rounded-md  border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center `}>
                <input
                    id={name}
                    name={name}
                    autoComplete='off'
                    type={isShowPasswordConfirm ? 'text' : 'password'}
                    className={`appearance-none font-body text-gray-900 text-sm relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Repeat Password"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <button
                    type='button'
                    className='pr-2'
                    onClick={showPasswordConfirm}>{isShowPasswordConfirm
                    ?
                    <BsFillEyeSlashFill className='text-gray-400'/>
                    :
                    <BsFillEyeFill className='text-gray-400'/>
                }
                </button>
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
        </>
    );
};

export default InputConfirmPassword;