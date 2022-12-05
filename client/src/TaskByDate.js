import React, { useState } from 'react';
import DatedTasksList from './DatedTasksList';
import moment from 'moment'

const TaskByDate = (props) => {
    const [ fromDate , setFromDate] = useState()
    const [ toDate, setToDate ] = useState()
    const [tasks,setTasks] = useState()
    
    function isDisabled () {
        return false
    }

    return (
        <div>
            <h6> Show tasks based on dates </h6>
            <label> From </label>
            <input type="date" onChange={ (event) => {
                setFromDate(moment(new Date(event.target.value)).format("DD-MM-YYYY"))                
            }}></input>
            <br/>
            <label> To </label>
            <input type="date" onChange={ (event) => {
                setToDate(moment(new Date(event.target.value)).format("DD-MM-YYYY"))
            }}></input>
            <br/>
            <input type="submit" disabled={ isDisabled ()} enavalue={ "Get Tasks" } onClick = { async (event)=> {

                if ( !fromDate ) {
                    alert("Please select a valid starting date")
                    return
                }
                if ( !toDate ) {
                    alert("Please select a valid end date")
                    return
                }
                
                props.setLoading(true)
                const requestOptions = {
                    method:'GET',
                    headers: {'Content-Type': 'application/json'}, 
                    mode:'cors',
                }
                const resp = await fetch("http://localhost:8000/datedTasks?from="+fromDate+'&to='+toDate,requestOptions)
                const data = await resp.json()
                console.log(data)
                if ( data.response === 'Success') {
                    if ( data.details.length === 0 ) {
                        alert("No tasks found")
                        setTasks([])
                        props.setLoading(false)
                        return
                      }
                    setTasks(data.details)                    
                } else {
                    alert(data.details)
                }             
                props.setLoading(false)
            }}/>            
            <DatedTasksList tasks={tasks === undefined ? [] : tasks}/>
        </div>
    );
};


export default TaskByDate