import React, {useContext} from 'react';
import axios from 'axios'
import {Paths} from "../../paths/path";
import {LocalKey, LocalStorage} from "ts-localstorage";
import {JWT} from "../../hooks/auth.hook.interface";
import {AuthContext} from "../../context/Context";
import {useNavigate} from "react-router-dom";

const storageName = "userData" as LocalKey<JWT>;

const LogoutButton = () => {
  const {logout, token} = useContext(AuthContext);
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

  return (
      <button
          onClick={handleLogout}
          className='w-full mt-4 mb-[0.75rem] ml-[0.8125rem] font-body text-sm leading-5 flex'
      >
        Log out
      </button>
  );
};

export default LogoutButton;
