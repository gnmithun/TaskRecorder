import React, { useEffect, useState } from "react";
import Signin from "../Access/Signin"
import Dashboard from "../Dashboard/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";

function TaskManager(props) {
    
    const location = useLocation()
    const isLoggedIn = location.state?.loggedIn

    return(
      
            <div>
                {
                  ( isLoggedIn ? <Dashboard/>  : <Signin/> )
                }                                                                   
            </div>
    )
}

export default TaskManager

