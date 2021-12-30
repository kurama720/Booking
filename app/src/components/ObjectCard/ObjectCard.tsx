import React from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import picture from '../../assets/image 2.png'
import {
    HeartIcon,
} from "@heroicons/react/outline";
import {StarIcon} from "@heroicons/react/solid"

const ObjectCard = () => {
    const mokArrayPicture = [picture, picture, picture, picture, picture, picture, picture]

    return (
        <div className='bg-gray-100 max-w-screen-sm'>
            <div className='flex'>
                <Splide
                    options={{
                        arrows: false,
                        height: 144,
                        width: 240
                    }}
                >
                    {mokArrayPicture.map(item => <SplideSlide>
                        <img src={item} alt="Image 1"/>
                    </SplideSlide>)}
                </Splide>

                <div className='w-full pl-2 flex justify-between flex-col'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h4 className='text-xl font-body text-gray-900'>Apartment name</h4>
                            <button className=''><HeartIcon className='w-5 h-5'/></button>
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
                            <span>4,3</span>
                            <span>(15 reviews)</span>
                        </div>
                        <div className='flex flex-col'>
                            <div>
                                <span>$93</span>
                                <span>/</span>
                                <span>night</span>
                            </div>
                            <div>
                                <span>Total $280</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ObjectCard;