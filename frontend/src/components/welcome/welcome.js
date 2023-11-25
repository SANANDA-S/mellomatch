import React from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
    const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Welcome to Mellomatch</h1>
      <div className="buttons">
        <button className="admin">Admin</button>
        <button className="user" onClick={()=> navigate("/login")} >User</button>
      </div>
    </div>
  );
};

export default Welcome;

