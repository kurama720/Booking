import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { useParams } from "react-router-dom";
import { IObjectPageCardProps } from "./IObjectPageCardTopProps";
import { JWT } from "../../../hooks/auth.hook.interface";
import FavouriteButton from "../../FavouriteButton";
import { useFavourite } from "../../../hooks/favoirite.hook";

const storageName = "userData" as LocalKey<JWT>;
const userData = LocalStorage.getItem(storageName);

const ObjectsPageCardTop = ({
  sideEffect,
  title,
  rating,
  reviews,
}: IObjectPageCardProps) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const { id } = useParams();
  const { addFavourite, removeFavourite } = useFavourite(userData);

  const handleRemoveFavorite = async () => {
    setLiked((prev) => !prev);
    try {
      await removeFavourite(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSaveFavorite = async () => {
    try {
      setLiked((prev) => !prev);
      await addFavourite(id, !isLiked);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <h1 className="font-body text-3xl font-medium text-gray-900">
          {title}
        </h1>
      </div>
      <div className="w-full flex items-center justify-between pb-6 pt-3">
        <ul className="flex h-5">
          {rating && (
            <>
              <li>
                <StarIcon className="w-5 h-5" fill="rgba(37, 99, 235, 1)" />
              </li>
              <li className="font-body text-sm font-normal text-gray-900 mx-1.5">
                {rating}
              </li>
              <li className="flex items-center mr-1.5">·</li>
            </>
          )}
          <li className="font-body text-sm font-medium text-blue-600 ">
            {reviews} reviews
          </li>
          <li className="flex items-center mx-1.5">·</li>
          <li className="font-body text-sm font-medium text-blue-600">
            Minsk, Minsk Province, Belarus
          </li>
        </ul>
        <div className="flex items-center">
          <FavouriteButton
            disabledStatus={sideEffect}
            likeStatus={isLiked}
            cursorDefault
          />
          {!isLiked ? (
            <button
              disabled={sideEffect}
              className="ml-[7.7px] text-sm font-body"
              onClick={handleSaveFavorite}
            >
              Save
            </button>
          ) : (
            <button
              disabled={sideEffect}
              className="ml-[7.7px] text-sm font-body"
              onClick={handleRemoveFavorite}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectsPageCardTop;
