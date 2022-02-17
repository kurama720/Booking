import React from "react";
import { UserProfileInputItemProps } from "./UserProfileInputItemProps";
import UserProfileSpinner from "../UserProfileSpinner";

const UserProfileInputItem = ({
  value,
  handler,
  isLoaded,
}: UserProfileInputItemProps) => {
  return (
    <div className="relative">
      <input
        className="py-[0.5rem] w-80 pl-[12px] rounded-md font-body  outline-none  text-gray-900 border border-gray-400 shadow-sm focus:border-blue-400  block sm:text-sm"
        type="text"
        disabled={!isLoaded}
        value={value || ""}
        onChange={(e) => handler(e.target.value)}
      />
      {!isLoaded && <UserProfileSpinner />}
    </div>
  );
};

export default UserProfileInputItem;
