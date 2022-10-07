
import React, {useState } from 'react';
import TasksList from './TasksList';

function Tasks(props) {



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
            body: JSON.stringify({ detail:task.detail, completed:task.completed,categoryId:36}),
            mode:'cors',
        }

        props.setLoading(true)
        const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        const data = await resp.json()
        const newTask = data.details
        setTask(newTask)
        setTasks(tasks => [...tasks,newTask])
        props.setLoading(false)
    }

    return (
        <div>
          
            <form onSubmit={addTask}>
                <input  type="text" 
                        value={ task.detail }                        
                        placeholder='What do you want today?' 
                        disabled = { props.loading ? true : false }
                        name='detail' 
                        onChange={ (event) => { 
                          setTask(task => ( {...task,detail : event.target.value } ) ) 
                        }}/>

                <input type="checkbox" 
                       value={ task.completed }
                       disabled = { props.loading ? true : false }
                       name='completed' 
                       onChange={ (event) => { 
                            setTask(task => ( {...task,completed :  event.target.checked } ) )
                       }}/>
                <input type="submit" value="Submit" disabled = { props.loading ? true : false }/>
                <TasksList  value={tasks}/>
            </form>
              <h6> Results </h6>
              
        </div>
    );
}

export default Tasks;

