import React from 'react';
import UserLogInForm from "../../components/UserLogInForm/UserLogInForm";
import {UserLogInFormProps} from "./utils/UserLoginPageInterface";

const UserLogInPage =
    ({
       popUpStatus,
       handleLogInPopUp,
       handleSignUpPopUpStatus
    }: UserLogInFormProps) => (
    <UserLogInForm
        status={popUpStatus}
        handleLogInPopUp={handleLogInPopUp}
        handleSignUpPopUpStatus={handleSignUpPopUpStatus}
    />
)

export default UserLogInPage;
