import React, { useState } from "react";
import Header from "../../components/Header/Header";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import SignUpPage from "../SignUpPage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Modal from "../../components/Modal/Modal";
import { IPropsHomePage } from "./utils/HomePageInterface";
import MainPageBody from "../../components/MainPageBody/MainPageBody";
import BookingHistory from "../../components/BookingHistory";
import Footer from "../../components/Footer/Footer";

function HomePage({
  setApartments,
  userBookingDate,
  setUserBookingDate,
}: IPropsHomePage) {
  const [guest, setGuest] = useState("Add guests");
  const [isAddGuest, setIsAddGuest] = useState<boolean>(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false);
  const [activeLocationBox, isActiveLocationBox] = useState<boolean>(false);
  const [isActiveBookingHistory, setActiveBookingHistory] =
    useState<boolean>(false);
  const [activeLogout, isActiveLogout] = useState<boolean>(false);
  const [calendarPopUpStatus, setCalendarPopUpStatus] =
    useState<boolean>(false);

  const handleLogInPopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleSignUpPopUpStatus = () => {
    setSignUpPopUpStatus((prev) => !prev);
  };

  const handleLogoutPopUpStatus = () => {
    isActiveLogout((prev) => !prev);
  };

  const handleCalendarPopUpStatus = () => {
    setCalendarPopUpStatus((prev) => !prev);
  };

  const handleBookingHistory = () => {
    setActiveBookingHistory((prev) => !prev);
  };

  return (
    <>
      <div className="w-full bg-gray-50">
        <div className="w-full h-screen px-16 bg-gray-50">
          <Header
            handleLogInPopUp={handleLogInPopUp}
            activeLocationBox={activeLocationBox}
            isActiveLocationBox={isActiveLocationBox}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleLogoutPopUpStatus={handleLogoutPopUpStatus}
            calendarPopUpStatus={calendarPopUpStatus}
            handleCalendarPopUpStatus={handleCalendarPopUpStatus}
            setCalendarPopUpStatus={setCalendarPopUpStatus}
            setUserBookingDate={setUserBookingDate}
            userBookingDate={userBookingDate}
            setApartments={setApartments}
            handleBookingHistory={handleBookingHistory}
            isActiveSearchMenu
            isActiveModel={isActiveModel}
            activeModel={activeModel}
            numberOfGuests={numberOfGuests}
            setNumberOfGuests={setNumberOfGuests}
            guest={guest}
            setGuest={setGuest}
            isAddGuest={isAddGuest}
            setIsAddGuest={setIsAddGuest}
          />
          <MainPageBody />
          {popUpStatus && (
            <Modal active={popUpStatus} setActive={handleLogInPopUp}>
              <UserLogInPage
                popUpStatus={popUpStatus}
                handleLogInPopUp={handleLogInPopUp}
                handleSignUpPopUpStatus={handleSignUpPopUpStatus}
              />
            </Modal>
          )}
          {signUpPopUpStatus && (
            <Modal
              active={signUpPopUpStatus}
              setActive={handleSignUpPopUpStatus}
            >
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
            <Modal
              active={isActiveBookingHistory}
              setActive={handleBookingHistory}
            >
              <BookingHistory handleBookingHistory={handleBookingHistory} />
            </Modal>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
