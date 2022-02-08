import React from "react";
import { DateRange } from "@mui/lab/DateRangePicker";
import { BookingState } from "../../../pages/HomePage/utils/HomePageInterface";

export interface CalendarMenuProps {
  handleCalendarPopUpStatus: () => void;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  date: DateRange<Date>;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
  userBookingDate: BookingState;
  calendarPopUpStatus: boolean;
}
