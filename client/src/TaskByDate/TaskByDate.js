import React, { useState } from 'react';
import DatedTasksList from './DatedTasksList';
import moment from 'moment'
import { customFetch } from '../Common/customFetch';
import useThrowAsyncError from '../Common/asyncErrorHandler';
const TaskByDate = (props) => {
    const [ fromDate , setFromDate] = useState()
    const [ toDate, setToDate ] = useState()
    const [tasks,setTasks] = useState()
    const asyncErrorHandler = useThrowAsyncError()

    function isDisabled () {
        if ( fromDate === undefined || toDate === undefined) {
            return true
        } else {
            return false
        }   
    }

    return (
        <div>
            <label> Show tasks based on dates </label>
            <br/>
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
            <input type="submit" disabled={ isDisabled ()}  onClick = { async (event)=> {
                try {
                    props.setLoading(true)
                    const getDatedTaskEndpoint = "http://localhost:8000/datedTasks?from="+fromDate+'&to='+toDate
                    const resp = await customFetch(getDatedTaskEndpoint, { method:'GET' } )
                    const data = await resp.json()
                    
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
                } catch (error) {
                    asyncErrorHandler(error)
                    props.setLoading(false)
                }
                props.setLoading(false)
            }}/>            
            <DatedTasksList tasks={tasks === undefined ? [] : tasks}/>
        </div>
    );
};


export default TaskByDate