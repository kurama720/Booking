import {DateRange} from "@mui/lab/DateRangePicker";
import * as React from "react";

export interface IPropsCalendar {
    valueDate: DateRange<Date>
    setValueDate: React.Dispatch<React.SetStateAction<DateRange<Date>>>
}