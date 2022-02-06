import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapSearchPage from "../pages/MapSearchPage";
import ObjectPage from "../pages/ObjectPage";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";

export const useRoutes = (isAuth: boolean) => {
  const [apartments, setApartments] = useState<Array<any>>([]);
  const [userBookingDate, setUserBookingDate] = useState<BookingState>({
    lat: 0,
    lon: 0,
    numOfPersons: 0,
    checkInDate: "",
    checkOutDate: "",
  });
  if (isAuth) {
    return (
      <Routes>
        <Route
          path={Paths.HOME}
          element={
            <HomePage
              setApartments={setApartments}
              userBookingDate={userBookingDate}
              setUserBookingDate={setUserBookingDate}
            />
          }
        />
        <Route
          path={Paths.MAP}
          element={<MapSearchPage apartments={apartments} />}
        />
        <Route
          path={`${Paths.OBJECT_PAGE}/:id`}
          element={
            <ObjectPage
              setApartments={setApartments}
              userBookingDate={userBookingDate}
              setUserBookingDate={setUserBookingDate}
            />
          }
        />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route
        path={Paths.HOME}
        element={
          <HomePage
            setApartments={setApartments}
            userBookingDate={userBookingDate}
            setUserBookingDate={setUserBookingDate}
          />
        }
      />
      <Route
        path={Paths.MAP}
        element={<MapSearchPage apartments={apartments} />}
      />
      <Route
        path={`${Paths.OBJECT_PAGE}/:id`}
        element={
          <ObjectPage
            setApartments={setApartments}
            userBookingDate={userBookingDate}
            setUserBookingDate={setUserBookingDate}
          />
        }
      />
    </Routes>
  );
};
