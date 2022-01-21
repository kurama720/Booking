import React, {FC} from 'react';
import {IPropsSliderCardMap} from "./IPropsCardMap";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import img from "../../../assets/img/image 2.png"
import '@splidejs/splide/dist/css/splide.min.css';
import './slider.css';

const SliderCardMap: FC<IPropsSliderCardMap> = ({listPictures}) => {
    return (
        <>
            <Splide
                options={{
                    arrows: false,
                    height: 144,
                    width: 240
                }}
            >
                {listPictures.map((item, index) =>
                    <SplideSlide key={index}>
                        <img src={item} alt={`image ${index}`} className='w-full min-h-full max-w-[240px] max-h-[144px] rounded-t-md'/>
                    </SplideSlide>
                )}
            </Splide>
        </>
    );
};

export default SliderCardMap;
