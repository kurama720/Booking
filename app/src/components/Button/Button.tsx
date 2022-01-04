import React from "react";
import {ButtonProps} from "./button.interface";

const Button = ({ classNames, context, onClick, type, disabled }: ButtonProps) => {
  return (
    <button type={type} className={classNames} onClick={onClick} disabled={disabled}>
      {context}
    </button>
  );
};

export default Button;
