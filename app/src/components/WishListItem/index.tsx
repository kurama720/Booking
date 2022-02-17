import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { StarIcon } from "@heroicons/react/solid";
import "@splidejs/splide/dist/css/splide.min.css";
import img from "../../assets/img/image1.svg";
import "./react-splide.css";
import { IWishListItemProps } from "./IWishListItemProps";

const WishListItem = ({ title, price, feature }: IWishListItemProps) => {
  const pictureList = [
    { img, id: 1 },
    { img, id: 2 },
    { img, id: 3 },
    { img, id: 4 },
    { img, id: 5 },
    { img, id: 6 },
  ];

  return (
    <div className="max-w-screen-sm">
      <div className="flex">
        <Splide
          options={{
            arrows: false,
            height: 144,
            width: 240,
          }}
        >
          {pictureList.map((item, index) => (
            <SplideSlide key={item.id}>
              <img src={item.img} alt={`object${index}`} className="rounded" />
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
                {feature.guests} guests
              </span>
              <span className="inline-block mt-2 mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full" />
              <span className="text-xs font-body text-gray-500">
                {feature.beds} beds
              </span>
            </div>
          </div>
          <div className="mt-auto flex justify-between items-end flex-row-reverse">
            <div className="text-sm text-right">
              <span className="font-medium text-gray-900">${price}</span>
              <span className="font-normal text-gray-500"> / night</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <StarIcon className="text-blue-500 w-4 h-4" />
                <span className="mx-[2px] text-gray-900">7</span>
                <span>(15 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 mt-4" />
    </div>
  );
};

export default WishListItem;
