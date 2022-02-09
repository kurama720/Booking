import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapSearchPage from "../pages/MapSearchPage";
import ObjectPage from "../pages/ObjectPage";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import { IApartment } from "../models/globalInterfaces/globalIntefaces";
import ConfirmPage from "../pages/ConfirmPage";

export const useRoutes = (isAuth: boolean) => {
  const [apartments, setApartments] = useState<Array<IApartment>>([]);
  const [userBookingDate, setUserBookingDate] = useState<BookingState>({
    lat: 0,
    lon: 0,
    numOfPersons: 0,
    checkInDate: "",
    checkOutDate: "",
    city: "",
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
          element={
            <MapSearchPage
              apartments={apartments}
              userBookingDate={userBookingDate}
              setApartments={setApartments}
              setUserBookingDate={setUserBookingDate}
            />
          }
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
        <Route path={`${Paths.CONFIRM}`} element={<ConfirmPage />} />
        <Route path="*" element={<Navigate to="/" />} />
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
        element={
          <MapSearchPage
            apartments={apartments}
            userBookingDate={userBookingDate}
            setUserBookingDate={setUserBookingDate}
            setApartments={setApartments}
          />
        }
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
