import React from 'react';
import { useState } from 'react';

function TaskEditingForm(props) {
    const [updatedDetail,setUpdatedDetail]       = useState(props.task.detail)
    const [updatedCompleted,setUpdatedCompleted] = useState(props.task.completed)

    let detail = props.task.detail
    let completed = props.task.completed

    const resetOnFailure = () => {
        setUpdatedDetail(detail)
        setUpdatedCompleted(completed)
    }
    return (
        <div>
            <button onClick={ async (event) => {
                const response = window.confirm("Do you want to update this task?")
                if ( response === false) {
                    resetOnFailure()
                    return
                }
                const requestOptions = {
                    method:'PATCH',
                    headers: {'Content-Type': 'application/json'},  
                    body: JSON.stringify( { detail:updatedDetail, completed:updatedCompleted } ),                                           
                    mode:'cors'
                }
                const taskId = props.task.id
                const resp = await fetch('http://localhost:8000/task/'+taskId,requestOptions)
                const data = await resp.json()
                if ( data.response === "Success" ) {
                    alert("Update successfull")
                } else {
                    resetOnFailure()
                    alert(data.details)
                }

            }}> U </button>

            <input type="text" value={updatedDetail} onChange={ (event) => setUpdatedDetail(event.target.value) }/>

            <input type="checkbox" checked={updatedCompleted} onChange = { (event) =>  setUpdatedCompleted(event.target.checked) }/>

        </div>
    );
}

export default TaskEditingForm;