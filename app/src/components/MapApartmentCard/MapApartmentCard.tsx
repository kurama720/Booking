import React, { FC, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { LocalKey, LocalStorage } from "ts-localstorage";
import SliderCardMap from "./SliderCardMap/SliderCardMap";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";
import { JWT } from "../../hooks/auth.hook.interface";
import FavouriteButton from "../FavouriteButton";
import { useFavourite } from "../../hooks/favoirite.hook";

interface IMapApartmentCardProps {
  apartment: IApartment;
  city: string;
}

const storageName = "userData" as LocalKey<JWT>;
const userData = LocalStorage.getItem(storageName);

const MapApartmentCard: FC<IMapApartmentCardProps> = ({ apartment, city }) => {
  const [isLiked, setLike] = useState<boolean>(false);
  const { addFavourite, removeFavourite } = useFavourite(userData);

  const handleIsLikeCard = async () => {
    setLike((prev) => !prev);
    try {
      if (!isLiked) {
        await addFavourite(apartment.id, !isLiked);
      } else {
        await removeFavourite(apartment.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="rounded flex flex-col w-full h-full max-w-[15rem] shadow relative bg-white overflow-hidden">
      <div>
        {apartment.img_content.length ? (
          <SliderCardMap listPictures={apartment.img_content} />
        ) : (
          <span className="block text-center py-5 font-body font-semibold text-xl">
            No images
          </span>
        )}
        <FavouriteButton
          classNames="cursor-pointer absolute right-2 top-2"
          handler={handleIsLikeCard}
          likeStatus={isLiked}
          bright
        />
      </div>
      <div className="flex flex-col justify-center items-start px-4 pt-4 pb-4 space-y-4">
        <div className="flex items-center">
          {apartment.rating && (
            <>
              <span>
                <StarIcon className="h-4 w-4 text-blue-700" />
              </span>
              <span className="text-xs font-body text-gray-900">
                {apartment.rating}
              </span>
            </>
          )}
          <span className="text-xs font-body text-gray-500">
            ({apartment.reviews})
          </span>
        </div>
        <div className="flex flex-col items-start">
          <NavLink
            className="text-base font-body"
            to={`/apartments/${apartment.id}`}
          >
            {apartment.title}
          </NavLink>
          <span className="text-xs font-body text-gray-500">
            Private room in {city}
          </span>
        </div>
        <div className="flex items-center justify-start">
          <span className="font-medium font-body text-sm text-gray-900">
            ${apartment.price}
          </span>
          <span className="text-sm font-body text-gray-500 mx-0.5">/</span>
          <span className="text-sm font-body text-gray-500">night</span>
        </div>
      </div>
    </div>
  );
};

export default MapApartmentCard;
