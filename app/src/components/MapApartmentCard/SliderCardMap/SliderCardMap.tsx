import React, { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { IPropsSliderCardMap } from "./IPropsCardMap";
import img from "../../../assets/img/image 2.png";
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
          <SplideSlide key={item.id}>
            <img
              src={item.img}
              alt={`object ${index}`}
              className="w-full min-h-full max-w-[240px] max-h-[144px] rounded-t-md"
            />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default SliderCardMap;
