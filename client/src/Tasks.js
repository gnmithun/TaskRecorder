
import React, { useState } from 'react';
import CategoryList from './CategoryList';
import TasksList from './TasksList';
function Tasks(props) {



    const [category,setCategory] = useState({id:0,type:""})
    const [task,setTask] = useState({detail:"",completed:false,categoryId:0})


    async function addTask(event){
        // event.preventDefault()

        // const requestOptions = {
        //     method:'POST',
        //     headers: {'Content-Type': 'application/json'}, 
        //     body: JSON.stringify({ detail:task.detail, completed:task.completed,categoryId:category.id}),
        //     mode:'cors',
        // }

        // props.setLoading(true)
        // const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        // const data = await resp.json()
        // const newTask = data.details
        // setTask(newTask)
        // props.setTasks(tasks => [...tasks,newTask])
        
        // props.setLoading(false)
    }

    return (
        <div>
            {/* <form onSubmit={addTask}>

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

                <select name="category" value={category.type} 
                onChange={ (event)=> { 
                    const selectedCategory = props.categories.find( category => category.type === event.target.value)
                    setCategory({ id:selectedCategory.id , type:selectedCategory.type })
                    console.log(`Changed to ${category}`) 
                }} 
                >
                { props.categories.map((category) => <option key={category.id} value={category.type}>{category.type} </option>) }
                </select>

                <input type="submit" value="Submit" disabled = { props.loading ? true : (props.tasks === undefined ? true : false ) }/>

                <CategoryList data={categories} onCategorySelected={onCategorySelected}/>
                <TasksList data={props.tasks === undefined ? [] : props.tasks } />
            </form>           */}
            <CategoryList data={props.categories} />
        </div>
    );
}

export default Tasks;

