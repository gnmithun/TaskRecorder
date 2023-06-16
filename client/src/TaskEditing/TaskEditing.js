import React from 'react';
import { useState } from 'react';
import styles from './TaskEditing.module.css'
import { customFetch } from '../Common/customFetch';
import useThrowAsyncError from '../Common/asyncErrorHandler';
import Select from 'react-select'

function TaskEditingForm(props) {
    const [updatedDetail,setUpdatedDetail]       = useState(props.task.detail)
    const [updatedCompleted,setUpdatedCompleted] = useState(props.task.completed)
    const [updatedPriority,setUpdatedPriority]   = useState(props.task.priority)
    const [updatedCategory,setUpdatedCategory]   = useState(props.task.category)    


    const asyncErrorHandler = useThrowAsyncError()
    const resetOnFailure = () => {
            setUpdatedDetail(props.task.detail)
            setUpdatedPriority(props.task.priority)
            setUpdatedCompleted(props.task.completed)
            setUpdatedCategory(props.task.category)    
    }

    let selectOptionsPriorities = []
    let selectOptionsCategories = []
    
    props.priority.map((priority)=>{
        selectOptionsPriorities.push({
             label: priority
        })
    })

    props.categories.map((category)=>{
        selectOptionsCategories.push({
             label : category.type,
             value : category
        })
    })


    return (
        
        <div className= {styles.taskEditingContainer}>
            <input type="label" className={ styles.tasksDetailsItemName } value={updatedDetail} onChange={ (event) => setUpdatedDetail(event.target.value) }/>

            <Select name='priority' className = { styles.tasksDetailsItem }
                    getOptionValue={ option =>  option.label }
                    onChange={ (event) => {
                        try {
                            const updatedPriority = selectOptionsPriorities.find( priority => priority.label === event.label)                            
                            setUpdatedPriority(updatedPriority.label)                             
                        } catch (error) {
                            asyncErrorHandler(error)
                        }
                    }}
                    value={{label:updatedPriority}}
                    options={selectOptionsPriorities} >                    
                    {   
                    selectOptionsPriorities.map( (priority,index) => <option key={index} > {priority.label} </option> )
                    }                    
            </Select>

            <Select name="category" className = { styles.tasksDetailsItem }
                    onChange={ (event)=> { 
                        try {                         
                            const selectedCategory = selectOptionsCategories.find( category => category.label === event.label)                                                      
                            setUpdatedCategory(selectedCategory.value) 
                        } catch (error) {
                            asyncErrorHandler(error)
                        }
                    }}
                    value={{label:updatedCategory.type}} 
                    options = { selectOptionsCategories } 
                    >   
                    { selectOptionsCategories.map((category,index) => <option key={index} >{category.label} </option>) }
            </Select>

            <button onClick={ async (event) => {
                try {
                    const response = window.confirm("Do you want to update this task?")
                    if ( response === false) {
                        resetOnFailure()
                        return
                    }
    
                    const taskId = props.task.id
                    const getTaskEndpoint = 'http://localhost:8000/task/'+taskId
                    const getTaskPayload = JSON.stringify( { detail:updatedDetail, completed:updatedCompleted,
                        categoryId:updatedCategory.id,priority:updatedPriority } )      
                    
                    const resp = await customFetch(getTaskEndpoint,{ method:'PATCH', body : getTaskPayload })
                    const data = await resp.json()
                    if ( data.response === "Success" ) {
                        alert("Update successfull")
                        props.taskUpdated()
                    } else {
                        resetOnFailure()
                        alert(data.details)
                    }
                } catch (error) {
                    asyncErrorHandler(error)
                }


            }} className = { styles.tasksDetailsItem }> Update </button>

            <input type="checkbox" checked={updatedCompleted} onChange = {                 
                    (event) =>  { 
                        try { 
                            setUpdatedCompleted(event.target.checked) 
                        } catch (error) {
                            asyncErrorHandler(error)
            }} }/>
        </div>

    );
}

export default TaskEditingForm;