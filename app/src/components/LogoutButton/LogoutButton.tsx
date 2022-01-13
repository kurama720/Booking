import React, {useContext, useState} from 'react';
import axios from 'axios'
import {Paths} from "../../paths/path";
import {LocalKey, LocalStorage} from "ts-localstorage";
import {JWT} from "../../hooks/auth.hook.interface";
import {AuthContext} from "../../context/Context";
import {useNavigate} from "react-router-dom";
import Button from "../Button/Button";
import {XIcon} from "@heroicons/react/solid";

const storageName = "userData" as LocalKey<JWT>;

const LogoutButton = () => {
  const {logout, token} = useContext(AuthContext);
  const [visible, isVisible] = useState<boolean>(false)
  const userData: any = LocalStorage.getItem(storageName)

  let history = useNavigate()

  const handleLogout = async () => {
    try {
      if (!!userData) {
        const payload = userData.token.data.access

        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${payload}`,
          },
        };

        const data = await axios.post(`${process.env.REACT_APP_API_URL}accounts/logout/`, {
          text: 'logout'
        }, config)

        if (data.data.logout === 'access') {
          logout()
          history(Paths.LOG_IN)
        }
      }
    } catch (e) {
      console.error(e)
    }

  }

  const handleLogoutMenu = () => {
    isVisible(true)
  }

  return (
    !visible ? (
        <button
        onClick={handleLogoutMenu}
        className='w-full mt-4 mb-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex'
    >
      Log out
    </button>
    ) : (
        <div className='w-full flex justify-center'>
          <div className='w-[22rem] h-[14.375rem] mt-[12.75rem] rounded-lg shadow px-10'>
            <div className="flex justify-between w-full items-center mt-8">
              <h2 className=" text-2xl  text-gray-600 font-bold font-body">
                Log Out
              </h2>
              <Button
                  classNames="rounded-3xl flex items-center h-9"
                  type="button"
                  context={
                    <XIcon
                        className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500"/>
                  }
                  onClick={() => isVisible(false)}
              />
            </div>
            <div>
              <p className='mt-6 font-body text-gray-700 font-normal text-base'>
                Are you sure you want to sign out from your account?
              </p>
            </div>
            <div className='w-full mt-6'>
              <button
                  className='w-full bg-blue-600 text-white font-body leading-5 text-sm font-medium py-[0.5625rem] shadow-sm rounded-md'
                  onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
    )
  );
};

export default LogoutButton;
