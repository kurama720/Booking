import React, {FC, useState} from 'react';
import {MailIcon, StarIcon} from '@heroicons/react/solid';
import {Form, Formik} from "formik";
import {ChevronDownIcon, ChevronUpIcon, MinusIcon,PlusIcon} from '@heroicons/react/outline'
import Button from "../Button/Button";

interface IFormApartment {
    check_in: string
    check_out: string
}

const ApartmentForm: FC = () => {
    const [quantityGuests, setQuantityGuests] = useState<number>(1)
    const [isShowGuestsWindow, setIsShowGuestsWindow] = useState<boolean>(false)
    const handleSubmit = (data: IFormApartment) => {
        console.log(data)
    }

    const handleChangeShowGuestsWindow = (): void => {
      setIsShowGuestsWindow(prev => !prev)
    }

    const incrementGuests = (): void => {
        setQuantityGuests(prev => prev + 1)
    }

    const decrementGuests = (): void => {
        setQuantityGuests(prev => prev - 1)
    }

    const initialValues: IFormApartment = {
        check_in: '',
        check_out: '',
    }

    return (
        <div className=''>
            <div className='shadow w-full p-6 max-w-[350px]'>
                <div className='flex justify-between items-center'>
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
                    {({
                          values, handleChange,
                          handleBlur, handleSubmit,
                      }) =>
                        (
                            <Form onSubmit={handleSubmit}>
                                <div className='flex align-center justify-center'>
                                    <div>
                                        <label htmlFor="" className='block'>Check-in</label>
                                        <input type="date" name='check_in' value={values.check_in} onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='block'>Check-out</label>
                                        <input type="date" name='check_out' value={values.check_out} onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='guests' className="block text-xs text-gray-700 font-body">
                                        Guests
                                    </label>
                                    <div
                                        className={`flex rounded-md ${isShowGuestsWindow ? 'border-1 border-blue-600' : 'border-gray-300'} border  items-center relative`}>
                                        <span className='pl-1.5 '><MailIcon className={`h-6 w-5 text-gray-400`}/></span>
                                        <input
                                            disabled type='number'
                                            value={quantityGuests}
                                            onChange={e => setQuantityGuests(Number(e.target.value))}
                                            name='guests'
                                            id='guests'
                                            className={`bg-white appearance-none font-body text-gray-900 text-sm relative w-full block px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}/>
                                        <span className='absolute left-14 tex-sm font-body text-gray-900'>guests</span>
                                        <span className='mr-4 inline-block cursor-pointer' onClick={handleChangeShowGuestsWindow}>
                                            {isShowGuestsWindow ? <ChevronUpIcon className='w-4 h-4 text-blue-600'/> : <ChevronDownIcon className='w-4 h-4 text-gray-400'/>}
                                        </span>
                                    </div>
                                    {isShowGuestsWindow &&
                                    <div className='shadow rounded-md py-4 px-6 absolute bg-white w-[302px] mt-1'>
                                        <div className='flex justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='text-sm font-body font-medium text-gray-900'>Guests</span>
                                                <span className='font-body text-xs text-gray-500'>ages 13 or above</span>
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                <button onClick={decrementGuests} disabled={quantityGuests <= 1}>
                                                    <div
                                                        className='bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center '>
                                                        <MinusIcon className='w-3 text-white '/>
                                                    </div>
                                                </button>
                                                <span className='mx-5'>{quantityGuests}</span>
                                                <button onClick={incrementGuests}>
                                                    <div
                                                        className='bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center'>
                                                        <PlusIcon className='w-3 h-3 text-white '/>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    <div className='mt-6'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <span className='text-base font-body text-gary-700'>$34 x 30 nights</span>
                                            <span className='text-base font-body text-gray-700 font-medium'>$1020</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-base font-body text-gray-700'>Weekly discount: 5% off</span>
                                            <span className='text-base font-body text-green-600 font-medium'>-$29</span>
                                        </div>
                                    </div>
                                    <div className='w-full h-px bg-gray-200 my-6' />
                                    <div className='flex justify-between items center'>
                                        <span className='text-base font-body font-medium text-gray-700'>
                                            Total
                                        </span>
                                        <span className='text-base font-body font-bold text-gray-700'>
                                            $991
                                        </span>
                                    </div>
                                    <Button classNames={`group mt-6 relative w-full font-body font-medium flex justify-center py-2 px-16 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                            context={'Reserve'}
                                            type={'submit'}
                                    />
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
        </div>
    );
};

export default ApartmentForm;