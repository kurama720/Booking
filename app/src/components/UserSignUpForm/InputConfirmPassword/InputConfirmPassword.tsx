import React, {FC, useState} from 'react';
import {BsExclamationCircleFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";
import ButtonIsShowPassword from "../ButtonIsShowPassword/ButtonIsShowPassword";
import Input from "../Input/Input";


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
                <Input name={name} value={value} handleChange={handleChange} handleBlur={handleBlur} placeholder={placeholder} type={isShowPasswordConfirm ? 'text' : 'password'}/>
                <ButtonIsShowPassword showPassword={showPasswordConfirm} isShowPassword={isShowPasswordConfirm}/>
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
        </>
    );
};

export default InputConfirmPassword;