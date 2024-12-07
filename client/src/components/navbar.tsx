import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from './Signup';
//import Login from './Login';
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
        animation: slideIn 0.5s ease-out; /* Slide in the navbar */
    `,
    nav: css`
        list-style: none;
        display: flex;
        gap: 20px;
        margin: 0;
        padding: 0;
        opacity: 0;
        animation: fadeIn 1s forwards; /* Fade in effect */
    `,
    navItem: css`
        position: relative;
        transition: transform 0.3s ease, color 0.3s ease;
        &:hover {
            transform: scale(1.1); /* Slightly scale up when hovered */
            color: #04befe; /* Change color on hover */
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
    signupButton: css`
        background-color: #6253e1;
        color: white;
        padding: 10px 20px;
        font-size: 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #04befe;
        }
    `,
    modalOverlay: css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `,
    modalContent: css`
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 400px;
        max-width: 100%;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 10000;
    `,
    closeButton: css`
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    `,
    
    // Animations
    '@keyframes slideIn': {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
    },
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    }
}));

const Navbar = () => {
    const [showModal, setShowModal] = useState(false); 
    const [showLoginModal, setshowLoginModal] = useState(false); 

   
    const { styles } = useStyle();


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
