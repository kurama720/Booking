import React, { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { StarIcon } from "@heroicons/react/solid";
import { IApartmentCardProps } from "../ApartmentCard/IApartmentFormProps";
import "@splidejs/splide/dist/css/splide.min.css";
import "./confirmCard.css";
import img from "../../assets/img/image1.svg";

const ConfirmCard: FC<IApartmentCardProps> = ({
  title,
  rating,
  description,
  price,
}) => {
  const pictureList = [
    { img, id: 1 },
    { img, id: 2 },
    { img, id: 3 },
    { img, id: 4 },
    { img, id: 5 },
    { img, id: 6 },
  ];

  return (
    <div>
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
            <div className="flex justify-start items-start flex-col">
              <h4 className="text-xl font-body text-gray-900">{title}</h4>
              <span className="text-sm font-body text-gray-600 text-ellipsis">
                {description?.substring(0, 30)}...
              </span>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex items-center">
              <span>
                <StarIcon className="w-4 h-4 text-blue-600" />
              </span>
              <span className="text-xs font-body text-gray-900">{rating}</span>
              <span className="text-xs font-body text-gray-500">
                (15 reviews)
              </span>
            </div>
            <div className="flex flex-col">
              <div>
                <span className="text-xs font-body text-gray-900 font-medium">
                  ${price}
                </span>
                <span className="text-xs font-body text-gray-500 mx-0.5">
                  /
                </span>
                <span className="text-xs font-body text-gray-500">night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 mt-6" />
    </div>
  );
};

export default ConfirmCard;
