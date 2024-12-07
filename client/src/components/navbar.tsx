import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from './Signup';
import Login from './Login';
import Auth from '../utils/auth';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false); 
    const [showLoginModal, setshowLoginModal] = useState(false); 

    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={Auth.logout}>
                        Sign out
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link'
                        to="/home"
                    >
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link'
                        to="/profile"
                    >
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contribute">
                        Contribute
                    </Link>
                </li>
                <li className="nav-item">
                    <button
                        className="signup-button"
                        onClick={() => setShowModal(true)}
                    >
                        Sign Up
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="signup-button"
                        onClick={() => setshowLoginModal(true)}
                    >
                        login
                    </button>
                </li>
            </ul>
          
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-button"
                            onClick={() => setshowLoginModal(false)}
                        >
                            &times;
                        </button>
                        <h2>Login</h2>
                        <Login handleModalClose={() => setshowLoginModal(false)} />
                    </div>
                </div>
            )}
            
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
        </div>
    );
};

export default Navbar;