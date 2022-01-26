import React from "react";
import { ButtonProps } from "./button.interface";

function Button({ classNames, context, onClick, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames}
      onMouseDown={onClick}
      disabled={disabled}
    >
      {context}
    </button>
  );
}

export default Button;
