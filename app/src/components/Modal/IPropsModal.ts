import React from "react";

export interface IPropsModal {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactChildren | React.ReactNode
}
