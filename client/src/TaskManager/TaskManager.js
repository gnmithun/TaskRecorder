import { useNavigate, useLocation } from "react-router-dom";


function TaskManager(props) {
    
    const location = useLocation()
    const isLoggedIn = location.state?.loggedIn
    const navigateTo = useNavigate()
    
    const gotoDashboard = ()=>{
      return navigateTo("/dashboard", { state : { loggedIn:isLoggedIn}})
    }

    const gotoSignin = ()=>{
      return navigateTo("/signin")
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

