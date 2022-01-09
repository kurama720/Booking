import {Route, Routes} from "react-router-dom";
import React from "react";
import UserLogInPage from "../pages/UserLogInPage/UserLoginPage";
import {Paths} from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import SignUpPage from "../pages/SignUpPage";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
        <Routes>
          <Route path={Paths.HOME} element={<HomePage/>}/>
          <Route path={Paths.LOG_IN} element={<UserLogInPage/>}/>
        </Routes>
    );
  }
  return (
      <Routes>
        <Route path={Paths.LOG_IN} element={<UserLogInPage/>}/>
        <Route path={Paths.LOG_OUT} element={<LogoutButton/>}/>
        <Route path={Paths.SIGN_UP} element={<SignUpPage/>}/>
      </Routes>
  );
};
