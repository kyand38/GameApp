import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { createStyles } from 'antd-style';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import SparkleEffect from '../components/SparkleComponent';

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
        align-items: flex-start;
        height: 100vh;
        text-align: center;
        background-color: black;
        overflow: hidden;
        margin: 0;
        padding: 20px;
        gap: 20px;
    `,
    formWrapper: css`
        margin-top: 80px;
        background: linear-gradient(135deg, #f04dff,#25c4f5);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 100%;
    `,
    header: css`
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        color: black;
        font-family: 'Orbitron', sans-serif;
    `,
}));

const Contribute: React.FC = () => {
    const { styles } = useStyle();

 
    const [feedbackForm] = Form.useForm();
    const [questionForm] = Form.useForm();

   
    const onFinishFeedback = (values: { name: string; email: string; feedback: string }) => {
        message.success('Thank you for your feedback!');
        console.log('Feedback submitted: ', values);
        feedbackForm.resetFields(); 
    };

    
    const onFinishFeedbackFailed = (errorInfo: ValidateErrorEntity<{ name: string; email: string; feedback: string }>) => {
        message.error('Please fill out all required fields in the feedback form!');
        console.error('Feedback form errors: ', errorInfo);
    };

   
    const onFinishQuestion = (values: { question: string; correctAnswer: string; wrong1: string; wrong2: string; wrong3: string }) => {
        message.success('Question submitted successfully!');
        console.log('Question submitted: ', values);
        questionForm.resetFields(); 
    };

    
    const onFinishQuestionFailed = (errorInfo: ValidateErrorEntity<{ question: string; correctAnswer: string; wrong1: string; wrong2: string; wrong3: string }>) => {
        message.error('Please fill out all required fields in the question form!');
        console.error('Question form errors: ', errorInfo);
    };

    return (
        <div className={styles.container}>
            <SparkleEffect />
            {/* Feedback Form */}
            <div className={styles.formWrapper}>
                <div className={styles.header}>Feedback</div>
                <Form
                    form={feedbackForm}
                    name="feedback"
                    layout="vertical"
                    onFinish={onFinishFeedback}
                    onFinishFailed={onFinishFeedbackFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Feedback"
                        name="feedback"
                        rules={[{ required: true, message: 'Please provide your feedback!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={`${styles.linearGradientButton}`}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* Submit a Question Form */}
            <div className={styles.formWrapper}>
                <div className={styles.header}>Submit a Question</div>
                <Form
                    form={questionForm}
                    name="submitQuestion"
                    layout="vertical"
                    onFinish={onFinishQuestion}
                    onFinishFailed={onFinishQuestionFailed}
                >
                    <Form.Item
                        label="Question"
                        name="question"
                        rules={[{ required: true, message: 'Please enter the question!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Correct Answer"
                        name="correctAnswer"
                        rules={[{ required: true, message: 'Please enter the correct answer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Wrong Answer 1"
                        name="wrong1"
                        rules={[{ required: true, message: 'Please enter a wrong answer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Wrong Answer 2"
                        name="wrong2"
                        rules={[{ required: true, message: 'Please enter a wrong answer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Wrong Answer 3"
                        name="wrong3"
                        rules={[{ required: true, message: 'Please enter a wrong answer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={`${styles.linearGradientButton}`}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Contribute;
