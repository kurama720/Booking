import React, {FC, useState} from 'react';
import {StarIcon} from '@heroicons/react/solid';
import {Form, Formik} from "formik";


interface IFormApartment {
    check_in: string
    check_out: string
    guests: number
}

const ApartmentForm: FC = () => {
    const [checkIn,setCheckIn] = useState<string>('')
    const [checkOut,setCheckOut] = useState<string>('')

    console.log(checkIn)

    const handleSubmit = (data: IFormApartment) => {
        console.log(data)
    }

    const initialValues: IFormApartment = {
        check_in: '',
        check_out: '',
        guests: 1
    }

    return (
        <div className=''>
            <div className='max-w-md w-full shadow'>
                <div className='flex justify-between items-center px-1.5'>
                    <div>
                        <span className='text-xl font-body font-bold text-gray-900'>$34</span>
                        <span className='text-xl font-body text-gray-500'>/ night</span>
                    </div>
                    <div className='flex items-center'>
                        <span><StarIcon className='text-blue-500 w-4 h-4'/></span>
                        <span className='text-sm font-body'>4,3</span>
                        <span className='inline-block  mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full'/>
                        <span className='text-blue-600 text-sm font-body font-medium'>15 reviews</span>
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className='flex align-center justify-center'>
                            <div>
                                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                            </div>
                            <div>
                                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                            </div>
                        </div>
                        <button type='submit'>Reserve</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ApartmentForm;