import React, {FC} from 'react';
import {IPropsInputDate} from "./IPropsInputeDate";

const InputDate: FC<IPropsInputDate> = ({value, handleBlur, handleChange, label,borderRadius}) => {
    return (
        <>
            <label htmlFor='check_in' className='block text-xs font-body text-gray-700'>{label}</label>
            <div className={`${borderRadius === 'right'? 'rounded-r-lg' :'rounded-l-lg'} border-gray-300 border py-[9px]`}>
                <input
                    className='focus-visible:outline-0'
                    type="date"
                    name='check_in' value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </>
    );
};

export default InputDate;