import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import UserAvatar from "../../assets/img/AvatarUserProfile.png";
import LinkBack from "../LinkBack";
import UserProfileInputItem from "./UserProfileInputItem";
import { JWT } from "../UserLogInForm/utils/interfaces/interfaces";
import { IUserProfile } from "./IUserProfile";

const UserProfile = ({ handleChangePasswordMenu }: IUserProfile) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const getUserInfo = useCallback(async () => {
    const storageName = "userData" as LocalKey<JWT>;
    const userData = LocalStorage.getItem(storageName);
    // The userData may be null therefore I use if condition
    if (userData) {
      const payload = userData.token.data.access;
      const userEmail = JSON.parse(userData.token.config.data);
      axios.defaults.headers.common.Authorization = `Bearer ${payload}`;

      const userInfo = await axios.get(
        `${process.env.REACT_APP_API_URL}accounts/info/`
      );
      // The userInfo may be null therefore I use if condition
      if (userInfo) {
        const data = JSON.parse(JSON.stringify(userInfo.data));
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(userEmail.email);
        setLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleSubmit = () => {};

  return (
    <div className="w-[62rem] shadow rounded-md py-4">
      <div className="w-full">
        <LinkBack text="User Profile Info" />
        <div className="w-full h-2/5">
          <div className="pl-20 w-full pt-6 flex">
            <div>
              <img
                className="h-40 w-40 rounded-full cursor-pointer hover:bg-gray-400"
                src={UserAvatar}
                alt="User Avatar"
              />
            </div>
            <div className="w-[74%]">
              <div className="flex ml-2 justify-between">
                <UserProfileInputItem
                  value={firstName}
                  handler={setFirstName}
                  isLoaded={isLoaded}
                />
                <UserProfileInputItem
                  value={lastName}
                  handler={setLastName}
                  isLoaded={isLoaded}
                />
              </div>
              <div className="w-[99%] h-px bg-gray-200 mt-1 ml-2" />
              <div className="ml-4 mt-1">
                <p>
                  Email:<span className="ml-2 font-body">{email}</span>
                </p>
                <div className="flex">
                  <p>Password:</p>
                  <button
                    onClick={handleChangePasswordMenu}
                    type="button"
                    className="ml-2 font-body underline decoration-solid hover:text-blue-800 underline"
                  >
                    Click here to change
                  </button>
                </div>
              </div>
              <div className="flex items-end justify-end w-full h-20">
                <button
                  onSubmit={handleSubmit}
                  type="button"
                  className="font-body bg-blue-600 py-2 px-6 w-20 h-10 rounded-xl text-white hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
