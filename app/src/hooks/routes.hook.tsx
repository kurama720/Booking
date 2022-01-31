import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapPage from "../pages/MapPage";

export const useRoutes = (isAuth: boolean) => {
  const [apartments, setApartments] = useState<Array<any>>([]);
  if (isAuth) {
    return (
      <Routes>
        <Route
          path={Paths.HOME}
          element={<HomePage setApartments={setApartments} />}
        />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route
        path={Paths.HOME}
        element={<HomePage setApartments={setApartments} />}
      />
      <Route path={Paths.MAP} element={<MapPage />} />
    </Routes>
  );
};
