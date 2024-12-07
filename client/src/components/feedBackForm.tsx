import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    feedback: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const FeedBackForm: React.FC = () => (
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
            label="Feedback"
            name="feedback"
            rules={[{ required: true, message: 'Please input your feedback before submitting!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit Feedback
            </Button>
        </Form.Item>
    </Form>
);

export default FeedBackForm;