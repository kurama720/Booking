import React, { useState, FC } from "react";
import { useParams } from "react-router-dom";
import ObjectPageCard from "../../components/ObjectPageCard";
import { BookingState } from "../HomePage/utils/HomePageInterface";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import SignUpPage from "../SignUpPage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import BookingHistory from "../../components/BookingHistory";
import {
  IApartment,
  IBookingReverseData,
} from "../../models/globalInterfaces/globalIntefaces";
import DisplayFavouriteApartments from "../../components/DisplayFavouriteApartments";
import ResetPasswordForm from "../../components/ResetPasswordForm";

interface IPropsObjectPage {
  setApartments: React.Dispatch<React.SetStateAction<IApartment[]>>;
  userBookingDate: BookingState;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
  bookingReverseData: IBookingReverseData;
  setBookingReverseData: React.Dispatch<
    React.SetStateAction<IBookingReverseData>
  >;
}

const ObjectPage: FC<IPropsObjectPage> = ({
  setApartments,
  userBookingDate,
  setUserBookingDate,
  bookingReverseData,
  setBookingReverseData,
}) => {
  const [isActiveFavouriteApartmentList, setActiveFavouriteApartmentList] =
    useState<boolean>(false);
  const [guest, setGuest] = useState("Add guests");
  const [sideEffect, setSideEffect] = useState<boolean>(false);
  const [isAddGuest, setIsAddGuest] = useState<boolean>(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [isActiveSearchMenu, setActiveSearchMenu] = useState<boolean>(false);
  const [isActiveBookingHistory, setActiveBookingHistory] =
    useState<boolean>(false);
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false);
  const [activeLocationBox, isActiveLocationBox] = useState<boolean>(false);
  const [resetPasswordPopUpStatus, setResetPasswordPopUpStatus] =
    useState<boolean>(false);
  const [activeLogout, isActiveLogout] = useState<boolean>(false);
  const [calendarPopUpStatus, setCalendarPopUpStatus] =
    useState<boolean>(false);

  const { id } = useParams();

  const handleFavouriteApartmentsList = () =>
    setActiveFavouriteApartmentList((prev) => !prev);

  const handleLogInPopUp = () => setPopUpStatus((prev) => !prev);

  const handleSignUpPopUpStatus = () => setSignUpPopUpStatus((prev) => !prev);

  const handleResetPasswordPopUpStatus = () => {
    setResetPasswordPopUpStatus((prev) => !prev);
  };

  const handleLogoutPopUpStatus = () => isActiveLogout((prev) => !prev);

  const handleCalendarPopUpStatus = () =>
    setCalendarPopUpStatus((prev) => !prev);

  const handleSearchMenu = () => {
    setActiveSearchMenu((prev) => !prev);
    setSideEffect((prev) => !prev);
  };

  const handleBookingHistory = () => setActiveBookingHistory((prev) => !prev);

  return (
    <div className="bg-gray-50">
      <div className="w-full px-16 bg-gray-50 shadow-[0_12px_25px_-5px_rgba(0,0,0,0.1)]">
        {isActiveSearchMenu ? (
          <Header
            handleLogInPopUp={handleLogInPopUp}
            activeLocationBox={activeLocationBox}
            handleBookingHistory={handleBookingHistory}
            isActiveLocationBox={isActiveLocationBox}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleLogoutPopUpStatus={handleLogoutPopUpStatus}
            calendarPopUpStatus={calendarPopUpStatus}
            handleCalendarPopUpStatus={handleCalendarPopUpStatus}
            setCalendarPopUpStatus={setCalendarPopUpStatus}
            setUserBookingDate={setUserBookingDate}
            userBookingDate={userBookingDate}
            handleSearchMenu={handleSearchMenu}
            isActiveSearchMenu={isActiveSearchMenu}
            isActiveModel={isActiveModel}
            activeModel={activeModel}
            numberOfGuests={numberOfGuests}
            setNumberOfGuests={setNumberOfGuests}
            guest={guest}
            setGuest={setGuest}
            isAddGuest={isAddGuest}
            setIsAddGuest={setIsAddGuest}
            handleFavouriteApartmentsList={handleFavouriteApartmentsList}
            setApartments={setApartments}
          />
        ) : (
          <Header
            handleLogInPopUp={handleLogInPopUp}
            activeLocationBox={activeLocationBox}
            handleBookingHistory={handleBookingHistory}
            isActiveLocationBox={isActiveLocationBox}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleLogoutPopUpStatus={handleLogoutPopUpStatus}
            calendarPopUpStatus={calendarPopUpStatus}
            handleCalendarPopUpStatus={handleCalendarPopUpStatus}
            setCalendarPopUpStatus={setCalendarPopUpStatus}
            setUserBookingDate={setUserBookingDate}
            userBookingDate={userBookingDate}
            handleSearchMenu={handleSearchMenu}
            isActiveSearchMenu={isActiveSearchMenu}
            isActiveModel={isActiveModel}
            activeModel={activeModel}
            numberOfGuests={numberOfGuests}
            setNumberOfGuests={setNumberOfGuests}
            guest={guest}
            setGuest={setGuest}
            isAddGuest={isAddGuest}
            setIsAddGuest={setIsAddGuest}
            handleFavouriteApartmentsList={handleFavouriteApartmentsList}
            setApartments={setApartments}
          />
        )}
      </div>
      <ObjectPageCard
        id={id}
        isActiveSearchMenu={isActiveSearchMenu}
        setActiveSearchMenu={setActiveSearchMenu}
        setCalendarPopUpStatus={setCalendarPopUpStatus}
        isActiveLocationBox={isActiveLocationBox}
        isActiveModel={isActiveModel}
        setSideEffect={setSideEffect}
        sideEffect={sideEffect}
        bookingReverseData={bookingReverseData}
        setBookingReverseData={setBookingReverseData}
        handleSearchMenu={handleSearchMenu}
      />
      {popUpStatus && (
        <Modal active={popUpStatus} setActive={handleLogInPopUp}>
          <UserLogInPage
            popUpStatus={popUpStatus}
            handleLogInPopUp={handleLogInPopUp}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleResetPasswordPopUpStatus={handleResetPasswordPopUpStatus}
          />
        </Modal>
      )}
      {signUpPopUpStatus && (
        <Modal active={signUpPopUpStatus} setActive={handleSignUpPopUpStatus}>
          <SignUpPage
            active={signUpPopUpStatus}
            setActive={handleSignUpPopUpStatus}
            handleLogInPopUp={handleLogInPopUp}
          />
        </Modal>
      )}
      {activeLogout && (
        <Modal active={activeLogout} setActive={handleLogoutPopUpStatus}>
          <LogoutButton
            handleLogoutPopUpStatus={handleLogoutPopUpStatus}
            activeLogout={activeLogout}
          />
        </Modal>
      )}
      {isActiveBookingHistory && (
        <Modal active={isActiveBookingHistory} setActive={handleBookingHistory}>
          <BookingHistory handleBookingHistory={handleBookingHistory} />
        </Modal>
      )}
      {isActiveFavouriteApartmentList && (
        <Modal
          active={isActiveFavouriteApartmentList}
          setActive={handleFavouriteApartmentsList}
        >
          <DisplayFavouriteApartments
            handleFavouriteApartmentsList={handleFavouriteApartmentsList}
          />
        </Modal>
      )}
      {resetPasswordPopUpStatus && (
        <Modal
          active={resetPasswordPopUpStatus}
          setActive={handleResetPasswordPopUpStatus}
        >
          <ResetPasswordForm
            setActive={handleResetPasswordPopUpStatus}
            handleSignUpPopUp={handleSignUpPopUpStatus}
          />
        </Modal>
      )}
    </div>
  );
};

export default ObjectPage;
