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

    async function addCategory() {
      let category = prompt("Enter a category")
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
                <div className={ navigationStyles.navigationMain }>
                  <div className={ navigationStyles.dropDown}> 
                    <ul className={ navigationStyles.navigationItems}> 
                       About
                    </ul>
                    <div className= { navigationStyles.dropDownContent } >
                      <p> Developer </p>
                      <hr className= { styles.hrCustom }></hr>
                      <p> Terms of usage </p>
                    </div>
                  </div>
                  <div className={ navigationStyles.dropDown}> 
                    <ul className = { navigationStyles.navigationItems } > 
                      Category 
                    </ul>
                    <div className = {navigationStyles.dropDownContent } >
                      <p onClick={ addCategory }> Add Category </p>
                    </div>
                  </div>
                </div>

                <div className={ styles.heading }>
                  <h1 className={ styles.customH1}> Welcome to TaskManager </h1>
                  <h2 className={ styles.customH2}> Add tasks, track and improve!!</h2>
                </div>
                { loading ? <LoadingSpinner/> : <></>}

                <Tasks     setLoading={setLoading} setTask={setTask} task={task} categories={categories} priorities={Priorities}/>
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
