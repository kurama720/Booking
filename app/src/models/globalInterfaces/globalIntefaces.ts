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
