import { IFeature } from "../../models/globalInterfaces/globalIntefaces";

export interface IWishListItemProps {
  id: number;
  description: string;
  img_content: Array<string>;
  feature: IFeature;
  lat: number;
  lon: number;
  price: number;
  rating?: number;
  title: string;
}
