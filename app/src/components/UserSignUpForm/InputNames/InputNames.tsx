import React, {FC} from 'react';
import {BsExclamationCircleFill} from "react-icons/bs";
import {IPropsInput} from "../IPropsInput";
import Input from "../Input/Input";


const InputNames: FC<IPropsInput> = ({error,touched,labelName,name,value,handleChange,handleBlur, placeholder}) => {
    return (
        <div className={`flex flex-col first-of-type:mr-3 last-of-type:ml-3 ${error && touched ? 'mt-3' : 'border-gray-300'}`}>
            <label htmlFor={name} className="block text-xs text-gray-700 font-body">
                {labelName}
            </label>
            <div
                className={`flex  rounded-md border ${error && touched ? 'border-red-500' : 'border-gray-300'} items-center`}>
                <Input name={name} value={value} handleChange={handleChange} handleBlur={handleBlur} placeholder={placeholder}/>
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
        </div>
    );
};

export default InputNames;