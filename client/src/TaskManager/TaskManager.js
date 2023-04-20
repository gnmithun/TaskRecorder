import React, { useState } from "react";
import Signin from "../Access/Signin"
import Dashboard from "../Dashboard/Dashboard";

function TaskManager(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    
    return(
      
            <div>
                {
                  ( loggedIn ? <Dashboard setLoggedIn = { setLoggedIn }/>  : <Signin setLoggedIn = { setLoggedIn } /> )
                }
            </div>
    )
}

export default TaskManager

