import React from "react";
import GuestMenuItemInterface from "../GuestMenuItemInterface/GuestMenuItemInterface";
import { GuestMenuItemProps } from "./utils/GuestMenuItemInterface";

function GuestMenuItem({
  userBookingDate,
  setUserBookingDate,
  numberOfGuests,
  setNumberOfGuests,
}: GuestMenuItemProps) {
  return (
    <div className="w-[25rem] h-[4.5rem] rounded-md shadow-sm absolute left-[50%] top-12 1.5xl:left-[43.3%] lg:left-[11.2%] 3xl:left-[43.4%] 4xl:left-[44.6%] 5xl:left-[46%] xlg:left-[42.1%] mlg:left-[40.2%] 3.5xl:left-[44%] 1xl:left-[42.8%] 3.75xl:left-[44.5%] 6xl:left-[46.4%]">
      <GuestMenuItemInterface
        userBookingDate={userBookingDate}
        setUserBookingDate={setUserBookingDate}
        numberOfGuests={numberOfGuests}
        setNumberOfGuests={setNumberOfGuests}
        description="Ages 13 or above"
        header="Guests"
      />
    </div>
  );
}

export default GuestMenuItem;
