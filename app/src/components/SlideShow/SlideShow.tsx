import React, { useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import Modal from "../Modal/Modal";
import SliderApartmentPhotos from "./SliderApartmentPhotos/SliderApartmentPhotos";
import { ISlideShowProps } from "./ISlideShowProps";

const SlideShow = ({
  handleSearchMenu,
  sideEffect,
  images,
}: ISlideShowProps) => {
  const [isShowSlider, setIsShowSlider] = useState<boolean>(false);

  const openModal = () => {
    handleSearchMenu();
    setIsShowSlider(true);
  };

  return (
    <>
      <button
        type="button"
        disabled={sideEffect}
        onClick={openModal}
        className={`max-w-[130px] w-full rounded-[4px] absolute ${
          sideEffect ? "bg-[#bfbfbf]" : "bg-white"
        } right-4 bottom-4`}
      >
        <div className="flex justify-center items-center p-2">
          <span className="mr-2.5">
            <PhotographIcon className="w-3 h-3 text-gray-400" />
          </span>
          <span className="text-xs font-body font-medium text-gray-700">
            Show all photos
          </span>
        </div>
      </button>
      <Modal active={isShowSlider} setActive={setIsShowSlider}>
        <SliderApartmentPhotos setActive={setIsShowSlider} images={images} />
      </Modal>
    </>
  );
};

export default SlideShow;
