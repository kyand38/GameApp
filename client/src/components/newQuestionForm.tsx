import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correct: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const NewQuestionForm: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Qusetion"
            name="question"
            rules={[{ required: true, message: 'Please input your Question!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="First possible Answer"
            name="answer1"
            rules={[{ required: true, message: 'Please input your first possible answer!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Second possible answer"
            name="answer2"
            rules={[{ required: true, message: 'Please input your second possible answer!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Third possible Answer"
            name="answer3"
            rules={[{ required: true, message: 'Please input your third possible answer!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Fourth possible Answer"
            name="answer4"
            rules={[{ required: true, message: 'Please input your fourth possible answer!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Correct answer"
            name="correct"
            rules={[{ required: true, message: 'Please input your correct answer!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit Question
            </Button>
        </Form.Item>
    </Form>
);

export default NewQuestionForm;