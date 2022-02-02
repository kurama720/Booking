import React from "react";
import UserSignUpForm from "../components/UserSignUpForm/UserSignUpForm";

interface SignUpPageProps {
  active: boolean;
  setActive: () => void;
  handleLogInPopUp: () => void;
}

function SignUpPage({ active, setActive, handleLogInPopUp }: SignUpPageProps) {
  return (
    <>
      {active && (
        <UserSignUpForm
          setActive={setActive}
          handleLogInPopUp={handleLogInPopUp}
        />
      )}
    </>
  );
}

export default SignUpPage;
