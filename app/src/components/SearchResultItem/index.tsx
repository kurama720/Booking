import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { StarIcon, HeartIcon as HeartActiveIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import SliderCardMap from "../MapApartmentCard/SliderCardMap/SliderCardMap";
import { IObjectPicture } from "../MapApartmentCard/SliderCardMap/IPropsCardMap";

export interface ISearchResultItemProps {
  id: number;
  img_content: Array<IObjectPicture>;
  title: string;
  description: string;
  guestsAndBeds: [number, number];
  pricePerNight: number;
  totalPrice: number;
  rating: number;
  views: number;
}

const SearchResultItem: FC<ISearchResultItemProps> = ({
  id,
  img_content,
  title,
  description,
  guestsAndBeds,
  pricePerNight,
  totalPrice,
  rating,
  views,
}) => {
  const [isFavourite, setFavourite] = useState(false);

  const handleClick = () => setFavourite((prev) => !prev);

  return (
    <li className="flex py-4 first:pt-0 last:pb-0 border-b last:border-b-0 border-gray-200">
      <div className="rounded-md overflow-hidden">
        <SliderCardMap listPictures={img_content} />
      </div>
      <div className="flex flex-col justify-between flex-grow pl-4 font-body">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <NavLink
              className="text-xl font-medium text-gray-900"
              to={`/apartments/${id}`}
            >
              {title}
            </NavLink>
            <button onClick={handleClick}>
              {isFavourite ? (
                <HeartActiveIcon className="text-blue-500 w-6 h-6" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <span className="text-sm text-gray-600">{description}</span>
          <span className="text-xs text-gray-500">
            {guestsAndBeds[0]} guests · {guestsAndBeds[1]} beds
          </span>
        </div>
        <div className="mt-auto">
          <div className="text-sm text-right">
            <span className="font-medium text-gray-900">${pricePerNight}</span>
            <span className="font-normal text-gray-500"> / night</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <StarIcon className="text-blue-500 w-4 h-4" />
              <span className="mx-[2px] text-gray-900">{rating}</span>
              <span>({views} reviews)</span>
            </div>
            <span>Total ${totalPrice}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchResultItem;
