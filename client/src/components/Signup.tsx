import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../apollo/mutations'; // Import ADD_USER mutation
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const SignupForm = ({ handleForm } : { handleForm: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // Apollo mutation hook for creating a new user
  const [addUserMutation] = useMutation(ADD_USER);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(userFormData.password === value);
    }
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false|| !passwordsMatch ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      // Perform addUser mutation using Apollo Client
      const { data } = await addUserMutation({
        variables: {    
            username: userFormData.username,
            email: userFormData.email,
            password: userFormData.password,   
        },
      });
      // Assuming `data.addUser.token` returns a token
      const { token } = data.addUser;
      Auth.login(token); // Save the token to local storage or cookies
        // Close the modal (if applicable)
    //andleModalClose();
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Display error alert
      
    }

    // Reset form data
    setUserFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            name='confirmPassword'
            onChange={handleInputChange}
            value={userFormData.confirmPassword || ''}
            required
          />
          {!passwordsMatch && (
            <Form.Text className='text-danger'>Passwords do not match!</Form.Text>
          )}
          <Form.Control.Feedback type='invalid'>Confirm Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password && passwordsMatch)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;