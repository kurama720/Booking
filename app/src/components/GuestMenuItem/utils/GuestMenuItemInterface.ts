interface BookingState {
  city: string;
  numOfPersons: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface GuestMenuItemProps {
  setUserBookingDate:  React.Dispatch<React.SetStateAction<BookingState>>;
  userBookingDate: BookingState;
  numberOfGuests: number;
  setNumberOfGuests:  React.Dispatch<React.SetStateAction<number>>;
}