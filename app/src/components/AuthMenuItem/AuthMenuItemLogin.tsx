import React from 'react';
import {AuthMenuItemLoginProps} from "./utils/AuthMenuItemLoginInterface";

const AuthMenuItemLogin = ({handleLogoutPopUpStatus}: AuthMenuItemLoginProps) => {
  return (
      <div
          className='w-56 h-60 shadow-md rounded-md absolute  top-12 flex flex-col 1.5xl:left-[43.3%] lg:left-[11.2%] 3xl:left-[82%] 4xl:left-[85%] 5xl:left-[89%] xlg:left-[77.5%] mlg:left-[76.2%] 3.5xl:left-[83%] 1xl:left-[80%] 3.75xl:left-[85%] 6xl:left-[90%]'>
        <button className='font-body font-medium text-sm text-gray-700 w-full mt-[0.75rem] ml-[0.8125rem] flex'>
          Messages
        </button>
        <button className='w-full mt-4 ml-[0.8125rem]  font-body font-medium text-sm text-gray-700 flex'>
          Trips
        </button>
        <button
            className='font-body font-medium text-sm text-gray-700 w-full mb-[0.6875rem] mt-4 ml-[0.8125rem] flex'>
          Wishlist
        </button>
        <hr/>
        <button className='font-body text-sm leading-5 w-full mt-[0.75rem] mb-[0.75rem] ml-[0.8125rem] flex'>
          Account
        </button>
        <hr/>
        <button className='w-full mt-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex'>
          Help
        </button>
        <button
            onClick={handleLogoutPopUpStatus}
            className='w-full mt-4 mb-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex'
        >
          Log out
        </button>
      </div>
  );
};

export default AuthMenuItemLogin;
