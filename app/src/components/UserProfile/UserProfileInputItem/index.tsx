import React from "react";
import { Field } from "formik";
import { BsExclamationCircleFill } from "react-icons/bs";
import { UserProfileInputItemProps } from "./UserProfileInputItemProps";
import UserProfileSpinner from "../UserProfileSpinner";

const UserProfileInputItem = ({
  value,
  handler,
  isLoaded,
  name,
  error,
  touched,
  handleBlur,
}: UserProfileInputItemProps) => {
  return (
    <div className="relative">
      <Field
        className="py-[0.5rem] w-80 pl-[12px] rounded-md font-body  outline-none  text-gray-900 border border-gray-400 shadow-sm focus:border-blue-400  block sm:text-sm"
        type="text"
        name={name}
        disabled={!isLoaded}
        value={value || ""}
        onBlur={handleBlur}
        onChange={handler}
      />
      {!isLoaded && <UserProfileSpinner />}
      {error && touched ? (
        <span className="flex justify-start items-start text-red-600 text-xs font-body">
          <span className="pt-0.5 pr-1 ">
            <BsExclamationCircleFill className="text-red-600 w-3 h-3" />
          </span>
          {error}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfileInputItem;
