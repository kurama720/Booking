import {DateRange} from "@mui/lab/DateRangePicker";

interface BookingState {
  city: string;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface CalendarMenuProps {
  handleCalendarPopUpStatus: () => void
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  date: DateRange<Date>;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
  userBookingDate: BookingState;
  calendarPopUpStatus: boolean;
}

