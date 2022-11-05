import React from 'react';
import TaskEditingForm from './TaskEditingForm';

function TasksList(props) {
    return (
        <div>
            <ul>
            { 
                props.tasks.map((task) =>
                    <div key={task.id}>
                        
                        <ol > <TaskEditingForm task={task}/>
                            <button onClick={ async (event) => {                                
                                const requestOptions = {
                                    method:'GET',
                                    headers: {'Content-Type': 'application/json'},                                             
                                    mode:'cors'
                                }
                                const taskId = task.id
                                const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                const data = await resp.json()
                                if( data.response === "Success" ) {
                                    const taskDetails = data.details
                                    alert(taskDetails.id + " : " + taskDetails.detail + " : " + taskDetails.category.type)
                                } else {
                                    alert(data.details)
                                }
                            }}> Details
                            </button>
                            <button onClick={ async (event) => { 
                                        const response = window.confirm("Do you want to delete this task?")
                                        if ( response === false ) {
                                            return
                                        }
                                        const requestOptions = {
                                            method:'DELETE',
                                            headers: {'Content-Type': 'application/json'},                                             
                                            mode:'cors'
                                        }
                                        const taskId = task.id
                                        const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                        const data = await resp.json()
                                        
                                        if ( data.response === "Success" ) {                                                
                                            const deletedTaskDetails = data.details                                                                                           
                                            props.taskDeleted()
                                            alert(`Deleted task "${deletedTaskDetails.detail}"`)
                                        } else {
                                            alert(data.details)                                        
                                        }   
                                     } } > X </button>
                        </ol>                             
                    </div>
                ) 
            }
            </ul>
        </div>
    );
}

export default TasksList;