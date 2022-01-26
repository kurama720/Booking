import React from "react";
import { IServerErrors } from "./IServerErrors";

export interface IPropsInput {
  error: string | undefined;
  touched: boolean | undefined;
  labelName: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  serverError?: string;
  setServerError?: React.Dispatch<React.SetStateAction<IServerErrors>>;
}
