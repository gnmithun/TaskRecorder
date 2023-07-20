import React, {useState} from 'react';
import TaskEditingForm from '../TaskEditing/TaskEditing';
import Constants from '../Common/appConst'
import styles from './TasksList.module.css'
import { FilteredTasks } from "../FilteredAPIs/FilteredTasks"
import { CompletedTasks } from "../FilteredAPIs/CompletedTasks"
import { customFetch } from '../Common/customFetch';

function TasksList(props) {
const [showList] = useState(false)
const displayStatus = showList ?  styles.visible: styles.visible;
    return (
        <div>

            <div className={`${displayStatus}`}>
                <ul className= { styles.customul }>
                    {
                    props.tasks.map((task) =>
                        <div key={task.id}>
                        <li > 
                            <div>
                                <TaskEditingForm task={task} priority={Constants.priorities} categories={props.categories} taskUpdated={ props.taskUpdated }/>
                            </div>

                        </li>                             
                        </div>
                    ) 
                    }
                </ul>
            </div>

            <input type="button" value="Completed" className={styles.collapsibleMenu} onClick={ (event)=>  props.getTasksWithFilter(CompletedTasks,Constants.status[1]) }/>
            
            <input type="button" value="Today" className={styles.collapsibleMenu} onClick={ (event)=>  props.getTasksWithFilter(FilteredTasks,Constants.taskDays[2]) }/>
            
            <input type="button" value="Yesterday" className={styles.collapsibleMenu} onClick={  (event)=> props.getTasksWithFilter(FilteredTasks,Constants.taskDays[1]) } />

            <input type="button" value="Loooooooooooooooong Pending" className={styles.collapsibleMenu} onClick={  (event)=> props.getTasksWithFilter(FilteredTasks,Constants.taskDays[0]) } />
        </div>
    );
}

export default TasksList;