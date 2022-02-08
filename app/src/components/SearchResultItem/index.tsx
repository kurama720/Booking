import React, { FC, useState } from "react";
import { StarIcon, HeartIcon as HeartActiveIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import SliderCardMap from "../MapApartmentCard/SliderCardMap/SliderCardMap";
import { BookingState } from "../../pages/HomePage/utils/HomePageInterface";
import { parseDateReserve } from "../../models/parseDate";

interface IPropsSearchItem {
  userBookingDate: BookingState;
  title: string;
  img_content: Array<string>;
  price: number;
  rating: null | number;
}

const SearchResultItem: FC<IPropsSearchItem> = ({
  img_content,
  title,
  price,
  rating,
  userBookingDate,
}) => {
  const [isFavourite, setFavourite] = useState(false);

  const handleClick = () => setFavourite((prev) => !prev);

  const numberOfNights = parseDateReserve(
    userBookingDate.checkInDate,
    userBookingDate.checkOutDate
  );

  return (
    <li className="flex py-4 first:pt-0 last:pb-0 border-b last:border-b-0 border-gray-200">
      <div className="rounded-md overflow-hidden">
        <SliderCardMap listPictures={img_content} />
      </div>
      <div className="flex flex-col justify-between flex-grow pl-4 font-body">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-900">{title}</span>
            <button onClick={handleClick}>
              {isFavourite ? (
                <HeartActiveIcon className="text-blue-500 w-6 h-6" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <span className="text-xs text-gray-500">1 guests · 1 beds</span>
        </div>
        <div className="mt-auto">
          <div className="text-sm text-right">
            <span className="font-medium text-gray-900">${price}</span>
            <span className="font-normal text-gray-500"> / night</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <StarIcon className="text-blue-500 w-4 h-4" />
              <span className="mx-[2px] text-gray-900">{rating}</span>
              <span>(15 reviews)</span>
            </div>
            <span>Total ${price * numberOfNights}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchResultItem;