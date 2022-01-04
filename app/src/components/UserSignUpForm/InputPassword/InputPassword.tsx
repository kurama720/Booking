import React, {FC, useState} from 'react';
import {BsExclamationCircleFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";
import ButtonIsShowPassword from "../ButtonIsShowPassword/ButtonIsShowPassword";
import Input from "../Input/Input";

const InputPassword: FC<IPropsInput> = ({error, touched, labelName, name, value, handleChange, handleBlur, placeholder, serverError, setServerError}) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsShowPassword(!isShowPassword)
    }

    const handleFocus = () => {
        if( serverError) {
            setServerError({password: ''})
        }
    }

    return (
        <div>
            <label htmlFor={name} className="block text-xs text-gray-700 font-body flex items-center">
                {labelName}
            </label>
            <div
                className={`flex  rounded-md border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center`}>
                <Input type={isShowPassword ? 'text' : 'password'} name={name} placeholder={placeholder} value={value} handleChange={handleChange} handleBlur={handleBlur} handleFocus={handleFocus}/>
                <ButtonIsShowPassword showPassword={showPassword} isShowPassword={isShowPassword} />
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
            {
                serverError && <span
                    className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{serverError} Try again!</span>
            }
        </div>
    );
};

export default InputPassword;
