import React, {useState} from 'react';
import TaskEditingForm from '../TaskEditing/TaskEditing';
import Constants from '../Common/appConst'
import styles from './TasksList.module.css'
import { FilteredTasks } from "../FilteredAPIs/FilteredTasks"
import { CompletedTasks } from "../FilteredAPIs/CompletedTasks"

function TasksList(props) {
const [showList, setShowList] = useState(false)
const displayStatus = showList ?  styles.visible: styles.visible;
    return (
        <div>

            <input type="button" value="Completed" className={styles.collapsibleMenu} onClick={ (event)=>  props.customFetch(CompletedTasks,Constants.status[1]) }/>
            
            <input type="button" value="Today" className={styles.collapsibleMenu} onClick={ (event)=>  props.customFetch(FilteredTasks,Constants.taskDays[2]) }/>
            
            <input type="button" value="Yesterday" className={styles.collapsibleMenu} onClick={  (event)=> props.customFetch(FilteredTasks,Constants.taskDays[1]) } />

            <input type="button" value="Loooooooooooooooong Pending" className={styles.collapsibleMenu} onClick={  (event)=> props.customFetch(FilteredTasks,Constants.taskDays[0]) } />

            <div className={`${displayStatus}`}>
                <ul className= { styles.customul }>
                    {
                    props.tasks.map((task) =>
                        <div key={task.id}>
                        <li > 
                            <div>
                                <TaskEditingForm task={task} priority={Constants.priorities} categories={props.categories} taskUpdated={ props.taskUpdated }/>
                            </div>
                            { <div className={styles.tasksOperations}>
                            <button onClick={ async (event) => {                                
                                    const requestOptions = {
                                        method:'GET',
                                        headers: {'Content-Type': 'application/json'},  
                                        credentials:"include",                                           
                                        mode:'cors'
                                    }
                                    const taskId = task.id
                                    props.setLoading(true)
                                    const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                    const data = await resp.json()
                                    props.setLoading(false)
                                    if( data.response === "Success" ) {
                                        const taskDetails = data.details
                                        alert(taskDetails.id + " : " + taskDetails.detail + " is a " + taskDetails.priority
                                        + " priority task of " + taskDetails.category.type + " category ")
                                    } else {
                                        alert(data.details)
                                    }
                                }}> Details
                            </button>
                            <button onClick={ async (event) => { 
                                        const response = window.confirm("Do you want to delete this task?")
                                        if ( response === false ) {
                                            return
                                        }
                                        const requestOptions = {
                                            method:'DELETE',
                                            headers: {'Content-Type': 'application/json'},
                                            credentials:"include",                                              
                                            mode:'cors'
                                        }
                                        const taskId = task.id
                                        props.setLoading(true)
                                        const resp = await fetch("http://localhost:8000/task/"+taskId,requestOptions)
                                        const data = await resp.json()
                                        props.setLoading(false)
                                        if ( data.response === "Success" ) {                                                
                                            const deletedTaskDetails = data.details                                                                                           
                                            props.taskDeleted()
                                            alert(`Deleted task "${deletedTaskDetails.detail}"`)
                                        } else {
                                            alert(data.details)                                        
                                        }   
                                    } } > X 
                            </button>
                            </div> }
                        </li>                             
                        </div>
                    ) 
                    }
                </ul>
            </div>
        </div>
    );
}

export default TasksList;