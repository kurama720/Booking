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
  handleSearchMenu?: () => void;
  isActiveSearchMenu?: boolean;
  setApartments: React.Dispatch<React.SetStateAction<any[]>>;
  handleBookingHistory: () => void;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  activeModel: boolean;
  numberOfGuests: number;
  setNumberOfGuests: React.Dispatch<React.SetStateAction<number>>;
  guest: string;
  setGuest: React.Dispatch<React.SetStateAction<string>>;
  isAddGuest: boolean;
  setIsAddGuest: React.Dispatch<React.SetStateAction<boolean>>;
  handleFavouriteApartmentsList: () => void;
}
