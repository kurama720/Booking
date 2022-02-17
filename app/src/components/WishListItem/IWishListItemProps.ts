import { IFeature } from "../../models/globalInterfaces/globalIntefaces";

export interface IWishListItemProps {
  id: number;
  description: string;
  feature: IFeature;
  lat: number;
  lon: number;
  price: number;
  rating?: number;
  title: string;
}
