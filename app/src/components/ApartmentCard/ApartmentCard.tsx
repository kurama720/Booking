import React, {FC, useState} from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {HeartIcon} from "@heroicons/react/outline";
import {StarIcon, HeartIcon as SolidHeartIcon} from "@heroicons/react/solid"
import '@splidejs/splide/dist/css/splide.min.css';
import img from '../../assets/img/image1.svg'
import './react-splide.css'

const ApartmentCard: FC = () => {
    const [isLike, setIsLike] = useState<boolean>(false)
    const pictureList: Array<string> = [img,img,img,img,img]

    const handleIsLike = () => {
        setIsLike(prev => !prev)
    }

    return (
        <div className='max-w-screen-sm p-4'>
            <div className='flex'>
                <Splide
                    options={{
                        arrows: false,
                        height: 144,
                        width: 240
                    }}
                >
                    {pictureList.map((item, index) =>
                        <SplideSlide key={index}>
                            <img src={item} alt={`image ${index}`} className='rounded'/>
                        </SplideSlide>
                    )}
                </Splide>
                <div className='w-full pl-3 flex justify-between flex-col'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h4 className='text-xl font-body text-gray-900'>Apartment name</h4>
                            <button className='' onClick={handleIsLike}>{isLike ?
                                <SolidHeartIcon className='w-5 h-5 text-red-500'/> :
                                <HeartIcon className='w-5 h-5'/>}</button>
                        </div>
                        <div className='flex justify-start'>
                            <span className='text-xs font-body text-gray-500'>2 guests</span>
                            <span className='inline-block mt-2 mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full'/>
                            <span className='text-xs font-body text-gray-500'>2 beds</span>
                        </div>
                    </div>
                    <div className='flex justify-between items-end'>
                        <div className='flex items-center'>
                            <span>
                                <StarIcon className='w-4 h-4 text-blue-600'/>
                            </span>
                            <span className='text-xs font-body text-gray-900'>4,3</span>
                            <span className='text-xs font-body text-gray-500'>(15 reviews)</span>
                        </div>
                        <div className='flex flex-col'>
                            <div>
                                <span className='text-xs font-body text-gray-900 font-medium'>$93</span>
                                <span className='text-xs font-body text-gray-500 mx-0.5'>/</span>
                                <span className='text-xs font-body text-gray-500'>night</span>
                            </div>
                            <div>
                                <span className='text-xs font-body text-gray-500'>Total $280</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-px bg-gray-200 mt-2'/>
        </div>
    );
};

export default ApartmentCard;
