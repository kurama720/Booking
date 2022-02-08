import React, { FC } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Room from "../../ObjectPageCard/utils/img/image5.svg";
import Room2 from "../../ObjectPageCard/utils/img/image1.svg";
import Room3 from "../../ObjectPageCard/utils/img/image2.svg";
import Room4 from "../../ObjectPageCard/utils/img/image3.svg";
import Room5 from "../../ObjectPageCard/utils/img/image4.svg";
import { IPropsSliderApartmentPhotos } from "./IPropsSliderApartmentPhotos";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../ApartmentCard/react-splide.css";

const SliderApartmentPhotos: FC<IPropsSliderApartmentPhotos> = ({
  setActive,
}) => {
  const mokListPictures = [
    { img: Room, id: 1 },
    { img: Room2, id: 2 },
    { img: Room3, id: 3 },
    { img: Room4, id: 4 },
    { img: Room5, id: 5 },
  ];

  const closeModal = () => {
    setActive(false);
  };

  return (
    <div
      className="bg-white rounded-md max-w-[870px] w-full px-[32px] py-[40px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-body font-bold text-gray-600">
          Apartment photos
        </span>
        <button type="button" onClick={closeModal}>
          <XIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Splide
          options={{
            arrows: false,
            height: 581,
            width: 800,
          }}
        >
          {mokListPictures.map((item, index) => (
            <SplideSlide key={item.id}>
              <img
                src={item.img}
                alt={`img-${index}`}
                className="rounded object-cover w-full h-full max-w-[800px] max-h-[581px] object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default SliderApartmentPhotos;
