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
  id: number | null;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
}
