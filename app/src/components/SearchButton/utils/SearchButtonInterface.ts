import React from "react";

interface BookingState {
  city: string;
  lat: number;
  lon: number;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface SearchButtonProps {
  userBookingDate: BookingState;
  setApartments: React.Dispatch<React.SetStateAction<any[]>>;
}
