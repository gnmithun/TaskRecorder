import React, { useState } from 'react';
import DatedTasks from './DatedTasks';
import moment from 'moment'

const TaskByDate = () => {
    const [ fromDate , setFromDate] = useState()
    const [ toDate, setToDate ] = useState()

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
            <input type="submit" value={ "Get Tasks" } onClick = { (event)=> {
                console.log("Get tasks from " + fromDate + " to " + toDate )
            }}/>
            <DatedTasks/>
        </div>
    );
};


export default TaskByDate