import React, { useState, useEffect } from "react";
import Category from "../Category/Category";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Tasks from "../Tasks/Tasks";
import TasksList from "../TasksList/TasksList";
import TaskByDate from "../TaskByDate/TaskByDate";
import PriorityTaskList from "../TaskByPriority/TaskByPriority"
import Priorities from "../Common/appConst"
import styles from './TaskManager.module.css'
import navigationStyles from './Navigation.module.css'
function TaskManager(props) {

    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState({})
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState( { detail:"", completed:false, categoryId:0 } )

    useEffect(()=>{
        async function fetchCategories(params) {
          setLoading(true)
          const resp = await fetch("http://localhost:8000/categories")
          const data = await resp.json()
          setLoading(false)
          if (data.response === "Success") {          
            if ( data.details.length === 0) {
              return
            }
            setCategories(data.details) 
        } else {
            alert(data.details)            
        }
    }
        fetchCategories()    
    },[category])

    useEffect(()=>{
        async function fetchTasks(params) {
          setLoading(true)
          const resp = await fetch("http://localhost:8000/tasks")
          const data = await resp.json() 
          setLoading(false)
          if (data.response === "Success"){
            if ( data.details.length === 0 ) {
              alert("No tasks found")
              setTasks([])
              return
            }
            setTasks(data.details)  
          } else {
            alert(data.details)
          }  

        }
        fetchTasks()    
    },[task])

    return(
            <div>
              <div className={ navigationStyles.navigationMain }>
                <div className={ navigationStyles.dropDown}> 
                  <li className={ navigationStyles.navigationItems}> <a href="https://www.google.com"> About </a></li>
                  <div className= { navigationStyles.dropDownContent } >
                    <p> Developer </p>
                    <p> Terms of usage </p>
                </div>
                </div>

                  {/* <li className={ navigationStyles.navigationItems}> <a href="https://www.google.com"> Reports </a> </li>
                  <li className={ navigationStyles.navigationItems}> <a href="https://www.google.com"> Category </a></li> */}
              </div>

                <div className={ styles.heading }>
                  <h1> Welcome to TaskManager </h1>
                  <h2> Add tasks, track and improve!!</h2>
                </div>
                { loading ? <LoadingSpinner/> : <></>}
                <Category  setLoading={setLoading} setCategory={setCategory} /> 
                <Tasks     setLoading={setLoading} setTask={setTask} 
                                                      task={task} 
                                                categories={categories} 
                                                priorities={Priorities}/>
                <TasksList setLoading={setLoading} 
                           categories={categories} 
                           tasks={tasks === undefined ? [] : tasks } 
                           taskDeleted={ () => setTask({}) }
                           taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                           />
                <TaskByDate setLoading={setLoading}/>
                <PriorityTaskList setLoading={setLoading}/>
            </div>
    )
}

export default TaskManager
