import React from 'react';
import { useState } from 'react';

function TaskEditingForm(props) {
    const [edit,setEdit]  = useState(true)
    const [tempDetail,setTempDetail] = useState(props.task.detail)
    const [tempChecked,setTempChecked] = useState(props.task.completed)

    return (
        <div>
            <button onClick={ (event) => {
                setEdit(!edit)
            }}> U </button>

            <input type="text" value={tempDetail} readOnly = { edit } onChange={ (event) => {
                setTempDetail(event.target.value) 
            }}/>

            <input type="checkbox" checked={tempChecked} disabled = { edit } onChange = { (event) => {
                setTempChecked(event.target.checked)
                console.log(event.target.checked)
            }}/>

        </div>
    );
}

export default TaskEditingForm;