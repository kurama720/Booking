import React, { FC } from "react";

interface IPropsButtonRegistration {
  isValid: boolean;
  dirty: boolean;
  children: React.ReactChildren | React.ReactNode;
}

const ButtonRegistration: FC<IPropsButtonRegistration> = ({
  isValid,
  children,
  dirty,
}) => {
  return (
    <button
      type="submit"
      disabled={!(isValid && dirty)}
      className={`group relative w-full font-body font-medium flex justify-center py-2 px-16 border border-transparent text-sm rounded-md  ${
        !(isValid && dirty)
          ? "bg-gray-200 text-gray-700"
          : "bg-blue-600 text-white"
      }   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      {children}
    </button>
  );
};

export default ButtonRegistration;
