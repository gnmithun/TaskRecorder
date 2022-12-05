import React from 'react';
const moment = require('moment')

function DatedTaskList (props){
    return (
                <div>
                    <ul>
                    { props.tasks.map((task)=>{
                       
                        return(
                            <div key={task.id}>
                                <li> { task.id + " : " + task.detail + " is a " + task.priority 
                                + " priority task, created on " + formatDate(task.createdAt) 
                                + " and is of " + task.category.type + " category "} </li>
                            </div>)
                        })} 
                    </ul> 
                </div>
    );
};

function formatDate(date){
    const fromDate = new Date(moment(date))
    return moment(fromDate,'DD-MM-YYYY').format("DD-MM-YYYY")
}

export default DatedTaskList