interface BookingState {
  city: string;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface SearchButtonProps {
  userBookingDate: BookingState;
}
