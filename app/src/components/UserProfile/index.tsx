import React, { useState, useEffect, useCallback } from "react";
import { Formik, FormikHelpers, Form, useFormikContext } from "formik";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import UserAvatar from "../../assets/img/AvatarUserProfile.png";
import LinkBack from "../LinkBack";
import UserProfileInputItem from "./UserProfileInputItem";
import { JWT, UserLogin } from "../UserLogInForm/utils/interfaces/interfaces";
import { IUserProfile } from "./IUserProfile";
import { validationSchema } from "./validationSchema";
import { IUserInfo } from "./IUserInfo";

const UserProfile = ({ handleChangePasswordMenu }: IUserProfile) => {
  const [email, setEmail] = useState<string>("");
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<IUserInfo>({
    firstName: "",
    lastName: "",
  });

  const getUserInfo = useCallback(async () => {
    const storageName = "userData" as LocalKey<JWT>;
    const userData = LocalStorage.getItem(storageName);
    // The userData may be null therefore I use if condition
    if (userData) {
      const payload = userData.token.data.access;
      axios.defaults.headers.common.Authorization = `Bearer ${payload}`;
      try {
        const userInfo = await axios.get(
          `${process.env.REACT_APP_API_URL}accounts/me/`
        );
        // The userInfo may be null therefore I use if condition
        if (userInfo) {
          const data = JSON.parse(JSON.stringify(userInfo.data));
          setEmail(userInfo.data.email);
          setLoaded(true);
          setInitialState({
            firstName: data.first_name,
            lastName: data.last_name,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleFormSubmit = useCallback(
    async (values: IUserInfo, actions: FormikHelpers<IUserInfo>) => {
      const storageName = "userData" as LocalKey<JWT>;
      const userData = LocalStorage.getItem(storageName);
      // The userData may be null therefore I use if condition
      if (userData) {
        const payload = userData.token.data.access;
        axios.defaults.headers.common.Authorization = `Bearer ${payload}`;
        try {
          const dataForSubmitting = {
            first_name: values.firstName,
            last_name: values.lastName,
          };

          const userInfo = await axios.post(
            `${process.env.REACT_APP_API_URL}accounts/me/`,
            dataForSubmitting
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    []
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      enableReinitialize
      initialValues={initialState}
      validateOnBlur
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty,
        values,
      }) => (
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
                <Form onSubmit={handleSubmit} className="w-[74%]">
                  <div className="flex ml-2 h-[55px] justify-between">
                    <UserProfileInputItem
                      name="firstName"
                      error={errors.firstName}
                      touched={touched.firstName}
                      value={values.firstName}
                      handler={handleChange}
                      isLoaded={isLoaded}
                      handleBlur={handleBlur}
                    />
                    <UserProfileInputItem
                      name="lastName"
                      value={values.lastName}
                      error={errors.lastName}
                      touched={touched.lastName}
                      handler={handleChange}
                      isLoaded={isLoaded}
                      handleBlur={handleBlur}
                    />
                  </div>
                  <div className="w-[99%] h-px bg-gray-200 ml-2" />
                  <div className="ml-4 mt-1">
                    <p>
                      Email:
                      <span className="ml-2 font-body">{email}</span>
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
                      type="submit"
                      disabled={!dirty || !isValid}
                      className={`font-body ${
                        !dirty || !isValid
                          ? "bg-gray-200 text-gray-500"
                          : "bg-blue-600 hover:bg-blue-800 text-white"
                      } py-2 px-6 w-20 h-10 rounded-xl leading-5 text-sm`}
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default UserProfile;
