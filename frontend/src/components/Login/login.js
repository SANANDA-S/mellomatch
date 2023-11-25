import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/homepage');
      }
    } catch (error) {
      alert('User not registered or Wrong email or password');
    }
  };

  return (
    <div className="l">
                {console.log(user)}
               <h1>Login</h1>
               <div className="inputPlace">
               <input className="emailfield" type="text" name="email"value={user.email} onChange={handleChange} placeholder="Your Email"></input><br></br>
               
               <input  className="passwordfield" type="password"  name="password"value={user.password}onChange={handleChange} placeholder="Password"></input>
               </div>
               <div className="loginbtnn" onClick={handleSubmit}>LOGIN</div>
               <div className="guestbtnn" onClick={()=> navigate("/guestpage")}>Guest</div>
               <div className="or">or</div>
               <div className="Registerbtnn" onClick={()=> navigate("/register")} >REGISTER</div>
            </div>
  )}
export default Login;
