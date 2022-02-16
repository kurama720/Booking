import React from "react";
import SlideShow from "../../SlideShow/SlideShow";
import { IObjectsPageCardPhotosProps } from "./IObjectsPageCardPhotosProps";
import { isEven } from "../utils/helpers";

const ObjectsPageCardPhotos = ({
  handleSearchMenu,
  sideEffect,
  images,
}: IObjectsPageCardPhotosProps) => {
  if (!images?.length) return null;
  return (
    <div className="w-full grid grid-rows-2 grid-flow-col gap-2 relative overflow-hidden rounded-md">
      {images.map((item, index) => (
        <div
          className={`${!index && "col-span-2"} ${
            isEven(images.length) && images.length - 1 === index && "col-span-2"
          }`}
        >
          <img
            className="object-cover h-full w-full"
            src={item}
            alt="Apartament"
          />
        </div>
      ))}
      {images && (
        <SlideShow
          handleSearchMenu={handleSearchMenu}
          sideEffect={sideEffect}
          images={images}
        />
      )}
    </div>
  );
};

export default ObjectsPageCardPhotos;
