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
              className="w-full h-full w-[240px] h-[144px] object-cover rounded-md"
            />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default SliderCardMap;
