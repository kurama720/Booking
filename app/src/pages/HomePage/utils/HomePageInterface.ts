import React from "react";

export interface IPropsHomePage {
  setApartments: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface BookingState {
  lat: number;
  lon: number;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
  radius: number;
}
