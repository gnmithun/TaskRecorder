import React, { useState, useEffect } from "react";
import Category from "./Category";
import LoadingSpinner from "./LoadingSpinner";
import Tasks from "./Tasks";

function TaskManager(props) {

    const [loading,setLoading] = useState(false)
    const [tasks,setTasks] = useState([])
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState({})

    useEffect(()=>{
        async function fetchCategories(params) {
            const resp = await fetch("http://localhost:8000/categories")
            const data = await resp.json() 
            console.log(category.type)
            setCategories(data.details)  
            console.log(categories)
    }
        fetchCategories()    
    },[])

    // useEffect(()=>{
    //     async function fetchTasks(params) {
    //       const resp = await fetch("http://localhost:8000/tasks")
    //       const data = await resp.json() 
    //       setTasks(data.details)     
    //     }
    //     fetchTasks()    
    // },[])

    return(
            <div>
                <h1> Welcome to TaskManager </h1>
                <h2> Add tasks, track and improve!!</h2>
                { loading ? <LoadingSpinner/> : <></>}
                <Category setCategory={setCategory}></Category>
                {/* <Tasks loading={loading} setLoading={setLoading}  categories={categories}/> */}
            </div>
    )
}

export default TaskManager
