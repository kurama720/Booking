import React, { FC } from "react";
import { IInput } from "./IInput";

const Input: FC<IInput> = ({
  name,
  value,
  placeholder,
  handleBlur,
  handleChange,
  type,
  handleFocus,
}) => {
  return (
    <input
      id={name}
      name={name}
      type={type || "text"}
      autoComplete="off"
      className="appearance-none font-body text-gray-900 text-sm relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export default Input;
