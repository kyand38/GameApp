import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Contribute from './pages/Contribute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Contribute" element={<Contribute/>} />
      </Routes>
    </Router>
  );
}

export default App;