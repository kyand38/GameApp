
import { useEffect, useState } from 'react';
import { Form, Input, Button, message, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';
import { gsap } from 'gsap';
import { AntDesignOutlined } from '@ant-design/icons';
import SignUpForm from '../components/Signup';

// Define the type for the form values
interface SignInFormValues {
    username: string;
    password: string;
}

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
        background-color: black;
    `,
    formWrapper: css`
        background-color: #2c2c2c;
        padding: 30px;
        border-radius: 10px;
        width: 400px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        color: white;
    `,
    formTitle: css`
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 20px;
    `,
    input: css`
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    background-color: #d3d3d3;
    color: #000;
    border: 1px solid #ccc;

    &:focus {
        background-color: #b0b0b0; /* Slightly darker grey on focus */
        border-color: #6253e1; /* Border color when focused */
    }

    &::placeholder {
        color: #777; /* Darker grey for placeholder text */
    }
`,
    button: css`
        width: 100%;
        background-color: #6253e1;
        color: white;
        font-size: 1.2rem;
        padding: 10px;
        border: none;
        border-radius: 5px;
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
}));


const SignIn = () => {
    const [showModal, setShowModal] = useState(false);
    const { styles } = useStyle();

    useEffect(() => {
        // GSAP animation for form appearance
        gsap.from('.formWrapper', { opacity: 0, y: -50, duration: 1, ease: 'easeOut' });
        gsap.from('.input', { opacity: 0, y: 20, stagger: 0.2, duration: 1, ease: 'easeOut' });
        gsap.from('.submitButton', { opacity: 0, y: 20, duration: 1, ease: 'easeOut', delay: 0.5 });
    }, []);

    const onFinish = (values: SignInFormValues) => {
        console.log('Success:', values);
        message.success('Login Successful!');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please check your credentials');
    };

    const [showModal, setShowModal] = useState(false);

    return (

        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.formTitle}>Sign In</h2>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            className={styles.input}
                            placeholder="Username"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            className={styles.input}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <ConfigProvider button={{ className: styles.linearGradientButton }}>
                            <Button
                                className={`${styles.button} button`}
                                type="primary"
                                size="large"
                                icon={<AntDesignOutlined />}
                            >
                                Sign In
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="link"
                            onClick={() => setShowModal(true)}
                            style={{ color: '#6253e1' }} // Button color for "Sign Up"
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* Modal */}
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
    );
};


export default SignIn;
