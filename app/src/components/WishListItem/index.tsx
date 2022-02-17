import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { StarIcon, TrashIcon } from "@heroicons/react/solid";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { JWT } from "../../hooks/auth.hook.interface";
import "@splidejs/splide/dist/css/splide.min.css";
import "./react-splide.css";
import { IWishListItemProps } from "./IWishListItemProps";
import { useFavourite } from "../../hooks/favoirite.hook";

const storageName = "userData" as LocalKey<JWT>;
const userData = LocalStorage.getItem(storageName);

const WishListItem = ({
  title,
  price,
  rating,
  feature,
  img_content,
  id,
  onDelete,
}: IWishListItemProps) => {
  const { removeFavourite } = useFavourite(userData);

  const handleClick = async () => {
    await removeFavourite(id);
    await onDelete();
  };

  return (
    <div className="flex">
      <Splide
        options={{
          arrows: false,
          height: 144,
          width: 240,
        }}
      >
        {img_content.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SplideSlide key={index}>
            <img src={item} alt={`object${index}`} className="rounded" />
          </SplideSlide>
        ))}
      </Splide>
      <div className="w-full pl-3 flex justify-between flex-col">
        <div>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-body text-gray-900">{title}</h4>
          </div>
          <div className="flex justify-start">
            <span className="text-xs font-body text-gray-500">
              {feature?.guests} guests
            </span>
            <span className="inline-block mt-2 mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full" />
            <span className="text-xs font-body text-gray-500">
              {feature?.beds} beds
            </span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              {rating && (
                <>
                  <StarIcon className="text-blue-500 w-4 h-4" />
                  <span className="mx-[2px] text-gray-900">{rating}</span>
                </>
              )}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">${price}</span>
              <span className="font-normal text-gray-500"> / night</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="ml-3 flex items-center justify-center bg-red-600 rounded-md hover:bg-red-700"
        onClick={handleClick}
      >
        <TrashIcon className="text-white w-6 m-2" />
      </button>
    </div>
  );
};

export default WishListItem;
