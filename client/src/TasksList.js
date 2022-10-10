import React from 'react';

function TasksList(props) {
    return (
        <div>
            <ul>
            { 
                props.data.map((task) => 
                    <ol key={task.id}> { task.detail } </ol>
                )
            }
            </ul>
        </div>
    );
}

export default TasksList;