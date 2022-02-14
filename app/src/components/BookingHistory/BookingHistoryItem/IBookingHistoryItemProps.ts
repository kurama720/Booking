import React from "react";
import { TBookingHistory } from "../index";

export interface IBookingHistoryProps {
  id: string;
  apartment: string;
  persons: number;
  checkIn: string;
  checkOut: string;
  bookingData: TBookingHistory[];
  setBookingData: React.Dispatch<React.SetStateAction<TBookingHistory[]>>;
}
