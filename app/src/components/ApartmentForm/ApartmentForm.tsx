import React, {FC} from 'react';
import { StarIcon } from '@heroicons/react/solid'

const ApartmentForm: FC = () => {
    return (
        <div className=''>
            <div className='max-w-md w-full shadow'>
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='text-xl font-body font-bold text-gray-900'>$34</span>
                        <span className='text-xl font-body text-gray-500'>/ night</span>
                    </div>
                    <div className='flex items-center'>
                        <span><StarIcon className='text-blue-500 w-4 h-4'/></span>
                        <span className='text-sm font-body'>4,3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentForm;