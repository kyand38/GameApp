import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import Logo from '../images/trivia-titans-logo.png'
import Fireworks from '../components/Fireworks';
import SparkleEffect from '../components/SparkleComponent';
import Leaderboard from '../components/Leaderboard';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
            border-width: 0;
            > span {
                position: relative;
            }
            &::before {
                content: '';
                background: linear-gradient(135deg, #6253e1, #04befe);
                position: absolute;
                inset: 0;
                opacity: 1;
                transition: all 0.3s;
                border-radius: inherit;
            }
            &:hover::before {
                opacity: 0;
            }
        }
    `,
    container: css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        background-color: black;
        color: white;
        overflow: ;
        margin: 0;
    `,
    heading: css`
        font-family: 'Orbitron', sans-serif;
        margin-bottom: 20px;
        opacity: 0;
        z-index: 2;
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradientAnimation 3s ease infinite, bounce 1s ease-in-out infinite;

        @keyframes gradientAnimation {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }
    `,
    button: css`
        display: inline-block;
        margin: 10px;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        z-index: 2;
        position: relative;

        &:hover {
            animation: spin 0.5s ease-in-out;
        }
    `,
    image: css`
        margin-top: -100px;
        max-width: 400px;
        height: auto;
        margin-bottom: 50px;
        z-index: 2;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        

    `,
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },

}));


// Home Component
const Home = () => {
    const { styles } = useStyle();
    const navigate = useNavigate();

    const handleGameClick = () => {
        navigate('/game');
    };
    const handleGame2Click = () => {
        navigate('/game2');
    };
    const handleScoresClick = () => {
        navigate('/home');
    };
    const handleStreakClick = () => {
        navigate('/game1');
    };

    useEffect(() => {
        // Initial animation for the image
        gsap.from('.image', {
            opacity: 0,
            scale: 0.8,
            rotation: -360,
            duration: 2,
            ease: 'back.out(1.7)',
            onComplete: () => {
                // Scale bounce effect
                gsap.to('.image', {
                    scale: 1.1,
                    duration: 0.4,
                    ease: 'power1.out',
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        // Start infinite Y-axis rotation
                        gsap.to('.image', {
                            rotationY: 360,
                            transformOrigin: "50% 50%",
                            duration: 4, // Adjust for slower or faster rotation
                            ease: 'linear', // Smooth rotation
                            repeat: -1, // Infinite rotation
                            repeatDelay: 2, // No delay before repeating
                        });
                    },
                });
            },
        });

        // Animations for heading and buttons
        gsap.to('.heading', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.5,
        });

        gsap.to('.button', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.5)',
            stagger: 0.2,
            delay: 1,
        });
    }, []);


    return (
        <>
        <SparkleEffect />
            <Leaderboard />
          
            <div className={styles.container}>
                <Fireworks />
                <div>
                    <img src={Logo} alt="Trivia Titan" className={`${styles.image} image`} />
                    <h1 className={`${styles.heading} heading`}>Trivia Titan: Are You Ready to Party?</h1>
                    <ConfigProvider button={{ className: styles.linearGradientButton }}>
                        <Space>
                            <Button
                                className={`${styles.button} button spikyButton`}
                                type="primary"
                                size="large"
                                icon={<AntDesignOutlined />}
                                onClick={handleGameClick}
                            >
                                21 Questions
                            </Button>
                            <Button
                                className={`${styles.button} button spikyButton`}
                                type="primary"
                                size="large"
                                icon={<AntDesignOutlined />}
                                onClick={handleGame2Click}
                            >
                                21 Questions (Category)
                            </Button>
                            <Button
                                className={`${styles.button} button`}
                                type="primary"
                                size="large"
                                icon={<AntDesignOutlined />}
                                onClick={handleScoresClick}
                            >
                                View High Scores
                            </Button>
                            <Button
                                className={`${styles.button} button`}
                                type="primary"
                                size="large"
                                icon={<AntDesignOutlined />}
                                onClick={handleStreakClick}
                            >
                                Streak Mode
                            </Button>
                        </Space>
                    </ConfigProvider>
                </div>
            </div>
        </>
    );
};

export default Home;
