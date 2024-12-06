import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from './Signup';
import Auth from '../utils/auth';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false); // Controla el modal

    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={Auth.logout}>
                        Sign out
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/home">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">
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
            </ul>

            {/* Modal sin Bootstrap */}
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