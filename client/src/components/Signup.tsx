
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../apollo/mutations';
import Auth from '../utils/auth';
import { Button, Form, Input, Typography} from 'antd';

const { Title } = Typography;

const SignupForm = ({ }: { handleForm: () => void }) => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [addUserMutation] = useMutation(ADD_USER);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(userFormData.password === value);
    }
  };

  const handleFormSubmit = async () => {
    if (!passwordsMatch) return;

    try {
      const { data } = await addUserMutation({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      const { token } = data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
    }}>
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        style={{
          background: '#000',
          padding: '20px',
          width: '400px',
        }}
      >
        <Title level={3} style={{ 
          color: '#8678fa', 
          textAlign: 'center', 
          marginBottom: '20px',
          marginTop: '-110px',
          fontFamily: 'Orbitron, Sans Serif' }}>

          Sign Up

        </Title>

        <Form.Item
          label={<span style={{ color: '#fff' }}>Username</span>}
          name="username"
          rules={[{ required: true, message: 'Username is required!' }]}
        >
          <Input
            name="username"
            placeholder="Your username"
            value={userFormData.username}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
  label={<span style={{ color: '#fff' }}>Email</span>}
  name="email"
  rules={[
    { required: true, message: 'Email is required!' },
    { type: 'email', message: 'Enter a valid email!' },
  ]}
>
  <Input
    name="email"
    type="email"
    placeholder="Your email address"
    value={userFormData.email}
    onChange={handleInputChange}
    style={{ color: '#fff' }}
  />
</Form.Item>

        <Form.Item
          label={<span style={{ color: '#fff' }}>Password</span>}
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Input.Password
            name="password"
            placeholder="Your password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: '#fff' }}>Confirm Password</span>}
          name="confirmPassword"
          rules={[{ required: true, message: 'Confirm Password is required!' }]}
        >
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm your password"
            value={userFormData.confirmPassword}
            onChange={handleInputChange}
          />
          {!passwordsMatch && (
            <div style={{ color: 'red', marginTop: '5px' }}>Passwords do not match!</div>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '50%',
              backgroundColor: '#6253e1',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
            disabled={!passwordsMatch}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
