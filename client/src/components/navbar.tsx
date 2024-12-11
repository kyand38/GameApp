import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Login from './Login';
import SignupForm from './Signup';
import Auth from '../utils/auth';
import Home from "../images/home.png"
import "../assets/styles/flames.css"
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
    container: css`
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
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
        color: white;
        font-size: 1.2rem;
        position: relative;
        transition: transform 0.3s ease, color 0.3s ease;
        &:hover {
            transform: scale(1.3); /* Slightly scale up when hovered */
            color: #04BEFE; /* Change color on hover */
            text-decoration: underline;
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

            <div>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            src={Home}
                            alt="Home Icon"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
                        <Nav className='ml-auto d-flex'>
                            {/* if user is logged in show profile , contribute and logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <ul className={styles.nav}>
                                        <li className={styles.navItem}>
                                            <Nav.Link as={Link} to='/profile'
                                                 style={{
                                                    fontFamily: 'Orbitron, sans-serif',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    background: 'linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00)',
                                                    backgroundSize: '300% 300%',
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    color: 'transparent',
                                                    animation: 'gradientAnimation 3s ease infinite',
                                                    opacity: 1, // Set to 1 for visibility
                                                }}
                                            >
                                                Profile
                                            </Nav.Link>
                                        </li>
                                        <li className={styles.navItem}>
                                            <Nav.Link as={Link} to='/contribute'
                                                 style={{
                                                    fontFamily: 'Orbitron, sans-serif',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    background: 'linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00)',
                                                    backgroundSize: '300% 300%',
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    color: 'transparent',
                                                    animation: 'gradientAnimation 3s ease infinite',
                                                    opacity: 1, // Set to 1 for visibility
                                                }}
                                            >
                                                Contribute
                                            </Nav.Link>
                                        </li>
                                        <li className={styles.navItem}>
                                            <Nav.Link onClick={Auth.logout}
                                                 style={{
                                                    fontFamily: 'Orbitron, sans-serif',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    background: 'linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00)',
                                                    backgroundSize: '300% 300%',
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    color: 'transparent',
                                                    animation: 'gradientAnimation 3s ease infinite',
                                                    opacity: 1, // Set to 1 for visibility
                                                }}
                                            >Logout</Nav.Link>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <Nav.Link className={styles.navItem} onClick={() => setShowModal(true)}
                                style={{
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00)',
                                    backgroundSize: '300% 300%',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    animation: 'gradientAnimation 3s ease infinite',
                                    opacity: 1, // Set to 1 for visibility
                                }}
                                >Login/Sign Up</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </div>

            {/* set modal data up */}
            <Modal
    size="lg"
    show={showModal}
    onHide={() => setShowModal(false)}
    aria-labelledby="signup-modal"
    style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: 'none', 
        maxWidth: '400px', 
    }}
>
    <Tab.Container defaultActiveKey="login">
    <Modal.Header
    closeButton
    style={{
        borderBottom: '1px solid black',
        background: 'black',
        color: '#fff',
    }}
>
    <button
        type="button"
        className="btn-close"
        aria-label="Close"
        style={{
            color: '#fff',
            opacity: 1,
        }}
        onClick={() => setShowModal(false)}
    ></button>
    <Modal.Title id="signup-modal">
        <Nav variant="pills" style={{ justifyContent: 'center', gap: '10px' }}>
            <Nav.Item>
                <Nav.Link
                    eventKey="login"
                    style={{
                        background: 'linear-gradient(135deg, #ff007f, #7f00ff)',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        color: '#fff',
                        fontWeight: 'bold',
                        transition: 'background 0.3s ease',
                        fontFamily: 'Orbitron, sans-serif',
                    }}
                >
                    Login
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    eventKey="signup"
                    style={{
                        background: 'linear-gradient(135deg, #04BEFE, #00ff00)',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        color: '#fff',
                        fontWeight: 'bold',
                        transition: 'background 0.3s ease',
                        fontFamily: 'Orbitron, sans-serif',
                    }}
                >
                    Sign Up
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </Modal.Title>
</Modal.Header>

        <Modal.Body
            style={{
                backgroundColor: '#1e1e2f', // Dark body background
            }}
        >
            <Tab.Content>
                <Tab.Pane eventKey="login">
                    <Login handleForm={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
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