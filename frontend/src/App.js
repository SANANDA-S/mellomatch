import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register/register';

import Homepage from './components/Homepage/homepage';
import Login from './components/Login/login';
import Welcome from './components/welcome/welcome';
import GuestPage from './components/guestpage/guestpage';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Welcome/>} />

        <Route exact path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/> }/>
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/guestpage" element={<GuestPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
