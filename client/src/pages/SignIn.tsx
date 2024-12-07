import Login from "../components/Login";
import { Card } from 'antd';
import SignUpForm from '../components/Signup';
import { useState } from "react";


const SignIn = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <h1>Login or Sign Up</h1>
        <Card>
        <Login />
        </Card>
        <button
            className="signup-button"
            onClick={() => setShowModal(true)}
        >
            Sign Up
        </button>
        {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button
                        className="close-button"
                        onClick={() => setShowModal(false)}
                    >
                        &times;
                    </button>
                    <h2>Sign Up</h2>
                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                </div>
            </div>
        )}
        </>
    );
}

export default SignIn;