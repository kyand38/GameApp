import React, { useState } from 'react';

import { useMutation, gql } from '@apollo/client';


import { LoginMutations } from '../apollo/mutations'; // Import ADD_USER mutation
import { useNavigate } from 'react-router-dom';

const Login = ({ handleModalClose }: { handleModalClose: () => void }) => {
    const navigate = useNavigate();



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LoginMutation] = useMutation(LoginMutations);/*CONSULTAR*/


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await LoginMutation({ variables: { email, password } });
      if (data?.login?.token && data?.login?.userExists ) {// Verifica si el usuario existe
        localStorage.setItem('id_token', data.login.token);
        handleModalClose()
        navigate('/home');
      } else {
        console.error('Invalid credentials or user does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;