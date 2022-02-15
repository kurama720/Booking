import React from "react";
import { HeartIcon as HeartActiveIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { IFavouriteButtonProps } from "./IFavouriteButtonProps";

const FavouriteButton = ({
  disabledStatus,
  handler,
  likeStatus,
  classNames,
  bright,
  cursorDefault,
}: IFavouriteButtonProps) => {
  return (
    <button
      disabled={disabledStatus}
      onClick={handler}
      className={`${classNames} ${cursorDefault ? "cursor-default" : ""}`}
    >
      {likeStatus ? (
        <HeartActiveIcon className="h-5 w-5 text-red-400" />
      ) : (
        <HeartIcon
          className={`
            h-5 w-5 
            ${bright ? "text-gray-200" : ""} 
            hover:stroke-gray-500
          `}
        />
      )}
    </button>
  );
};

export default FavouriteButton;
