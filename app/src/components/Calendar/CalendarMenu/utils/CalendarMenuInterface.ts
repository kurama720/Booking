import { DateRange } from "@mui/lab/DateRangePicker";
import React from "react";

export interface CalendarMenuProps {
  setDate: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
  date: DateRange<Date>;
}
