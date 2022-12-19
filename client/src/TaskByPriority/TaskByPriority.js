import { useEffect, useState } from "react";
import DatedTasksList from "../DatedTasksList"

const PriorityTaskList = (props) => {
    //List the tasks
    const [priorities,setPriorities]  = useState([])
    const [priority,setPriority] = useState("HIGH")
    const [tasks,setTasks] = useState([])
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

    const getTasksWithSelectedPriority = async (event) => {
        
        const requestOptions = {
            method:"GET",
            headers:{ "Content-Type" : "application/json" },
            mode:'cors'
        }
            props.setLoading(true)
            const response = await fetch('http://localhost:8000/priority/'+priority,requestOptions)
            const data = await response.json()

            if ( data.response === 'Success') {
                if(data.details.length === 0){
                    alert("No tasks found")
                    setTasks([])
                    props.setLoading(false)
                    return
                }
                setTasks(data.details)
                props.setLoading(false)
            }else{
                alert(data.details)
                props.setLoading(true)
            }
}
    return(
        <div>
            {/* <form onSubmit={getTasksWithSelectedPriority}> */}
                <label> Priorities </label>
                <br/>
                <select onChange={ (event) => { setPriority(event.target.value) } } value={priority}>
                    { priorities.map( (priority,index) =>   <option key={index}> {priority}  </option> ) } 
                </select>
                <br/>
                <input type="submit" value={"Submit"} disabled={isSubmitDisabled()} onClick = { getTasksWithSelectedPriority } onSubmit = {getTasksWithSelectedPriority}/>
                <DatedTasksList tasks={tasks === undefined ? [] : tasks}/>
            {/* </form> */}
        </div>
    )
}

export default PriorityTaskList 