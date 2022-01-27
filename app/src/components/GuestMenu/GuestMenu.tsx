import React from "react";
import { UserIcon } from "@heroicons/react/solid";
import { GuestMenuProps } from "./utils/GuestMenuInterface";

function GuestMenu({
  handleMenu,
  setCalendarPopUpStatus,
  isActiveLocationBox,
  activeModel,
}: GuestMenuProps) {
  return (
    <div className="w-56 h-[2.375rem] relative sm:col-span-3">
      <label
        htmlFor="guest-group"
        className="position absolute text-gray-400 font-body text-sm top-2.5 left-[2.5625rem]"
      >
        Add guests
      </label>
      <input
        type="button"
        name="guest-group"
        id="guest-group"
        onClick={() => {
          setCalendarPopUpStatus(false);
          handleMenu();
          isActiveLocationBox(false);
        }}
        className="py-1.5 px-[41px] outline-none bg-white border border-[#D1D5DB] shadow-sm focus:border-[#3B82F6] block w-full"
      />
      <div className="absolute bottom-2 left-4">
        <UserIcon
          className="w-[1.24rem] h-[1.3728rem]"
          fill={activeModel ? "#6B7280" : "rgb(156 163 175)"}
        />
      </div>
    </div>
  );
}

export default GuestMenu;
