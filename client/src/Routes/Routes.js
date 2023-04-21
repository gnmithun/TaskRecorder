import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from '../Access/Signup'
import Signin from '../Access/Signin'
import TaskManager from '../TaskManager/TaskManager'
const Routing = () => {
   return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/dashboard' element = { <TaskManager/>}></Route>
                    <Route exact path='/signup' element = { <Signup/> }></Route>
                    <Route exact path='/signin' element = { <Signin/> }></Route>           
                    <Route exact path='/' element = { <TaskManager/>}></Route>
                </Routes>
            </Router>
        </div>
   )
}

export default Routing