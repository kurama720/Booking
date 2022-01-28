import React, { useState, useLayoutEffect, useRef } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { GuestMenuProps } from "./utils/GuestMenuInterface";

function GuestMenu({
  handleMenu,
  setCalendarPopUpStatus,
  isActiveLocationBox,
  activeModel,
  numberOfGuests,
  setNumberOfGuests,
}: GuestMenuProps) {
  const [guest, setGuest] = useState("Add guests");
  const [isAddGuest, setIsAddGuest] = useState<boolean>(false);
  const firstUpdate = useRef(true);

  const guestMenuStyle =
    "position absolute font-body text-sm top-2.5 left-[41px]";

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      const suffix = numberOfGuests > 1 ? "s" : "";

      setGuest(`${numberOfGuests} guest${suffix}`);
      setIsAddGuest(true);
    }
  }, [numberOfGuests, setNumberOfGuests]);

  return (
    <div className="w-56 h-[38px] relative sm:col-span-3">
      <label
        htmlFor="guest-group"
        className={`
          ${guestMenuStyle} 
          ${!isAddGuest ? "text-gray-400" : "text-gray-900"}
        `}
      >
        {guest}
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
          className="w-[20px] h-[22px]"
          fill={activeModel ? "#6B7280" : "rgb(156 163 175)"}
        />
      </div>
    </div>
  );
}

export default GuestMenu;
