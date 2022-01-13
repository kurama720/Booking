import React from "react";

export interface IPropsInputDate{
    value: string
    name: string
    error:string
    touched: boolean
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    label: string
    borderRadius: 'left' | 'right'
}
