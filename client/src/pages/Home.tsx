import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import { useNavigate } from 'react-router-dom';
import Titan from '../images/Titian.webp';
import { useEffect } from 'react';
import { gsap } from 'gsap'; // Import GSAP

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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: black;
    color: white;
  `,
  icon: css`
    transition: transform 0.3s ease, filter 0.2s ease; /* Transition for rotation and filter */
  `,
  iconHover: css`
    &:hover {
      transform: rotate(360deg); /* Rotate the icon on hover */
    }
    /* Adding a bounce effect on hover */
    &:active {
      animation: bounce 0.3s ease-out;
    }
  `,
  heading: css`
    margin-bottom: 20px;
    opacity: 0; /* Initially hidden */
  `,
  button: css`
    display: inline-block;
    margin: 10px;
    opacity: 0; /* Initially hidden */
  `,
  image: css`
    max-width: 300px;  /* Limit the width */
    height: auto;      /* Keep the aspect ratio */
    margin-bottom: 30px;
    border-radius: 50%; /* Make the image round */
  `
}));

const Home = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate('/game');
  };
  const handleScoresClick = () => {
    navigate('/home'); // change when ready
  };
  const handleStreakClick = () => {
    navigate('/home'); // change when ready
  };

  // GSAP animation on component mount
  useEffect(() => {
    // Image animation
    gsap.from(".image", {
      opacity: 0,
      scale: 0.8,
      rotation: -360,
      duration: 2,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Grow the image after the initial animation completes and "land" it
        gsap.to(".image", {
          scale: 1.1,
          duration: 0.4,
          ease: "power1.out", // Smooth deceleration
          yoyo: true, // Make the scale bounce back a bit
          repeat: 1,  // Repeat once for a soft landing effect
        });
      },
    });

    // Heading animation (fade-in and slide-up)
    gsap.to(".heading", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5, // Delay slightly for the image animation
    });

    // Buttons animation (bounce and scale-up)
    gsap.to(".button", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.5)",
      stagger: 0.2, // Stagger the button animations
      delay: 1, // Start button animation after heading is done
    });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className={styles.container}>
      <div>
        <img src={Titan} alt="Trivia Titan" className={`${styles.image} image`} />
        <h1 className={`${styles.heading} heading`}>Welcome to Trivia Titans</h1>
        <ConfigProvider button={{ className: styles.linearGradientButton }}>
          <Space>
            <Button
              className={`${styles.button} button`}
              type="primary"
              size="large"
              icon={<AntDesignOutlined className={`${styles.icon} ${styles.iconHover}`} />}
              onClick={handleGameClick}
            >
              21 Questions
            </Button>
            <Button
              className={`${styles.button} button`}
              type="primary"
              size="large"
              icon={<AntDesignOutlined className={`${styles.icon} ${styles.iconHover}`} />}
              onClick={handleScoresClick}
            >
              View High Scores
            </Button>
            <Button
              className={`${styles.button} button`}
              type="primary"
              size="large"
              icon={<AntDesignOutlined className={`${styles.icon} ${styles.iconHover}`} />}
              onClick={handleStreakClick}
            >
              Streak Mode
            </Button>
          </Space>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Home;
