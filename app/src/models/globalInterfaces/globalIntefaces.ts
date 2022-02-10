export interface IApartment {
  id: number;
  uuid: string;
  feature: null;
  title: string;
  description: string;
  img_content: Array<string>;
  lat: number;
  lon: number;
  price: number;
  rating: null | number;
}

export interface IBookingReverseData {
  id: string | undefined;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
}

export interface IBookDataApartment {
  num_of_persons: number;
  check_in_date: string;
  check_out_date: string;
  idempotency_key: string;
}
