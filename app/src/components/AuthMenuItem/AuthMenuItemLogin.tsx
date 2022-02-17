import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthMenuItemLoginProps } from "./utils/AuthMenuItemLoginInterface";
import { Paths } from "../../paths/path";

function AuthMenuItemLogin({
  handleLogoutPopUpStatus,
  handleBookingHistory,
  handleFavouriteApartmentsList,
}: AuthMenuItemLoginProps) {
  const history = useNavigate();
  const handleProfileLink = () => history(Paths.USER_PROFILE);
  return (
    <div className="w-56 h-60 shadow-md  z-10 rounded-md absolute bg-white rounded-md top-[60px] flex flex-col 1.5xl:left-[84.3%] lg:left-[11.2%] 3xl:left-[85%] 4xl:left-[87.6%] 5xl:left-[91%] xlg:left-[80.6%] mlg:left-[76.2%] 3.5xl:left-[85.6%] 1xl:left-[83%] 3.75xl:left-[87.4%] 6xl:left-[92%]">
      <button
        type="button"
        className="font-body font-medium text-sm text-gray-700 w-full mt-[0.75rem] ml-[0.8125rem] flex"
      >
        Messages
      </button>
      <button
        onClick={handleBookingHistory}
        type="button"
        className="w-full mt-4 ml-[0.8125rem]  font-body font-medium text-sm text-gray-700 flex"
      >
        Trips
      </button>
      <button
        onClick={handleFavouriteApartmentsList}
        type="button"
        className="font-body font-medium text-sm text-gray-700 w-full mb-[0.6875rem] mt-4 ml-[0.8125rem] flex"
      >
        Wishlist
      </button>
      <hr />
      <button
        onClick={handleProfileLink}
        type="button"
        className="font-body text-sm leading-5 w-full mt-[0.75rem] mb-[0.75rem] ml-[0.8125rem] flex"
      >
        Account
      </button>
      <hr />
      <button
        type="button"
        className="w-full mt-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex"
      >
        Help
      </button>
      <button
        type="button"
        onClick={handleLogoutPopUpStatus}
        className="w-full mt-4 mb-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex"
      >
        Log out
      </button>
    </div>
  );
}

export default AuthMenuItemLogin;
