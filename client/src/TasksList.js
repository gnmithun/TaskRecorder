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

                                        const requestOptions = {
                                            method:'DELETE',
                                            headers: {'Content-Type': 'application/json'},                                             
                                            mode:'cors'
                                        }
                                        const taskId = task.id
                                        const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                        const data = await resp.json()
                                        props.taskDeleted()
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