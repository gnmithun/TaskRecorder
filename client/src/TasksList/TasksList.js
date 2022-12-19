import React from 'react';
import TaskEditingForm from '../TaskEditing/TaskEditing';
import priority from '../Common/appConst'


function TasksList(props) {
    return (
        <div>
            <ol>
            { 
                props.tasks.map((task) =>
                    <div key={task.id}>
                        <li > 
                            <TaskEditingForm task={task} 
                                         priority={priority} 
                                         categories={props.categories}
                                      taskUpdated={ props.taskUpdated }/>
                            <button onClick={ async (event) => {                                
                                const requestOptions = {
                                    method:'GET',
                                    headers: {'Content-Type': 'application/json'},                                             
                                    mode:'cors'
                                }
                                const taskId = task.id
                                props.setLoading(true)
                                const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                const data = await resp.json()
                                props.setLoading(false)
                                if( data.response === "Success" ) {
                                    const taskDetails = data.details
                                    alert(taskDetails.id + " : " + taskDetails.detail + " is a " + taskDetails.priority
                                    + " priority task of " + taskDetails.category.type + " category ")
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
                                        props.setLoading(true)
                                        const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                        const data = await resp.json()
                                        props.setLoading(false)
                                        if ( data.response === "Success" ) {                                                
                                            const deletedTaskDetails = data.details                                                                                           
                                            props.taskDeleted()
                                            alert(`Deleted task "${deletedTaskDetails.detail}"`)
                                        } else {
                                            alert(data.details)                                        
                                        }   
                                     } } > X 
                            </button>
                        </li>                             
                    </div>
                ) 
            }
            </ol>
        </div>
    );
}

export default TasksList;