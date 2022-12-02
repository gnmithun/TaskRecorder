import React, { useState, useEffect } from "react";
import Category from "./Category";
import LoadingSpinner from "./LoadingSpinner";
import Tasks from "./Tasks";
import TasksList from "./TasksList";
import TaskByDate from "./TaskByDate";

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
            if ( data.categories.length === 0) {
              return
            }
            setCategories(data.categories) 
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
                <h1> Welcome to TaskManager </h1>
                <h2> Add tasks, track and improve!!</h2>
                { loading ? <LoadingSpinner/> : <></>}
                <Category  setLoading={setLoading} setCategory={setCategory} /> 
                <Tasks     setLoading={setLoading} setTask={setTask} 
                                                      task={task} 
                                                categories={categories} 
                                                priorities={["HIGH","MEDIUM","LOW"]}/>
                <TasksList setLoading={setLoading} 
                           categories={categories} 
                           tasks={tasks === undefined ? [] : tasks } 
                           taskDeleted={ () => setTask({}) }
                           taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                           />
                <TaskByDate/>
            </div>
    )
}

export default TaskManager
