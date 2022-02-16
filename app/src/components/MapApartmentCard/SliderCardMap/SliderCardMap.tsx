import React, { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { IPropsSliderCardMap } from "./IPropsCardMap";
import "@splidejs/splide/dist/css/splide.min.css";
import "./slider.css";

const SliderCardMap: FC<IPropsSliderCardMap> = ({ listPictures }) => {
  return (
    <>
      <Splide
        options={{
          arrows: false,
          height: 144,
          width: 240,
        }}
      >
        {listPictures.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SplideSlide key={index}>
            <img
              src={item}
              alt={`object ${index}`}
              className="w-full min-h-full max-w-[240px] max-h-[144px]"
            />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default SliderCardMap;
