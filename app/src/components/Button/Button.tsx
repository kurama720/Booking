import React from "react";

const Button = ({ classNames, context, onClick, type }: any) => {
  return (
    <button type={type} className={classNames} onClick={onClick}>
      {context}
    </button>
  );
};

export default Button;
