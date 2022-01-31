import { Route, Routes } from "react-router-dom";
import React from "react";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapPage from "../pages/MapPage";
import ObjectsPage from "../components/ObjectPageCard";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path={Paths.HOME} element={<HomePage />} />
        <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectsPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path={Paths.HOME} element={<HomePage />} />
      <Route path={Paths.MAP} element={<MapPage />} />
      <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectsPage />} />
    </Routes>
  );
};
