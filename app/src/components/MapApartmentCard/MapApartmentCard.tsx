import React, { FC, useState } from "react";
import { HeartIcon as SolidHeartIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import SliderCardMap from "./SliderCardMap/SliderCardMap";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";

interface IMapApartmentCardProps {
  apartment: IApartment;
  city: string;
}

const MapApartmentCard: FC<IMapApartmentCardProps> = ({ apartment, city }) => {
  const [isLikeCard, setIsLikeCard] = useState<boolean>(false);

  const handleIsLikeCard = () => {
    setIsLikeCard((prev) => !prev);
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
        <span
          className="cursor-pointer absolute right-2 top-2"
          onClick={handleIsLikeCard}
        >
          {isLikeCard ? (
            <SolidHeartIcon className="w-[20px] h-[17px] text-red-400" />
          ) : (
            <HeartIcon className="w-[20px] h-[17px] text-gray-200" />
          )}
        </span>
      </div>
      <div className="flex flex-col justify-center items-start px-4 pt-2 pb-4 space-y-4">
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
