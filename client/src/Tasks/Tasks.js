
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Tasks.module.css"
import { customFetch } from '../Common/customFetch';
import useThrowAsyncError from '../Common/asyncErrorHandler';
import Constants from "../Common/appConst"

function Tasks(props) {

    const [inputTask,setInputTask] = useState( { detail:"", completed:false, categoryId: 0, priority:"HIGH" } )
    const navigateTo = useNavigate()
    const asyncErrorHandler = useThrowAsyncError()

    let selectOptionsPriorities = []
    let selectOptionsCategories = []
    
    Constants.priorities.map((priority)=>{
        return selectOptionsPriorities.push({
            priority
        })
    })

    props.categories.map((category)=>{
        return selectOptionsCategories.push({
            category
        })
    })


    function isSubmitEnabled(){
        return props.loading ? false : (inputTask.detail === "" ? false : true)
    }

    async function addTask(event){
        try {
            event.preventDefault()

            /*This is a corner case where there are no categories*/
            if(props.categories.length === 0) {
                alert("Please add some categories and select one to add tasks")
                return
            } 
    
            props.setLoading(true)
            const createTaskPayload = JSON.stringify({
                detail:inputTask.detail, 
                                    completed:inputTask.completed,
                                    categoryId:inputTask.categoryId, 
                                    priority:inputTask.priority
            })
            const resp = await customFetch('http://localhost:8000/tasks',{ method : 'POST', body:createTaskPayload} )
            const data = await resp.json()
            props.setLoading(false)
            if (data.response === "Success") {
                const newTask = data.details
                props.setTask(newTask)            
                setInputTask(inputTask => ( {...inputTask,detail : "", completed : false} ) )    
            } else {
                alert(data.details)
            }
    
        } catch (error) {
            asyncErrorHandler(error)
        }
    }

    useEffect(() => {
        /* The default state of inputTask.categoryId is 0. Cause by default there are no categories. The user has to add them
           After the user adds the first category, the select component still does not update, so we explicitly fetch the 0th
           category i.e the newly added category and set its id to the default category id
         */
        try {
            if(inputTask.categoryId === 0 && props.categories.length > 0) {
                const category = props.categories[0]
                setInputTask(inputTask => ( { ...inputTask,categoryId : category.id } ) )
            }    
        } catch (error) {
            asyncErrorHandler(error)
        }
    },[props.categories])

    try {
        return (
            <div>          
                <form onSubmit={addTask}>
                    <div className ={styles.taskContainer}>
                        <input type="search"
                            className= { styles.inputBox }
                            value={ inputTask.detail }              
                            placeholder='Whats next?' 
                            disabled = { props.loading ? true : false }
                            name='detail' 
                            onChange={ (event) => { setInputTask(inputTask => ( {...inputTask,detail : event.target.value } ) ) }}
/>                    
                        <div className={styles.taskSubContainer}>
                            <input type="submit" value="Submit" className = {
                                isSubmitEnabled() ? styles.taskSubContainerSubmitDisabled : styles.taskSubContainerSubmitEnabled } 
                            disabled = { !isSubmitEnabled() }/>

                            <div className={styles.tasksDetailsItem}>
                                <select onChange={ (event) => setInputTask(inputTask => ( { ...inputTask,priority:event.target.value})) }>
                                  { selectOptionsPriorities.map ((value,index) =>  <option key={index}> { value.priority } </option> ) }
                                </select>
                                <br/>
                                <select
                                 onChange={ (event) => {

                                  const selectedCategory = selectOptionsCategories.find( value => value.category.type === event.target.value)                                                                                             
                                  const categoryId = selectedCategory.category.id                                                                                                                                       
                                  setInputTask(inputTask => ( { ...inputTask,categoryId : categoryId } ) )
                                 }}>                                
                                  { selectOptionsCategories.map( (value,index) =>   <option key={index}>   { value.category.type }  </option> ) } 
                                </select>                                
                            </div>


                        </div>
                    </div>   
                </form>           
            </div>
        );
    } catch (error){

        navigateTo('/signin')
    } 


}

export default Tasks;

