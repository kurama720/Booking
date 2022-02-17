import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { JWT } from "../../hooks/auth.hook.interface";
import SliderCardMap from "../MapApartmentCard/SliderCardMap/SliderCardMap";
import { BookingState } from "../../pages/HomePage/utils/HomePageInterface";
import { parseDateReserve } from "../../models/parseDate";
import { IFeature } from "../../models/globalInterfaces/globalIntefaces";
import FavouriteButton from "../FavouriteButton";
import { useFavourite } from "../../hooks/favoirite.hook";
import { getIsAuth } from "../../models/getIsAuth";

interface IPropsSearchItem {
  id: number;
  userBookingDate: BookingState;
  title: string;
  img_content: Array<string>;
  price: number;
  feature: IFeature;
  is_favorite: boolean;
}

const SearchResultItem: FC<IPropsSearchItem> = ({
  id,
  img_content,
  title,
  price,
  userBookingDate,
  feature,
  is_favorite,
}) => {
  const storageName = "userData" as LocalKey<JWT>;
  const userData = LocalStorage.getItem(storageName);
  const [isFavourite, setFavourite] = useState(is_favorite);
  const { addFavourite, removeFavourite } = useFavourite(userData);
  const isAuth = getIsAuth();

  const handleClick = async () => {
    setFavourite((prev) => !prev);
    try {
      if (!isFavourite) {
        await addFavourite(id, !isFavourite);
      } else {
        await removeFavourite(id);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            <NavLink
              className="text-xl font-medium text-gray-900"
              to={`/apartments/${id}`}
            >
              {title}
            </NavLink>
            {isAuth && (
              <FavouriteButton handler={handleClick} likeStatus={isFavourite} />
            )}
          </div>
          <span className="text-xs text-gray-500">
            {feature.guests} guests · {feature.beds} beds
          </span>
        </div>
        <div className="mt-auto">
          <div className="text-sm text-right">
            <span className="font-medium text-gray-900">${price}</span>
            <span className="font-normal text-gray-500"> / night</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <StarIcon className="text-blue-500 w-4 h-4" />
              <span className="mx-[2px] text-gray-900">7</span>
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
