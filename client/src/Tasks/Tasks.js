
import React, { useEffect, useState } from 'react';
import styles from "./Tasks.module.css"

function Tasks(props) {

    const [inputTask,setInputTask] = useState( { detail:"", completed:false, categoryId: 0, priority:"HIGH" } )

    function isSubmitEnabled(){
        return props.loading ? true : (inputTask.detail !== "" ? false : true)
    }

    useEffect(() => {
        /* The default state of inputTask.categoryId is 0. Cause by default there are no categories. The user has to add them
           After the user adds the first category, the select component still does not update, so we explicitly fetch the 0th
           category i.e the newly added category and set its id to the default category id
         */
        if(inputTask.categoryId === 0 && props.categories.length > 0) {
            const category = props.categories[0]
            setInputTask(inputTask => ( { ...inputTask,categoryId : category.id } ) )
        }

    },[props.categories])

    async function addTask(event){
        event.preventDefault()

        /*This is a corner case where there are no categories*/
        if(props.categories.length === 0) {
            alert("Please add some categories and select one to add tasks")
            return
        } 

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify( { detail:inputTask.detail, 
                                completed:inputTask.completed,
                                categoryId:inputTask.categoryId, 
                                priority:inputTask.priority } ),
            mode:'cors',
        }

        props.setLoading(true)
        const resp = await fetch('http://localhost:8000/tasks',requestOptions)
        const data = await resp.json()
        props.setLoading(false)
        if (data.response === "Success") {
            const newTask = data.details
            props.setTask(newTask)            
            setInputTask(inputTask => ( {...inputTask,detail : "", completed : false} ) )    
        } else {
            alert(data.details)
        }

    }

    return (
        <div className={styles.formStyle} >          
            <form onSubmit={addTask}>
                <div className ={styles.taskContainer}>
                    <input type="text"
                        className= { styles.taskInput }
                        value={ inputTask.detail }              
                        placeholder='What next to do?' 
                        disabled = { props.loading ? true : false }
                        name='detail' 
                        onChange={ (event) => { 
                            setInputTask(inputTask => ( {...inputTask,detail : event.target.value } ) ) 
                        }}
                    />

                    {/* <input type="checkbox" 
                        disabled = { props.loading ? true : false }
                        checked = { inputTask.completed }
                        name='completed' 
                        onChange={ (event) => { 
                            setInputTask(inputTask => ( {...inputTask,completed :  event.target.checked } ) )
                        }}
                    /> */}

                    <select name="category" 
                        className={ styles.categoryInput }
                        onChange={ (event)=> { 
                            const selectedCategory = props.categories.find( category => category.type === event.target.value)
                            const categoryId = selectedCategory.id
                            setInputTask(inputTask => ( { ...inputTask,categoryId : categoryId } ) )
                        }} >
                        { props.categories.map((category) => <option key={category.id} >{category.type} </option>) }
                    </select>
                </div>

                <br/>
                <br/>

                <label> Priority </label>

                <select name="priority"
                    onChange = { (event) => {
                        const selectedPriority = props.priorities.find( priority => priority === event.target.value)
                        setInputTask(inputTask => ( { ...inputTask,priority : selectedPriority } ) )
                    }}>
                    { props.priorities.map( (priority,index) => <option key={index}> { priority} </option>)}
                </select>
                <br/>
                <input type="submit" value="Submit" disabled = { isSubmitEnabled() }/>
            </form>           
        </div>
    );
}

export default Tasks;

