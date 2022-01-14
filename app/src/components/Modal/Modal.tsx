import React, {FC} from 'react';
import {IPropsModal} from "./IPropsModal";

const Modal: FC<IPropsModal> = ({active, children}) => {

    return (
        <>
            {active &&
            <div className={'h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed top-0 left-0'}>
                <div className='flex justify-center items-center h-full' >
                    {children}
                </div>
            </div>
            }
        </>
    );
};

export default Modal;
