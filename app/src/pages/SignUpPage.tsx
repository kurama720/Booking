import React, {useState} from 'react';
import UserSignUpForm from "../components/UserSignUpForm/UserSignUpForm";
import Modal from "../components/Modal/Modal";

const SignUpPage = () => {
    const [showModalSignUp,setShowModalSignUp] = useState<boolean>(false)

    const showModal = () => {
        setShowModalSignUp(true)
    }

    return (
        <>
            <button onClick={showModal}>Sign up</button>
            <Modal active={showModalSignUp} setActive={setShowModalSignUp}>
                <UserSignUpForm setActive={setShowModalSignUp} />
            </Modal>
        </>
    );
};

export default SignUpPage;
