
import React, { useState } from 'react';
function Tasks(props) {


    const [inputTask,setInputTask] = useState( { detail:"", completed:false, categoryId:0 } )

    async function addTask(event){
        event.preventDefault()

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ detail:inputTask.detail, completed:inputTask.completed,categoryId:inputTask.categoryId}),
            mode:'cors',
        }

        props.setLoading(true)
        const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        const data = await resp.json()
        const newTask = data.details
        props.setTask(newTask)
        props.setLoading(false)
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <input  type="text" 
                        value={ inputTask.detail }                        
                        placeholder='What do you want today?' 
                        disabled = { props.loading ? true : false }
                        name='detail' 
                        onChange={ (event) => { 
                            setInputTask(inputTask => ( {...inputTask,detail : event.target.value } ) ) 
                        }}/>

                <input type="checkbox" 
                       value={ inputTask.completed }
                       disabled = { props.loading ? true : false }
                       name='completed' 
                       onChange={ (event) => { 
                        setInputTask(inputTask => ( {...inputTask,completed :  event.target.checked } ) )
                       }}/>

                <select name="category" 
                // value={category.type} 
                onChange={ (event)=> { 
                    const selectedCategory = props.categories.find( category => category.type === event.target.value)
                    const categoryId = selectedCategory.id
                    setInputTask(inputTask => ( { ...inputTask,categoryId : categoryId } ) )
                }} 
                >
                { props.categories.map((category) => <option key={category.id} value={category.type}>{category.type} </option>) }
                </select>

                <input type="submit" value="Submit" disabled = { props.loading ? true : false }/>
            </form>           
        </div>
    );
}

export default Tasks;

