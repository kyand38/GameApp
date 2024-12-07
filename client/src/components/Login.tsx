import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LoginMutations } from '../apollo/mutations'; // Import ADD_USER mutation


const Login = ({ handleModalClose }: { handleModalClose: () => void }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LoginMutation] = useMutation(LoginMutations);/*CONSULTAR*/
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await LoginMutation({ variables: { email, password } });
      if (data?.login?.token) {
        localStorage.setItem('id_token', data.login.token);
        handleModalClose()
        navigate('/home');
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