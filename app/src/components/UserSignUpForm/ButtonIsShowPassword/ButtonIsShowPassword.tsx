import React, {FC} from 'react';
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {IPropsButtonIsShowPassword} from "./IPropsButtonIsShowPassword";

const ButtonIsShowPassword:FC<IPropsButtonIsShowPassword> = ({showPassword,isShowPassword}) => {
    return (
        <button
            type='button'
            className='pr-2'
            onClick={showPassword}>{isShowPassword
            ?
            <BsFillEyeFill className='text-gray-400'/>
            :
            <BsFillEyeSlashFill className='text-gray-400'/>
        }
        </button>
    );
};

export default ButtonIsShowPassword;
