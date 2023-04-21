import React, { useEffect, useState } from "react";
import Signin from "../Access/Signin"
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

function TaskManager(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    
    // useEffect(()=>{
    //   console.log("Rendering Task Manager")
    // },[loggedIn])
    return(
      
            <div>
                {
                  ( setLoggedIn ? <Dashboard setLoggedIn = { setLoggedIn }/>  : <Signin setLoggedIn = { setLoggedIn } /> )
                }
            </div>
    )
}

export default TaskManager

