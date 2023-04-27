import React, { useEffect, useState } from "react";
import Signin from "../Access/Signin"
import Dashboard from "../Dashboard/Dashboard";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function TaskManager(props) {
    
    const location = useLocation()
    const isLoggedIn = location.state?.loggedIn

    const gotoDashboard = ()=>{
      console.log("Navigate to dashboard",isLoggedIn)
      return (<Navigate to="/dashboard" state={{ loggedIn:true}}/>)
    }

    const gotoSignin = ()=>{
      console.log("Navigate to dashboard",isLoggedIn)
      return (<Navigate to="/signin" state={{ loggedIn:false}}/>)
    }
    return(
      
            <div>
                {
                  ( isLoggedIn ? gotoDashboard()  : gotoSignin() )
                }                                                                   
            </div>
    )
}

export default TaskManager

