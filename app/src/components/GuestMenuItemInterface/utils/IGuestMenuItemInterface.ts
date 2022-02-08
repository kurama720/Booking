import React from "react";
import { BookingState } from "../../../pages/HomePage/utils/HomePageInterface";

export interface GuestMenuProps {
  description: string;
  header: string;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
  userBookingDate: BookingState;
  numberOfGuests: number;
  setNumberOfGuests: React.Dispatch<React.SetStateAction<number>>;
}
