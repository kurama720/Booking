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
}
