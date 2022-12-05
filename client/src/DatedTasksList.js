import React from 'react';

function DatedTaskList (props){
    return (
                <div>
                    <ol>
                    { props.tasks.map((task)=>{
                        return(
                            <div key={task.id}>
                                <li> { task.detail } </li>
                            </div>)
                        })} 
                    </ol> 
                </div>
    );
};

export default DatedTaskList