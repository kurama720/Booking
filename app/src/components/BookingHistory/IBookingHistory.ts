export interface IBookingHistory {
  handleBookingHistory: () => void;
}

export interface TBookingHistory {
  id: number;
  apartment: string;
  num_of_persons: number;
  comment?: null | string;
  check_in_date: string;
  check_out_date: string;
}
