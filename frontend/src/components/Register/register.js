import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./register.css"

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL to match your server route for registration
      await axios.post('http://localhost:4000/register', user);
      alert('Registered successfully. Please login now.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="R">
                {console.log(user)}
              <h1>Register</h1>
              <input type="text" name = "name" value={user.name} placeholder="Enter Username" onChange={handleChange}></input><br></br>
              <input type="email"  name="email"value={user.email} placeholder="Enter your Email"onChange={handleChange}></input><br></br>
              <input type="password" name="password" value={user.password} placeholder="Enter password"onChange={handleChange}></input><br></br>
              {/* <input type="password"  name="reEnterpassword" value={user.reEnterpassword} placeholder="Re-Enter password"onChange={handleChange}></input> */}
              <div className="Registerbtn" onClick={handleSubmit} >REGISTER</div>
               <div className="or">or</div>
              <div className="loginbtn" onClick={()=> navigate("/login")}>LOGIN</div>
           </div>
              
  );
};

export default Register;
