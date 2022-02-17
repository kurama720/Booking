import React, { useState } from "react";
import UserProfile from "../../components/UserProfile";
import Modal from "../../components/Modal/Modal";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import SignUpPage from "../SignUpPage";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const UserProfilePage = () => {
  const [isVisibleResetMenu, setVisibleResetMenu] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false);
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [isVisibleChangePasswordMenu, setVisibleChangePasswordMenu] =
    useState<boolean>(false);

  const handleResetMenu = () => setVisibleResetMenu((prev) => !prev);
  const handleSignUpPopUpStatus = () => setSignUpPopUpStatus((prev) => !prev);
  const handleLogInPopUp = () => setPopUpStatus((prev) => !prev);
  const handleChangePasswordMenu = () =>
    setVisibleChangePasswordMenu((prev) => !prev);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <UserProfile handleChangePasswordMenu={handleChangePasswordMenu} />
      {isVisibleChangePasswordMenu && (
        <Modal
          active={isVisibleChangePasswordMenu}
          setActive={handleChangePasswordMenu}
        >
          <ChangePasswordForm
            handleChangePasswordMenu={handleChangePasswordMenu}
            handleResetMenu={handleResetMenu}
            handleLogInPopUp={handleLogInPopUp}
          />
        </Modal>
      )}
      {isVisibleResetMenu && (
        <Modal active={isVisibleResetMenu} setActive={handleResetMenu}>
          <ResetPasswordForm
            setActive={handleResetMenu}
            handleSignUpPopUp={handleSignUpPopUpStatus}
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
      {popUpStatus && (
        <Modal active={popUpStatus} setActive={handleLogInPopUp}>
          <UserLogInPage
            popUpStatus={popUpStatus}
            handleLogInPopUp={handleLogInPopUp}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleResetPasswordPopUpStatus={handleResetMenu}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserProfilePage;
