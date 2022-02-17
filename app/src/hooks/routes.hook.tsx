import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "../paths/path";
import HomePage from "../pages/HomePage/HomePage";
import MapSearchPage from "../pages/MapSearchPage";
import ObjectPage from "../pages/ObjectPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UserProfilePage from "../pages/UserProfilePage";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import {
  IApartment,
  IBookingReverseData,
} from "../models/globalInterfaces/globalIntefaces";
import ConfirmPage from "../pages/ConfirmPage";

export const useRoutes = (isAuth: boolean) => {
  const [apartments, setApartments] = useState<Array<IApartment>>([]);
  const [bookingReverseData, setBookingReverseData] =
    useState<IBookingReverseData>({
      id: "",
      checkIn: "",
      checkOut: "",
      numberOfGuests: 1,
    });
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
              bookingReverseData={bookingReverseData}
              setBookingReverseData={setBookingReverseData}
            />
          }
        />
        <Route
          path={`${Paths.CONFIRM}`}
          element={<ConfirmPage bookingReverseData={bookingReverseData} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path={Paths.USER_PROFILE} element={<UserProfilePage />} />
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
            bookingReverseData={bookingReverseData}
            setBookingReverseData={setBookingReverseData}
          />
        }
      />
      <Route
        path={`${Paths.RESET_PASSWORD}/:uid/:token`}
        element={<ResetPasswordPage />}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path={Paths.USER_PROFILE} element={<UserProfilePage />} />
    </Routes>
  );
};
