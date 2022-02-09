export interface IFeature {
  beds: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
}

export interface IApartment {
  id: number;
  uuid: string;
  feature: IFeature;
  title: string;
  description: string;
  img_content: Array<string>;
  lat: number;
  lon: number;
  price: number;
  rating: null | number;
}
