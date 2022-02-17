import React from "react";
import SlideShow from "../../SlideShow/SlideShow";
import { IObjectsPageCardPhotosProps } from "./IObjectsPageCardPhotosProps";
import { isEven, isLastIndex } from "../utils/helpers";

const ObjectsPageCardPhotos = ({
  handleSearchMenu,
  sideEffect,
  images,
}: IObjectsPageCardPhotosProps) => {
  if (!images?.length) return null;
  return (
    <div
      className={`w-full grid grid-rows-${
        images.length ? "2" : "1"
      } grid-flow-col gap-2 relative overflow-hidden rounded-md`}
    >
      {images.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`${
            isLastIndex(images.length, index) && !isEven(index)
              ? "row-span-2"
              : ""
          }${!index ? "row-span-2" : ""}`}
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
