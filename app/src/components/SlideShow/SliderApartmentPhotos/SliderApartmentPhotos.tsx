import React, {FC} from 'react';
import {XIcon} from "@heroicons/react/solid";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import img from "../../../assets/img/image.png";
import '@splidejs/splide/dist/css/splide.min.css';


interface IPropsSliderApartmentPhotos {
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SliderApartmentPhotos: FC<IPropsSliderApartmentPhotos> = ({setActive}) => {

    const closeModal = () => {
        setActive(false)
    }

    return (
        <div className='bg-white rounded-md max-w-[870px] w-full px-2.5 py-2' onClick={e => e.stopPropagation()}>
            <div className='flex justify-between items-center'>
                <span>Apartment photos</span>
                <button onClick={closeModal}><XIcon className='text-gray-500 w-6 h-6 hover:text-gray-700'/></button>
            </div>
            <div className='flex justify-center items-center'>
                <Splide
                    options={{
                        arrows: false,
                        height: 581,
                        width: 800
                    }}
                >
                    <SplideSlide>
                        <img src={img} alt='' className='rounded'/>
                    </SplideSlide>
                    <SplideSlide>
                        <img src={img} alt='' className='rounded'/>
                    </SplideSlide>
                    <SplideSlide>
                        <img src={img} alt='' className='rounded'/>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
};

export default SliderApartmentPhotos;