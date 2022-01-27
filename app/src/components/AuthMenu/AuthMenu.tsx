import React from "react";
import { MenuAlt1Icon, UserCircleIcon } from "@heroicons/react/solid";
import { AuthMenuProps } from "./utils/AuthMenuInterface";

function AuthMenu({ activeUserMenu, isActiveUserMenu }: AuthMenuProps) {
  const handleMenuStatus = () => {
    isActiveUserMenu((prev) => !prev);
  };

  const authMenuStyle =
    "w-[5.25rem] h-[2.375rem] mt-px rounded-3xl shadow-sm flex items-center justify-center border-blue-500";

  return (
    <div
      className={`
        ${authMenuStyle} ${
        activeUserMenu ? "border-2 border-blue-500" : "border border-gray-300"
      }`}
    >
      <button onClick={handleMenuStatus} type="button">
        <MenuAlt1Icon
          className="w-[1.24rem] h-[1.3728rem] mr-[0.6875rem]"
          fill={activeUserMenu ? "#2563EB" : "#9CA3AF"}
        />
      </button>
      <div>
        <UserCircleIcon className="w-[1.6rem] h-[1.6rem]" fill="#9CA3AF" />
      </div>
    </div>
  );
}

export default AuthMenu;
