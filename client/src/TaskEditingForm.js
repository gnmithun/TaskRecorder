import React from 'react';

function TaskEditingForm(props) {
    return (
        <div>
            <h1> Show task editing form for {props.task.detail}</h1>
        </div>
    );
}

export default TaskEditingForm;