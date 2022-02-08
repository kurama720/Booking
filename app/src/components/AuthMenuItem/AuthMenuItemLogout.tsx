import React from "react";
import { AuthMenuItemLogoutProps } from "./utils/AuthMenuItemLogoutInterface";

function AuthMenuItemLogout({
  handleSignUpPopUpStatus,
  handleLogInPopUp,
}: AuthMenuItemLogoutProps) {
  return (
    <div className="w-56 h-[7.75rem] z-10 shadow-md rounded-md absolute top-[60px] flex flex-col bg-white rounded-md 1.5xl:left-[84.3%] lg:left-[11.2%] 3xl:left-[85%] 4xl:left-[87.6%] 5xl:left-[91%] xlg:left-[80.6%] mlg:left-[76.2%] 3.5xl:left-[85.6%] 1xl:left-[83%] 3.75xl:left-[87.4%] 6xl:left-[92%]">
      <button
        type="button"
        className="font-body font-medium text-sm text-gray-700 w-full mt-[0.75rem] ml-[0.8125rem] flex"
        onClick={handleSignUpPopUpStatus}
      >
        Sign up
      </button>
      <button
        type="button"
        onClick={handleLogInPopUp}
        className="w-full mt-4  mb-[0.6875rem] ml-[0.8125rem] font-body text-sm leading-5 flex"
      >
        Log In
      </button>
      <hr />
      <button
        type="button"
        className="w-full mt-[0.75rem] mb-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex"
      >
        Help
      </button>
    </div>
  );
}

export default AuthMenuItemLogout;
