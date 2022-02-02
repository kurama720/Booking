import React, { useState, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/solid";
import { CalendarMenuProps } from "./utils/CalendarInterface";

function Calendar({
  handleCalendarPopUpStatus,
  isActiveLocationBox,
  isActiveModel,
  date,
  setUserBookingDate,
  calendarPopUpStatus,
  userBookingDate,
}: CalendarMenuProps) {
  const [placeholderStatus, setPlaceholderStatus] = useState<string>(
    "Check in – Check out"
  );
  const [isFillDate, setFillDate] = useState<boolean>(false);

  useEffect(() => {
    if (!!date[0] && !!date[1]) {
      const firstDate = date[0];
      const secondDate = date[1];
      const firstDateYear = firstDate.getFullYear();
      const secondDateYear = secondDate.getFullYear();
      let firstDateMonth: number | string = firstDate.getMonth() + 1;
      let secondDateMonth: number | string = secondDate.getMonth() + 1;
      let firstDateDay: number | string = firstDate.getDate();
      let secondDateDay: number | string = secondDate.getDate();

      if (firstDateMonth < 10) {
        firstDateMonth = `0${firstDateMonth.toString()}`;
      }
      if (secondDateMonth < 10) {
        secondDateMonth = `0${secondDateMonth.toString()}`;
      }
      if (firstDateDay < 10) {
        firstDateDay = `0${firstDateDay.toString()}`;
      }
      if (secondDateDay < 10) {
        secondDateDay = `0${secondDateDay.toString()}`;
      }

      setPlaceholderStatus(
        `${firstDateDay}/${firstDateMonth}/${firstDateYear} – ${secondDateDay}/${secondDateMonth}/${secondDateYear}`
      );
      setUserBookingDate({
        ...userBookingDate,
        checkInDate: `${firstDateYear}-${firstDateMonth}-${firstDateDay}`,
        checkOutDate: `${secondDateYear}-${secondDateMonth}-${secondDateDay}`,
      });
      setFillDate(true);
    }
  }, [date]);

  return (
    <div className="w-56 h-[2.375rem] relative sm:col-span-3">
      <label
        htmlFor="calendar"
        className={
          isFillDate
            ? "position absolute text-gray-900 font-body text-sm top-2.5 left-[2.5625rem]"
            : "position absolute text-gray-400 font-body text-sm top-2.5 left-[2.5625rem]"
        }
      >
        {placeholderStatus}
      </label>
      <input
        onClick={() => {
          handleCalendarPopUpStatus();
          isActiveLocationBox(false);
          isActiveModel(false);
        }}
        type="button"
        name="calendar"
        id="calendar"
        className="py-[0.5rem] font-body  bg-white outline-none px-[2.56rem] text-gray-400 border border-[#D1D5DB] shadow-sm focus:border-[#3B82F6]  block w-full sm:text-sm"
      />
      <div className="absolute bottom-2 left-4">
        <CalendarIcon
          className="w-[1.24rem] h-[1.3728rem]"
          fill={calendarPopUpStatus ? "#6B7280" : "rgb(156 163 175)"}
        />
      </div>
    </div>
  );
}

export default Calendar;
