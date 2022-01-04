import React from "react";

export interface IPropsInput{
    error: string | undefined
    touched: boolean | undefined
    labelName: string
    name: string
    value: string
    handleChange: (e: React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    placeholder: string
    serverError?: string | undefined
    setServerError?:  any
}
