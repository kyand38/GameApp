import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from './Signup';
import Login from './Login';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Auth from '../utils/auth';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
    container: css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: black;
        color: white;
        text-align: center;
        padding: 0 20px;
    `,
    nav: css`
        list-style: none;
        display: flex;
        gap: 20px;
        margin: 0;
        padding: 0;
        opacity: 0; /* Start with opacity 0 for animation */
    `,
    navItem: css`
        position: relative;
        transition: transform 0.3s ease, color 0.3s ease;
        &:hover {
            animation: spin 0.5s ease-out;
            color: #04befe;
        }
    `,
    navLink: css`
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        position: relative;
        transition: color 0.3s ease;
        &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(135deg, #6253e1, #04befe);
            opacity: 0;
            transition: opacity 0.3s;
        }
        &:hover {
            color: #04befe;
        }
        &:hover::after {
            opacity: 1;
        }
    `,
}));

// Add keyframes in a <style> tag
const SpinKeyframes = () => (
    <style>
        {`
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        `}
    </style>
);

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const { styles } = useStyle();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/" onClick={Auth.logout}>
                        Sign out
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/home">
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/profile">
                        Profile
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/contribute">
                        Contribute
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <button
                        className={styles.signupButton}
                        onClick={() => setShowModal(true)}
                    >
                        Sign Up
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button
                        className={styles.signupButton}
                        onClick={() => setShowLoginModal(true)}
                    >
                        Login
                    </button>
                </li>
            </ul>

            {/* Login Modal */}
            {showLoginModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowLoginModal(false)}
                        >
                            &times;
                        </button>
                        <h2>Login</h2>
                        <Login handleModalClose={() => setShowLoginModal(false)} />
                    </div>
                </div>
            )}

            {/* Sign-Up Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
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

export default Navbar;