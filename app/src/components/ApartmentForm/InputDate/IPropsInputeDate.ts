import React from "react";

export interface IPropsInputDate{
    value: string
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    label: string
    borderRadius: 'left' | 'right'
}