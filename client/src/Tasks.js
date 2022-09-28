import React, {useState } from 'react';

function Tasks(props) {

    const onChange = (event) => { 
        setTask(task => ( {...task,[event.target.name] : event.target.value } ) ) 
    }

    const [task,setTask] = useState({
        details:"",
        completed:false
    })

    function addTask(event){
        alert( task.details + " : " + " " + task.completed)
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <input type="text" value={ task.details } placeholder='What do you want today?' 
                        name='details' onChange={ onChange }/>
                <input type="checkbox" value={ task.completed } 
                        name='completed' onChange={ (event) => { 
                            setTask(task => ( {...task,completed : event.target.checked} ) )
                            }
                        }/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Tasks;

