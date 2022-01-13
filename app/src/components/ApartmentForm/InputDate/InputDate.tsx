import React, {FC} from 'react';
import {IPropsInputDate} from "./IPropsInputeDate";
import {BsExclamationCircleFill} from "react-icons/bs";

const InputDate: FC<IPropsInputDate> = ({value, name, handleBlur, handleChange, label,borderRadius, touched, error}) => {
    return (
        <>
            <label htmlFor={name} className='block text-xs font-body text-gray-700'>{label}</label>
            <div className={`${borderRadius === 'right'? 'rounded-r-lg' :'rounded-l-lg'} border-gray-300 border py-[9px]`}>
                <input
                    className='focus-visible:outline-0'
                    type="date"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
        </>
    );
};

export default InputDate;