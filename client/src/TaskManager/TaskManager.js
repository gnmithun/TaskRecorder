import { Navigate, useLocation } from "react-router-dom";

function TaskManager(props) {
    
    const location = useLocation()
    const isLoggedIn = location.state?.loggedIn

    const gotoDashboard = ()=>{
      return (<Navigate to="/dashboard" state={{ loggedIn:isLoggedIn}}/>)
    }

    const gotoSignin = ()=>{
      return (<Navigate to="/signin"/>)
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

