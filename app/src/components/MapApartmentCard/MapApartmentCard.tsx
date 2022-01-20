import React, {useState} from 'react';
import img from "../../assets/img/image 2.png";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {HeartIcon as SolidHeartIcon, StarIcon} from "@heroicons/react/solid";
import {HeartIcon} from "@heroicons/react/outline";
import '@splidejs/splide/dist/css/splide.min.css';

const MapApartmentCard = () => {
    const [isLikeCard, setIsLikeCard] = useState<boolean>(false)
    const mokListPicture = [img,img,img,img,img]
    return (
        <div className='m-20 rounded flex flex-col w-full h-full max-w-[15rem] max-h-[17.5rem] shadow'>
            <div>
                <Splide
                    options={{
                        arrows: false,
                        height: 144,
                        width: 240
                    }}
                >
                    {mokListPicture.map((item, index) =>
                        <SplideSlide key={index}>
                            <img src={item} alt={`image ${index}`} className='w-full min-h-full max-w-[240px] max-h-[144px] rounded-t-md'/>
                        </SplideSlide>
                    )}
                </Splide>
            </div>
            <div className='flex flex-col justify-center items-start'>
                <div className='flex items-center'>
                    <span className=''><StarIcon className='h-4 w-4 text-blue-700'/></span>
                    <span className='text-xs font-body text-gray-900'>4,3</span>
                    <span className='text-xs font-body text-gray-500'>(15)</span>
                </div>
                <div className='flex flex-col items-start'>
                    <span className='text-base font-body text-gray-900'>Large flat near center</span>
                    <span className='text-xs font-body text-gray-500'>Private room in Minsk</span>
                </div>
                <div className='flex items-center justify-start'>
                    <span className='font-medium font-body text-sm text-gray-900'>$34</span>
                    <span className='text-sm font-body text-gray-500 mx-0.5'>/</span>
                    <span className='text-sm font-body text-gray-500'>night</span>
                </div>
            </div>
        </div>
    )
};

export default MapApartmentCard;