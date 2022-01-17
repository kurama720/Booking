import React, {FC} from 'react';
import {BsExclamationCircleFill} from "react-icons/bs"
import {IPropsInputDateCheckOut} from "./IPropsInputDateCheckOut";
import {parseDateMax, parseDateMin} from "../../../models/parseDate";

const InputDateCheckOut: FC<IPropsInputDateCheckOut> = ({value, handleBlur, handleChange, touched, error, valueCheckDate}) => {
    return (
        <div className={`${!(error && touched) ? 'mb-4' : ''}`}>
            <label htmlFor='check_in' className='block text-xs font-body text-gray-700'>Check out</label>
            <div className={`rounded-r-lg border-gray-300 border py-[9px]`}>
                <input
                    className='focus-visible:outline-0'
                    type="date"
                    name={'check_out'}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={valueCheckDate ? parseDateMax(valueCheckDate) : parseDateMin()}
                />
            </div>
            {touched && error && <span
                className='flex justify-start items-start text-red-600 text-xs font-body'><span className='pt-0.5 pr-1 '><BsExclamationCircleFill className='text-red-600 w-3 h-3'/></span>{error}</span>}
        </div>
    );
};

export default React.memo(InputDateCheckOut);
