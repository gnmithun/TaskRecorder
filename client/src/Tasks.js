
import React, {useState } from 'react';
import TasksList from './TasksList';
import LoadingSpinner from "./LoadingSpinner";

function Tasks(props) {

    const onChange = (event) => { 
        setTask(task => ( {...task,[event.target.name] : event.target.value } ) ) 
    }

    const [loading,setLoading] = useState(false)
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState({
        detail:"",
        completed:false
    })

    async function addTask(event){
        event.preventDefault()

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ detail:task.detail, completed:task.completed,categoryId:2}),
            mode:'cors',
        }

        setLoading(true)
        const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        const data = await resp.json()
        const newTask = data.details
        setTask(newTask)
        setTasks(tasks => [...tasks,newTask])
        setLoading(false)
    }

    return (
        <div>
            { loading ? <LoadingSpinner/> : <></>}
            <form onSubmit={addTask}>
                <input  type="text" 
                        value={ task.detail }                        
                        placeholder='What do you want today?' 
                        disabled = { loading ? true : false }
                        name='detail' 
                        onChange={ onChange }/>

                <input type="checkbox" 
                       value={ task.completed }
                       disabled = { loading ? true : false }
                        name='completed' 
                    onChange={ (event) => { 
                            setTask(task => ( {...task,completed :  event.target.checked } ) )
                        }
                    } />
                <input type="submit" value="Submit" disabled = { loading ? true : false }/>
                <TasksList  value={tasks}/>
            </form>
              <h6> Results </h6>
              
        </div>
    );
}

export default Tasks;

