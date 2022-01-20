import {DateRange} from "@mui/lab/DateRangePicker";

export interface CalendarMenuProps {
  setDate: React.Dispatch<React.SetStateAction<DateRange<Date>>>
  date: DateRange<Date>
}