import React, {useState} from "react";
import Header from "../../components/Header/Header";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import SignUpPage from "../SignUpPage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Modal from '../../components/Modal/Modal'
import {BookingState} from "./utils/HomePageInterface";

const HomePage = () => {
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false)
  const [activeLocationBox, isActiveLocationBox] = useState<boolean>(false)
  const [activeLogout, isActiveLogout] = useState<boolean>(false)
  const [calendarPopUpStatus, setCalendarPopUpStatus] = useState<boolean>(false)
  const [userBookingDate, setUserBookingDate] = useState<BookingState>({
    city: '',
    numOfPersons: 0,
    checkInDate: "",
    checkOutDate: "",
  })

  const handleLogInPopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleSignUpPopUpStatus = () => {
    setSignUpPopUpStatus((prev) => !prev)
  }

  const handleLogoutPopUpStatus = () => {
    isActiveLogout((prev) => !prev)
  }

  const handleCalendarPopUpStatus = () => {
    setCalendarPopUpStatus((prev) => !prev)
  }

  return (
      <div>
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
        />
        {
            popUpStatus && (
                <Modal active={popUpStatus} setActive={handleLogInPopUp}>
                  <UserLogInPage
                      popUpStatus={popUpStatus}
                      handleLogInPopUp={handleLogInPopUp}
                      handleSignUpPopUpStatus={handleSignUpPopUpStatus}
                  />
                </Modal>
            )
        }
        {
            signUpPopUpStatus && (
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
            )
        }
        {activeLogout && (
            <Modal
                active={activeLogout}
                setActive={handleLogoutPopUpStatus}
            >
              <LogoutButton
                  handleLogoutPopUpStatus={handleLogoutPopUpStatus}
                  activeLogout={activeLogout}
              />
            </Modal>
        )}
      </div>
  );
};

export default HomePage;
