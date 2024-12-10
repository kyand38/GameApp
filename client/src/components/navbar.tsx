import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Login from './Login';
import SignupForm from './Signup';
import Auth from '../utils/auth';

import { createStyles } from 'antd-style';
import { Divider } from 'antd';
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
        opacity: 1;
        animation: fadeIn 1s forwards; /* Fade in effect */
    `,
    navItem: css`
        position: relative;
        transition: transform 0.3s ease, color 0.3s ease;
        &:hover {
            transform: scale(1.1); /* Slightly scale up when hovered */
            color: #04BEFE; /* Change color on hover */
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
            background: linear-gradient(135deg, #6253E1, #04BEFE);
            opacity: 0;
            transition: opacity 0.3s;
        }
        &:hover {
            color: #04BEFE;
        }
        &:hover::after {
            opacity: 1;
        }
    `,
    signupButton: css`
        background-color: #6253E1;
        color: white;
        padding: 10px 20px;
        font-size: 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #04BEFE;
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
const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const { styles } = useStyle();
    return (
        <div className={styles.container}>
        {/*    <ul className={styles.nav}>
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
                    <Link
                        className={styles.navLink} to="/"
                    // onClick={() => setShowModal(true)}
                    >
                        Sign Up
                    </Link>
                </li>

                <li className={styles.navItem}>
                    <Link
                        className={styles.navLink} to="/"
                    //   onClick={() => setshowLoginModal(true)}
                    >
                        login
                    </Link>
                </li>
            </ul>
        */
        }
            {/* {showLoginModal && (
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
            )} */}
      <div>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
          Trivia Titan
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'>
                See your Points!
              </Nav.Link>
              {/* if user is logged in show profile , contribute and logout */}
              {Auth.loggedIn() ? (
                <>
                 <ul className={styles.nav}>
                    <li className={styles.navItem}>
                        <Nav.Link as={Link} to='/profile'>
                        Profile
                        </Nav.Link>
                    </li>
                    <li className={styles.navItem}>
                        <Nav.Link as={Link} to='/contribute'>
                        Contribute
                        </Nav.Link>
                    </li>
                    <li className={styles.navItem}>
                        <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </li>
                  </ul>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </div>

                {/* set modal data up */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                <Modal.Header closeButton>
                    <Modal.Title id='signup-modal'>
                    <Nav variant='pills'>
                        <Nav.Item>
                        <Nav.Link eventKey='login'>Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Content>
                    <Tab.Pane eventKey='login'>
                        <Login handleForm={() => setShowModal(false)} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='signup'>
                        <SignupForm handleForm={() => setShowModal(false)} />
                    </Tab.Pane>
                    </Tab.Content>
                </Modal.Body>
                </Tab.Container>
            </Modal>
        </div>
    );
};
export default AppNavbar;