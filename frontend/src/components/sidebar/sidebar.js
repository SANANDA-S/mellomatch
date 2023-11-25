import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css'
function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/homepage"className="Link" >Home</Link></li>
        <li><Link to="/explore"className="Link" >Explore</Link></li>
        <li>Community</li>
        <li>Search</li>
        <li> <Link to="/profile"className="Link">Profile</Link></li>
        <li className="logoutbtn" onClick={() => navigate("/login")}>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
