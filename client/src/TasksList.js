import React from 'react';

function TasksList(props) {
    const isTaskAvailable = props.tasks.length
    return (
        <div>
            <ul>
            { 
                props.tasks.map((task) =>
                <ol key={task.id}> { task.detail } : { task.category.type} { task.completed ? " - Completed" : " - Pending" } </ol>)                
            }
            </ul>
        </div>
    );
}

export default TasksList;