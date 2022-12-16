import { useEffect, useState } from "react";

const PriorityTaskList = (props) => {
    //Create a form with drop down of priority
    //Select a priority, submit
    //Fetch tasks with those priority
    //List the tasks
    const [priorities,setPriorities]  = useState([])
    const [priority,setPriority] = useState("HIGH")

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
    
    const isSubmitDisabled = () => {
        return false
    }

    const getTasksWithSelectedPriority = (event) => {
        alert(priority)
    }
    return(
        <div>
            <form onSubmit={getTasksWithSelectedPriority}>
                <label> Priorities </label>
                <br/>
                <select onChange={ (event) => { setPriority(event.target.value) } } value={priority}>
                    { priorities.map( (priority,index) =>   <option key={index}> {priority}  </option> ) } 
                </select>
                <input type="submit" value={"Submit"} disabled={isSubmitDisabled()}/>
            </form>
        </div>
    )
}

export default PriorityTaskList 