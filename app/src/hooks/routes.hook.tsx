import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapSearchPage from "../pages/MapSearchPage";
import ObjectPage from "../pages/ObjectPage";

export const useRoutes = (isAuth: boolean) => {
  const [apartments, setApartments] = useState<Array<any>>([]);
  if (isAuth) {
    return (
      <Routes>
        <Route
          path={Paths.HOME}
          element={<HomePage setApartments={setApartments} />}
        />
        <Route path={Paths.MAP} element={<MapSearchPage />} />
        <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route
        path={Paths.HOME}
        element={<HomePage setApartments={setApartments} />}
      />
      <Route path={Paths.MAP} element={<MapSearchPage />} />
      <Route path={`${Paths.OBJECT_PAGE}/:id`} element={<ObjectPage />} />
    </Routes>
  );
};
