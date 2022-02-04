import { Route, Routes } from "react-router-dom";
import React from "react";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapSearchPage from "../pages/MapSearchPage";
import ObjectPage from "../pages/ObjectPage";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path={Paths.HOME} element={<HomePage />} />
        <Route path={Paths.MAP} element={<MapSearchPage />} />
        <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path={Paths.HOME} element={<HomePage />} />
      <Route path={Paths.MAP} element={<MapSearchPage />} />
      <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectPage />} />
    </Routes>
  );
};
