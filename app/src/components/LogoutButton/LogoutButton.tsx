import React, {useContext} from 'react';
import axios from 'axios'
import {LocalKey, LocalStorage} from "ts-localstorage";
import {JWT} from "../../hooks/auth.hook.interface";
import {AuthContext} from "../../context/Context";

const storageName = "userData" as LocalKey<JWT>;

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const userData: any = LocalStorage.getItem(storageName)
  const payload = userData.token.data.access

  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${payload}`,
    },
  };
  const handleLogout = async () => {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}accounts/logout/`, {
      text: 'logout'
    }, config)

    if (data.data.logout === 'access') {
      logout()
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
