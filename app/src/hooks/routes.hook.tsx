import { Route, Routes } from "react-router-dom";
import React from "react";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path={Paths.HOME} element={<HomePage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path={Paths.HOME} element={<HomePage />} />
    </Routes>
  );
};
