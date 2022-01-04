import React from "react";

export interface IInput{
    name: string
    value: string
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    placeholder: string
    type?: string
    handleFocus?: () => void
}
