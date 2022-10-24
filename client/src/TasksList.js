import React from 'react';

function TasksList(props) {
    const isTaskAvailable = props.tasks.length
    return (
        <div>
            <ul>
            { 
                props.tasks.map((task) =>
                    <div key={task.id}>
                        <ol > {task.id} { task.detail } : { task.category.type} { task.completed ? " - Completed" : " - Pending" } 
                            <button key={task.id} 
                                    onClick={ async (event) => { 
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
                                        console.log(data)
                                        if ( data.response === "Success" ) {                                                
                                            const deletedTaskDetails = data.details                                                
                                            alert(`Deleted task "${deletedTaskDetails.detail}"`)
                                            props.taskDeleted()
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