import React, {FC, useState} from 'react';
import {StarIcon} from '@heroicons/react/solid';
import {dataForApartmentForm} from "./IFormApartment";
import PartFormApartment from "./PartFormApartment/PartFormApartment";
import {DateRange} from "@mui/lab/DateRangePicker";
import {parseDate} from "../../models/parseDate";

const ApartmentForm: FC = () => {
    const [valueDate, setValueDate] = React.useState<DateRange<Date>>([null, null]);
    const [numberGuests, setNumberGuests] = useState<number>(1)
    const [isShowGuestsWindow, setIsShowGuestsWindow] = useState<boolean>(false)
    const [serverErrors, setServerErrors] = useState(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataForReserve: dataForApartmentForm = {
            check_in: parseDate(valueDate[0]),
            check_out: parseDate(valueDate[1]),
            guests: numberGuests
        }
    }

    const handleChangeShowGuestsWindow = (): void => {
        setIsShowGuestsWindow(prev => !prev)
    }

    const incrementGuests = (): void => {
        setNumberGuests(prev => prev + 1)
    }

    const decrementGuests = (): void => {
        setNumberGuests(prev => prev - 1)
    }

    return (
        <div>
            <div className='shadow w-full p-6 max-w-[350px]'>
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='text-xl font-body font-bold text-gray-900'>$34</span>
                        <span className='text-xl font-body text-gray-500'>/ night</span>
                    </div>
                    <div className='flex items-center'>
                        <span><StarIcon className='text-blue-500 w-4 h-4'/></span>
                        <span className='text-sm font-body'>4,3</span>
                        <span className='inline-block mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full'/>
                        <span className='text-blue-600 text-sm font-body font-medium'>15 reviews</span>
                    </div>
                </div>
                <PartFormApartment
                    valueDate={valueDate}
                    setValueDate={setValueDate}
                    setNumberGuests={setNumberGuests}
                    handleSubmit={handleSubmit}
                    numberGuests={numberGuests}
                    isShowGuestsWindow={isShowGuestsWindow}
                    decrementGuests={decrementGuests}
                    incrementGuests={incrementGuests}
                    handleChangeShowGuestsWindow={handleChangeShowGuestsWindow}
                />
            </div>
        </div>
    );
};

export default ApartmentForm;
