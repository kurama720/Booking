import React from "react";

export interface IInput {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  handleFocus?: () => void;
}
