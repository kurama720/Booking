import React, { useContext } from "react";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { XIcon } from "@heroicons/react/solid";
import { JWT } from "../../hooks/auth.hook.interface";
import { AuthContext } from "../../context/Context";
import Button from "../Button/Button";
import { LogoutButtonProps } from "./utils/LogoutButtonInterface";

const storageName = "userData" as LocalKey<JWT>;

function LogoutButton({
  activeLogout,
  handleLogoutPopUpStatus,
}: LogoutButtonProps) {
  const { logout } = useContext(AuthContext);
  const userData = LocalStorage.getItem(storageName);

  const handleLogout = async () => {
    if (userData) {
      const payload = userData.token.data.access;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      };

      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}accounts/logout/`,
        {
          text: "logout",
        },
        config
      );

      if (data.data.logout === "access") {
        logout();
        handleLogoutPopUpStatus();
      }
    }
  };

  return !activeLogout ? (
    <></>
  ) : (
    <div
      className="h-full flex justify-center items-center "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[22rem] h-[14.375rem] rounded-lg shadow px-10 bg-white">
        <div className="flex justify-between w-full items-center mt-8">
          <h2 className=" text-2xl  text-gray-600 font-bold font-body">
            Log Out
          </h2>
          <Button
            classNames="rounded-3xl flex items-center h-9"
            type="button"
            context={
              <XIcon className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500" />
            }
            onClick={handleLogoutPopUpStatus}
          />
        </div>
        <div>
          <p className="mt-6 font-body text-gray-700 font-normal text-base">
            Are you sure you want to sign out from your account?
          </p>
        </div>
        <div className="w-full mt-6">
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-body leading-5 text-sm font-medium py-[0.5625rem] shadow-sm rounded-md"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
