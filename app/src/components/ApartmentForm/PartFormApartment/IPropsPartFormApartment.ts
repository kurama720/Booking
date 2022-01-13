import {IFormApartment} from "../IFormApartment";
import React from "react";

export interface IPropsFormApartment {
    values: IFormApartment
    errors: any
    touched: any
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    handleSubmit:  (e?: (React.FormEvent<HTMLFormElement> | undefined)) => void
    quantityGuests: number
    setQuantityGuests: React.Dispatch<React.SetStateAction<number>>
    isShowGuestsWindow: boolean
    decrementGuests: () => void
    incrementGuests: () => void
    handleChangeShowGuestsWindow: () => void
}
