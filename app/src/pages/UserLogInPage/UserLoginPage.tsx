import React from "react";
import UserLogInForm from "../../components/UserLogInForm/UserLogInForm";
import { UserLogInFormProps } from "./utils/UserLoginPageInterface";

function UserLogInPage({
  popUpStatus,
  handleLogInPopUp,
  handleSignUpPopUpStatus,
}: UserLogInFormProps) {
  return (
    <UserLogInForm
      status={popUpStatus}
      handleLogInPopUp={handleLogInPopUp}
      handleSignUpPopUpStatus={handleSignUpPopUpStatus}
    />
  );
}

export default UserLogInPage;
