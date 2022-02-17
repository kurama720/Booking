import { IFeature } from "../../models/globalInterfaces/globalIntefaces";

export interface IWishListItemProps {
  id: number;
  feature: IFeature;
  price: number;
  rating: number | null;
  title: string;
  img_content: Array<string>;
  onDelete: () => Promise<void>;
}
