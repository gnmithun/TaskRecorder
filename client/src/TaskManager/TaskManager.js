import React, { useState, useEffect } from "react";
import Category from "../Category/Category";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Tasks from "../Tasks/Tasks";
import TasksList from "../TasksList/TasksList";
import TaskByDate from "../TaskByDate/TaskByDate";
import PriorityTaskList from "../TaskByPriority/TaskByPriority"
import Priorities from "../Common/appConst"
import styles from '../TasksList/TasksList.module.css'

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
                <h1 className={styles.title}> Welcome to TaskManager </h1>
                <h2 className={styles.title}> Add tasks, track and improve!!</h2>
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