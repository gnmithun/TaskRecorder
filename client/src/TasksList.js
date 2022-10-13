import React from 'react';

function TasksList(props) {
    const isTaskAvailable = props.tasks.length
    return (
        <div>
            <ul>
            { 
                (isTaskAvailable !== 0 ? (
                    props.tasks.map((task) =>
                    <ol key={task.id}> { task.detail } : { task.category.type} { task.completed ? " - Completed" : " - Pending" } </ol>)
                ) : <label> No tasks found </label> )
            }
            </ul>
        </div>
    );
}

export default TasksList;