import React, {FC} from 'react';
import {IPropsButtonLogIn} from "./IPropsButtonLogin";


const ButtonLogIn:FC<IPropsButtonLogIn> = ({children,redirectToLogIn}) => {
    return (
            <button className="cursor-pointer text-blue-600 ml-2 hover:border-blue-600" onClick={redirectToLogIn}>
                {children}
            </button>
    );
};

export default ButtonLogIn;