import Heading from "../Heading/Heading"
import NavBar from "../Navigation/NavBar"
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Tasks from "../Tasks/Tasks";
import Constants from "../Common/appConst"
import TasksList from "../TasksList/TasksList";
import TaskByDate from "../TaskByDate/TaskByDate";
import PriorityTaskList from "../TaskByPriority/TaskByPriority"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = (props) => {

    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState({})
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState( { detail:"", completed:false, categoryId:0 } )
    const navigate = useNavigate()


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
          const requestOptionsForGetTasks = {
            method:'GET',
            headers:{ 'Content-Type' : 'application/json' },
            credentials:"include",
            mode:'cors'
        }
          const resp = await fetch("http://localhost:8000/tasks",requestOptionsForGetTasks)
          const data = await resp.json() 
          setLoading(false)
          if (data.response === "Success"){
            if ( data.details === "Unauthorized"){
              alert("Unauthorized: Please sign in")
              return
            }
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

    async function customFetch(fetcher,param){
        setLoading(true)
        const data = await fetcher.getTasksWith(param)
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

    async function signout(event){
      event.preventDefault()
      const requestOptions = {
        method:'POST',
        credentials:"include",
        mode:'cors'
      }
      await fetch('http://localhost:8000/signout',requestOptions)    
      props.setLoggedIn(false)
      navigate('/signin')      
    }

    async function addCategory() {
      let category = prompt("Enter a category")
      if (category === null) {
        return
      }
      const options = { method : 'POST', mode:'cors', body:JSON.stringify({"category":category}), headers:{'Content-Type':'application/json'}}
      setLoading(true)
      const resp = await fetch("http://localhost:8000/category",options)
      const data = await resp.json()
      setLoading(false)
      if (data.response === "Success"){
        setCategory({ id:data.details.id , type:data.details.type })      
      } else {
        alert(data.details)
      }
    }

    return(
        <div>
        <NavBar setCategory={category} signout = {signout} addCategory={addCategory}/>
        <Heading/>
        { loading ? <LoadingSpinner/> : <></>}
        <Tasks      setLoading={setLoading} 
                           setTask={setTask} 
                           task={task} 
                           categories={categories} 
                           priorities={Constants.priorities}/>
        <TasksList setLoading={setLoading} 
                           categories={categories}  
                           customFetch = { customFetch }
                           tasks={tasks === undefined ? [] : tasks } 
                           taskDeleted={ () => setTask({}) } 
                           taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                           />
        {/* <TaskByDate setLoading={setLoading}/>
        <PriorityTaskList setLoading={setLoading}/>  */}
        </div>
        
    )
}

export default Dashboard




/*
                <NavBar setCategory={setCategory}/>
                <Heading/>
                { loading ? <LoadingSpinner/> : <></>}
                <Tasks     setLoading={setLoading} 
                           setTask={setTask} 
                           task={task} 
                           categories={categories} 
                           priorities={Constants.priorities}/>
                <TasksList setLoading={setLoading} 
                           categories={categories}  
                           customFetch = { customFetch }
                           tasks={tasks === undefined ? [] : tasks } 
                           taskDeleted={ () => setTask({}) } 
                           taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                           />
                {/* <TaskByDate setLoading={setLoading}/>
                <PriorityTaskList setLoading={setLoading}/> }
*/