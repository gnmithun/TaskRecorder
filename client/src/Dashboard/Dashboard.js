import Heading from "../Heading/Heading"
import NavBar from "../Navigation/NavBar"
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Tasks from "../Tasks/Tasks";
import Constants from "../Common/appConst"
import TasksList from "../TasksList/TasksList";
import TaskByDate from "../TaskByDate/TaskByDate";
import PriorityTaskList from "../TaskByPriority/TaskByPriority"
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { customFetch } from "../Common/customFetch";
import useThrowAsyncError from "../Common/asyncErrorHandler";
import "./Dashboard.css"
const Dashboard = (props) => {
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState({})
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState( { detail:"", completed:false, categoryId:0 } )
    const location = useLocation()
    const isLoggedIn = location.state?.loggedIn
    const navigateTo = useNavigate()
    const asyncErrorHandler = useThrowAsyncError()



    useEffect(()=>{
        try {
          fetchCategories() 
        } catch (error) {
          asyncErrorHandler(error)
        }    
    },[category])

    useEffect(()=>{
        try{
          fetchTasks()
        } catch( error) {
          asyncErrorHandler(error)
        }  
    },[task])

    useEffect(()=>{
      if(!isLoggedIn){
        alert("Unauthorized! Please signin in first!!!")
        return navigateTo("/signin")
      }
    },[])

    const handleAuthorisedError = (resp)=>{
      if(resp.status === 401) {
        navigateTo('/signin', { state : { logged : false }})
        localStorage.setItem("loggedIn","no")
      } else {

      }
    }
    
    async function fetchTasks(params) {
      if (isLoggedIn === true) {
        setLoading(true)
        const resp = await customFetch("http://localhost:8000/tasks",{ method:'GET' })
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
          handleAuthorisedError(resp)
        }  
      }
    }

    async function fetchCategories(params) {
      if (isLoggedIn === true) {
        setLoading(true)
        const resp = await customFetch("http://localhost:8000/categories",{ method:'GET'})
        const data = await resp.json()
        setLoading(false)
        if (data.response === "Success") {          
          if ( data.details.length === 0) {
            return
          }
          setCategories(data.details) 
        } else {
          handleAuthorisedError(resp)      
        }
      }
    } 

    async function getTasksWithFilter(fetcher,param){
        try{
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
        } catch(error) {
          asyncErrorHandler(error)
        }

    }

    async function signout(event){
      try {
        const resp = await customFetch('http://localhost:8000/signout',{ method : 'POST'}) 
        const data = await resp.json()
        if (data.response === "Success"){
          navigateTo('/signin', { state : { logged : false }})
          localStorage.setItem("loggedIn","no")
        } else {
          alert(data.details)
        }  
      } catch (error) {
        asyncErrorHandler(error)
      }
    }

    async function addCategory() {
      try {
        let category = prompt("Enter a category")
        if (category === null) {
          return
        }
        const categoryType = JSON.stringify({"category":category})
        setLoading(true)
        const resp = await customFetch("http://localhost:8000/category",{ method:'POST', body:categoryType })
        const data = await resp.json() 
        setLoading(false)
        if (data.response === "Success"){
          setCategory({ id:data.details.id , type:data.details.type })      
        } else {
          handleAuthorisedError(resp)
        }
      } catch (error) {
        asyncErrorHandler(error)
      }

    }

    function showDashboard(){   
      if (isLoggedIn){
       return(
        <div className="dashboardContainer">
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
                            getTasksWithFilter = { getTasksWithFilter }
                            tasks={tasks === undefined ? [] : tasks } 
                            taskDeleted={ () => setTask({}) } 
                            taskUpdated={ () => setTask({}) } //How to fetch only the updated task
                            />
          {/* <TaskByDate setLoading={setLoading}/>
          <PriorityTaskList setLoading={setLoading}/>  */}
          </div>
       ) 
      } 
    }

    return(showDashboard())
}

export default Dashboard





