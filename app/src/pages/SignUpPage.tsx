import React from 'react';
import UserSignUpForm from "../components/UserSignUpForm/UserSignUpForm";

interface SignUpPageProps {
  active: boolean;
  setActive: () => void;
  handleLogInPopUp: () => void;
}

const SignUpPage =
    ({
       active,
       setActive,
       handleLogInPopUp
     }: SignUpPageProps) => (
        <>
          {active && (
              <UserSignUpForm
                  setActive={setActive}
                  handleLogInPopUp={handleLogInPopUp}
              />
          )}
        </>
    );

export default SignUpPage;
