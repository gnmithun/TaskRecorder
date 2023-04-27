import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from '../Access/Signin'
import TaskManager from '../TaskManager/TaskManager'
import Error from '../General/Error'
import Dashboard from '../Dashboard/Dashboard'

const Routing = () => {
   return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/dashboard' element = { <Dashboard/>}></Route>
                    <Route exact path='/signin' element = { <Signin/> }></Route>           
                    <Route exact path='/' element = { <TaskManager/>}></Route>
                    <Route path='*' element = { <Error/>}></Route>
                </Routes>
            </Router>
        </div>
   )
}

export default Routing