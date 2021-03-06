import React, { FC } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { IPropsSliderApartmentPhotos } from "./IPropsSliderApartmentPhotos";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../ApartmentCard/react-splide.css";

const SliderApartmentPhotos: FC<IPropsSliderApartmentPhotos> = ({
  setActive,
  images,
}) => {
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
          {images.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SplideSlide key={index}>
              <img
                src={item}
                alt={`img-${index}`}
                className="rounded w-full h-full max-w-[800px] max-h-[581px] object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default SliderApartmentPhotos;
