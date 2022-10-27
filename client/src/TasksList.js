import React from 'react';

function TasksList(props) {
    const isTaskAvailable = props.tasks.length
    return (
        <div>
            <ul>
            { 
                props.tasks.map((task) =>
                    <div key={task.id}>
                        <ol > {task.id}  
                            <button onClick={ async (event) => {
                                console.log("Show task details for id",task.id)
                                const requestOptions = {
                                    method:'GET',
                                    headers: {'Content-Type': 'application/json'},                                             
                                    mode:'cors'
                                }
                                const taskId = "task.id"
                                const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                const data = await resp.json()
                                if( data.response === "Success" ) {
                                    const taskDetails = data.details
                                    console.log(taskDetails)
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