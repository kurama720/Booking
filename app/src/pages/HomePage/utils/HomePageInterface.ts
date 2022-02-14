import React from "react";
import { IApartment } from "../../../models/globalInterfaces/globalIntefaces";

export interface IPropsHomePage {
  setApartments: React.Dispatch<React.SetStateAction<IApartment[]>>;
  userBookingDate: BookingState;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
}

export interface BookingState {
  lat: number;
  lon: number;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
  city: string;
}
