import React from "react";
import { BookingState } from "../../../pages/HomePage/utils/HomePageInterface";
import { IApartment } from "../../../models/globalInterfaces/globalIntefaces";

export interface SearchButtonProps {
  userBookingDate: BookingState;
  setApartments: React.Dispatch<React.SetStateAction<IApartment[]>>;
}
