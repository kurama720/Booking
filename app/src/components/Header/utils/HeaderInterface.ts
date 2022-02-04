import React from "react";
import { BookingState } from "../../../pages/HomePage/utils/HomePageInterface";

export interface Cities {
  name: string;
  lat: number;
  lon: number;
}

export interface AuthMenuItemLogoutProps {
  handleLogInPopUp: () => void;
  handleSignUpPopUpStatus: () => void;
  activeLocationBox: boolean;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogoutPopUpStatus: () => void;
  calendarPopUpStatus: boolean;
  handleCalendarPopUpStatus: () => void;
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
  userBookingDate: BookingState;
  setApartments: React.Dispatch<React.SetStateAction<any[]>>;
  handleBookingHistory: () => void;
}
