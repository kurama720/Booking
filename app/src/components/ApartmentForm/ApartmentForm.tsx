import React, {FC, useState} from 'react';
import {StarIcon} from '@heroicons/react/solid';
import {Formik} from "formik";
import {dataForApartmentForm, IFormApartment} from "./IFormApartment";
import PartFormApartment from "./PartFormApartment/PartFormApartment";
import {validationSchema} from "./validationSchema";

const ApartmentForm: FC = () => {
    const [quantityGuests, setQuantityGuests] = useState<number>(1)
    const [isShowGuestsWindow, setIsShowGuestsWindow] = useState<boolean>(false)
    const [serverErrors,setServerErrors] = useState(null)

    const handleSubmit = async (data: IFormApartment) => {
        const dataForReserve: dataForApartmentForm = {
            ...data,
            guests: quantityGuests
        }
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
                    validateOnBlur
                    validationSchema={validationSchema}
                >
                    {(
                         formikProps
                      ) =>
                        (
                            <PartFormApartment
                                values={formikProps.values}
                                touched={formikProps.touched}
                                errors={formikProps.errors}
                                handleChange={formikProps.handleChange}
                                setQuantityGuests={setQuantityGuests}
                                handleBlur={formikProps.handleBlur}
                                handleSubmit={formikProps.handleSubmit}
                                quantityGuests={quantityGuests}
                                isShowGuestsWindow={isShowGuestsWindow}
                                decrementGuests={decrementGuests}
                                incrementGuests={incrementGuests}
                                handleChangeShowGuestsWindow={handleChangeShowGuestsWindow}
                            />
                        )}
                </Formik>
            </div>
        </div>
    );
};

export default ApartmentForm;
