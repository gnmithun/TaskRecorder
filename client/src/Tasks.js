import React, {useState } from 'react';
import TasksList from './TasksList';
function Tasks(props) {

    const onChange = (event) => { 
        setTask(task => ( {...task,[event.target.name] : event.target.value } ) ) 
    }

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
            body: JSON.stringify({ detail:task.detail, completed:task.completed,category:2}),
            mode:'cors',
        }
        const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        const data = await resp.json()
        const newTask = data.details
        setTask(newTask)
        setTasks(tasks => [...tasks,newTask])
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <input  type="text" 
                        value={ task.detail } 
                        placeholder='What do you want today?' 
                        name='detail' 
                        onChange={ onChange }/>

                <input type="checkbox" 
                       value={ task.completed } 
                        name='completed' 
                    onChange={ (event) => { 
                            setTask(task => ( {...task,completed :  event.target.checked } ) )
                        }
                    } />
                <input type="submit" value="Submit"/>
                <TasksList  value={tasks}/>
            </form>
        </div>
    );
}

export default Tasks;

