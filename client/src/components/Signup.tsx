
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../apollo/mutations'; // Importa la mutación ADD_USER
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
          padding: '30px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Title level={3} style={{ color: '#6253e1', textAlign: 'center', marginBottom: '20px' }}>
          Sign Up
        </Title>

        <Form.Item
          label="Username"
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
          label="Email"
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
          />
        </Form.Item>

        <Form.Item
          label="Password"
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
          label="Confirm Password"
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
              width: '100%',
              backgroundColor: '#6253e1',
              color: '#000',
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




// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../apollo/mutations'; // Import ADD_USER mutation
// import { Form, Button, Alert } from 'react-bootstrap';
// import Auth from '../utils/auth';
// import type { User } from '../models/User';

// const SignupForm = ({ } : { handleForm: () => void }) => {
//   const [userFormData, setUserFormData] = useState<User>({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [passwordsMatch, setPasswordsMatch] = useState(true);
//   // Apollo mutation hook for creating a new user
//   const [addUserMutation] = useMutation(ADD_USER);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//     if (name === 'password' || name === 'confirmPassword') {
//       setPasswordsMatch(userFormData.password === value);
//     }
//   };
//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false|| !passwordsMatch ) {
//       event.preventDefault();
//       event.stopPropagation();
//       setValidated(true);
//       return;
//     }
//     try {
//       // Perform addUser mutation using Apollo Client
//       const { data } = await addUserMutation({
//         variables: {    
//             username: userFormData.username,
//             email: userFormData.email,
//             password: userFormData.password,   
//         },
//       });
//       // Assuming `data.addUser.token` returns a token
//       const { token } = data.addUser;
//       Auth.login(token); // Save the token to local storage or cookies
//         // Close the modal (if applicable)
//     //andleModalClose();
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true); // Display error alert
      
//     }

//     // Reset form data
//     setUserFormData({
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     });
//   };

//   return (
//     <>
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//           Something went wrong with your signup!
//         </Alert>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='username'>Username</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Your username'
//             name='username'
//             onChange={handleInputChange}
//             value={userFormData.username || ''}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='email'>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Your email address'
//             name='email'
//             onChange={handleInputChange}
//             value={userFormData.email || ''}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='password'>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Your password'
//             name='password'
//             onChange={handleInputChange}
//             value={userFormData.password || ''}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Confirm your password'
//             name='confirmPassword'
//             onChange={handleInputChange}
//             value={userFormData.confirmPassword || ''}
//             required
//           />
//           {!passwordsMatch && (
//             <Form.Text className='text-danger'>Passwords do not match!</Form.Text>
//           )}
//           <Form.Control.Feedback type='invalid'>Confirm Password is required!</Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(userFormData.username && userFormData.email && userFormData.password && passwordsMatch)}
//           type='submit'
//           variant='success'>
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default SignupForm;