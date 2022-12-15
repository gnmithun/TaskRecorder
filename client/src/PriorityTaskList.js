import React, { useEffect, useState } from "react";

const PriorityTaskList = (props) => {
    //Create a form with drop down of priority
    //Select a priority, submit
    //Fetch tasks with those priority
    //List the tasks
    const [priorities,setPriorities]  = useState([])

    useEffect(() => {
        async function getPriorities(){            
            const response = await fetch('http://localhost:8000/priorities')
            const data = await response.json()
            if ( data.response === 'Success') {
                setPriorities(data.details.priority)
            } else {
                alert(data.details)
            }
        }
        getPriorities()
    },[])

    const getTasksWithPriority = ((priority) => {

    })
    
    return(
        <h1> Tasks with priority </h1>
    )
}

export default PriorityTaskList 