import React from 'react';
import { useState } from 'react';
import styles from './TaskEditing.module.css'

function TaskEditingForm(props) {
    const [updatedDetail,setUpdatedDetail]       = useState(props.task.detail)
    const [updatedCompleted,setUpdatedCompleted] = useState(props.task.completed)
    const [updatedPriority,setUpdatedPriority]   = useState(props.task.priority)
    const [updatedCategory,setUpdatedCategory]   = useState(props.task.category)    

    const resetOnFailure = () => {
        setUpdatedDetail(props.task.detail)
        setUpdatedPriority(props.task.priority)
        setUpdatedCompleted(props.task.completed)
        setUpdatedCategory(props.task.category)
    }
    return (
        
        <div className= {styles.taskEditingContainer}>
            <input type="text" className={ styles.tasksDetailsItemName } value={updatedDetail} onChange={ (event) => setUpdatedDetail(event.target.value) }/>

            <select name='priority' className = { styles.tasksDetailsItem }
                    onChange={ (event) => {
                        const updatedPriority = props.priority.find( priority => priority === event.target.value)
                        setUpdatedPriority(updatedPriority)
                    }}
                    value={updatedPriority}                 
                    >                    
                    { props.priority.map( (priority,index) => 
                         <option key={index} > {priority} </option>
                    ) }                    
            </select>

            <select name="category" className = { styles.tasksDetailsItem }
                    onChange={ (event)=> { 
                        const selectedCategory = props.categories.find( category => category.type === event.target.value)                        
                        setUpdatedCategory(selectedCategory )
                    }} value = { updatedCategory.type } >
                      
                    { props.categories.map((category,index) => <option key={index} >{category.type} </option>) }
            </select>

            <button onClick={ async (event) => {
                const response = window.confirm("Do you want to update this task?")
                if ( response === false) {
                    resetOnFailure()
                    return
                }
                const requestOptions = {
                    method:'PATCH',
                    headers: {'Content-Type': 'application/json'},  
                    body: JSON.stringify( { detail:updatedDetail, completed:updatedCompleted,
                       categoryId:updatedCategory.id,priority:updatedPriority } ),  
                       credentials:"include",                                         
                    mode:'cors'
                }
                const taskId = props.task.id
                const resp = await fetch('http://localhost:8000/task/'+taskId,requestOptions)
                const data = await resp.json()
                if ( data.response === "Success" ) {
                    alert("Update successfull")
                    props.taskUpdated()
                } else {
                    resetOnFailure()
                    alert(data.details)
                }

            }} className = { styles.tasksDetailsItem }> Update </button>

            <input type="checkbox" checked={updatedCompleted} onChange = { (event) =>  setUpdatedCompleted(event.target.checked) }/>
        </div>

    );
}

export default TaskEditingForm;