import React from "react";

import { useNavigate } from "react-router-dom";
import "./guestpage.css"
const GuestPage=()=>{
    const navigate= useNavigate()
    

    return(
    //     <div className="guestpage">
    //     <h1>GUESTPAGE</h1>
    //     <div className="logoutbtn" onClick={()=> navigate("/login")}>
    //         LOGIN
    //     </div>
    // </div>
    
    
      
    <div className="container">
    <div className="sidebar">
      <ul>
        <li>Home</li>
        <li>Explore</li>
        <li onClick={()=> alert("Please login")}>Community</li>
        <li>Search</li>
        <li onClick={()=> alert("Please login")}>Profile</li>
        <li className="guestloginbtn" onClick={()=> navigate("/login") }>Login</li>
      </ul>
    </div>

    {/* Rest of your content */}
  </div>
          
        
      );
    }
    
  

    


export default GuestPage;