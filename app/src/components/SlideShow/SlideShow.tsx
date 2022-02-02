import React, { FC, useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import Modal from "../Modal/Modal";
import SliderApartmentPhotos from "./SliderApartmentPhotos/SliderApartmentPhotos";

const SlideShow: FC = () => {
  const [isShowSlider, setIsShowSlider] = useState<boolean>(false);

  const openModal = () => {
    setIsShowSlider(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="max-w-[130px] w-full rounded-[2px] absolute bg-white top-[94%] 6xl:left-[88%] top-[96%] 5xl:left-[86%] top-[96%] 4xl:left-[82%] top-[92%] 3.75xl:left-[82%] top-[91%] 3.5xl:left-[80%] top-[91%] 3xl:left-[80%]  1.5xl:left-[80%] 1xl:left-[77%] top-[89%] xlg:left-[74%] mlg:left-[68%] top-[86%]"
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
        <SliderApartmentPhotos setActive={setIsShowSlider} />
      </Modal>
    </>
  );
};

export default SlideShow;
