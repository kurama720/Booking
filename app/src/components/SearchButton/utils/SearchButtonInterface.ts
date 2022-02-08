import React from "react";
import { BookingState } from "../../../pages/HomePage/utils/HomePageInterface";

export interface SearchButtonProps {
  userBookingDate: BookingState;
  setApartments: React.Dispatch<React.SetStateAction<any[]>>;
}
