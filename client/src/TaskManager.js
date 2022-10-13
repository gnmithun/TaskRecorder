import React, { useState, useEffect } from "react";
import Category from "./Category";
import LoadingSpinner from "./LoadingSpinner";
import Tasks from "./Tasks";
import TasksList from "./TasksList";

function TaskManager(props) {

    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState({})
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState( { detail:"", completed:false, categoryId:0 } )

    useEffect(()=>{
        async function fetchCategories(params) {
          const resp = await fetch("http://localhost:8000/categories")
          const data = await resp.json()
          setCategories(data.details)
    }
        fetchCategories()    
    },[category])

    useEffect(()=>{
        async function fetchTasks(params) {
          const resp = await fetch("http://localhost:8000/tasks")
          const data = await resp.json() 
          setTasks(data.tasks)  
        }
        fetchTasks()    
    },[task])

    return(
            <div>
                <h1> Welcome to TaskManager </h1>
                <h2> Add tasks, track and improve!!</h2>
                { loading ? <LoadingSpinner/> : <></>}
                <Category loading={loading} setLoading={setLoading} setCategory={setCategory} /> 
                <Tasks loading={loading} setLoading={setLoading} setTask={setTask} categories={categories}/>
                <TasksList tasks={tasks === undefined ? [] : tasks } />
            </div>
    )
}

export default TaskManager
