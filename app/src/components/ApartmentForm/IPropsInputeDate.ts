import React from "react";

export interface IPropsInputDate{
    value: string
    error:string
    touched: boolean
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
}
