import React from "react";

export interface Cities {
  name: string
}

export interface BookingState {
  city: string;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
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
}