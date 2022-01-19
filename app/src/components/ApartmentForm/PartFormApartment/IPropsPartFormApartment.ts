import React from "react";
import {DateRange} from "@mui/lab/DateRangePicker/RangeTypes";

export interface IPropsFormApartment {
    valueDate: DateRange<Date>
    setValueDate: React.Dispatch<React.SetStateAction<DateRange<Date>>>
    handleSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
    quantityGuests: number
    setQuantityGuests: React.Dispatch<React.SetStateAction<number>>
    isShowGuestsWindow: boolean
    decrementGuests: () => void
    incrementGuests: () => void
    handleChangeShowGuestsWindow: () => void
}
