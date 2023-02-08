import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Tasks from "../Tasks/Tasks";
import TasksList from "../TasksList/TasksList";
import TaskByDate from "../TaskByDate/TaskByDate";
import PriorityTaskList from "../TaskByPriority/TaskByPriority"
import Constants from "../Common/appConst"
import styles from './TaskManager.module.css'
import NavBar from "../Navigation/NavBar";
import Heading from "../Heading/Heading";

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

    const customFetchTasks = async (day) => {
      setLoading(true)

      const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' },
        mode:'cors'
      }
      const resp = await fetch("http://localhost:8000/tasksFor?day="+day,requestOptions)
      const data = await resp.json() 

      if (data.response === "Success"){
        if ( data.details.length === 0 ) {
          alert("No tasks found")
          setTasks([])
          setLoading(false)
          return
        }
        setTasks(data.details)  
      } else {
        alert(data.details)
      }  
      setLoading(false)
    }
    return(
              <div>
                <NavBar setCategory={setCategory}/>
                <Heading/>
                { loading ? <LoadingSpinner/> : <></>}
                <Tasks     setLoading={setLoading} setTask={setTask} task={task} categories={categories} priorities={Constants.priorities}/>
                <TasksList setLoading={setLoading} categories={categories} customFetchTasks={customFetchTasks}
                           tasks={tasks === undefined ? [] : tasks } taskDeleted={ () => setTask({}) } taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                           />
                {/* <TaskByDate setLoading={setLoading}/>
                <PriorityTaskList setLoading={setLoading}/> */}
            </div>
    )
}

export default TaskManager
