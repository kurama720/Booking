import React from 'react';
import {
    GlobeAltIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/solid";
import {BsFacebook} from 'react-icons/bs'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FaInstagram} from 'react-icons/fa'


const Footer = () => {
    return (
        <footer className='w-full bg-gray-50'>
            <div className="w-full max-w-screen-xl my-0 mx-auto">
                <div className='h-px bg-gray-300 mt-2'/>
                <div className='flex items-center justify-between py-8'>
                    <div className='flex justify-center items-center'>
                        <span className='text-xs text-gray-700 font-body'>© 2022 Nodic, Inc.</span>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex items-center'>
                            <div className='flex items-center mr-12'><GlobeAltIcon
                                className='w-4 h-4 text-gray-700'/><span
                                className='font-body text-xs text-gray-700 ml-0.5'>English (UK)</span></div>
                            <div className='flex items-center '><CurrencyDollarIcon
                                className='w-4 h-4 text-gray-700'/><span
                                className='text-xs font-body text-gray-700 ml-0.5'>USD</span></div>
                        </div>
                        <div className='flex items-center ml-20'>
                            <span className='mr-2'><a href="https://www.google.by/"><BsFacebook
                                className='text-gray-700'/></a></span>
                            <span className='mr-2'><a href="#"><AiOutlineTwitter className='text-gray-700'/></a></span>
                            <span className=''><a href="#"><FaInstagram className='text-gray-700'/></a></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;