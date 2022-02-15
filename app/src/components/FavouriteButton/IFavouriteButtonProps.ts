export interface IFavouriteButtonProps {
  disabledStatus?: boolean;
  likeStatus: boolean;
  handler?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  classNames?: string;
  bright?: boolean;
  cursorDefault?: boolean;
}
