import React, { useState } from "react";
import { HeartIcon as SolidHeartIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import SliderCardMap from "./SliderCardMap/SliderCardMap";
import img from "../../assets/img/image1.svg";

const MapApartmentCard = () => {
  const [isLikeCard, setIsLikeCard] = useState<boolean>(false);
  const mokListPicture = [
    { id: 1, img },
    { id: 2, img },
    { id: 3, img },
    { id: 4, img },
    { id: 5, img },
  ];

  const handleIsLikeCard = () => {
    setIsLikeCard((prev) => !prev);
  };

  return (
    <div className="rounded flex flex-col w-full h-full max-w-[15rem] max-h-[17.5rem] shadow relative bg-white overflow-hidden">
      <div>
        <SliderCardMap listPictures={mokListPicture} />
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
          <span className="">
            <StarIcon className="h-4 w-4 text-blue-700" />
          </span>
          <span className="text-xs font-body text-gray-900">4,3</span>
          <span className="text-xs font-body text-gray-500">(15)</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base font-body text-gray-900">
            Large flat near center
          </span>
          <span className="text-xs font-body text-gray-500">
            Private room in Minsk
          </span>
        </div>
        <div className="flex items-center justify-start">
          <span className="font-medium font-body text-sm text-gray-900">
            $34
          </span>
          <span className="text-sm font-body text-gray-500 mx-0.5">/</span>
          <span className="text-sm font-body text-gray-500">night</span>
        </div>
      </div>
    </div>
  );
};

export default MapApartmentCard;
