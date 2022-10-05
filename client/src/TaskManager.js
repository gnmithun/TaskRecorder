import React, { useState } from "react";
import Category from "./Category";
import LoadingSpinner from "./LoadingSpinner";
import Tasks from "./Tasks";

function TaskManager(props) {
    const [loading,setLoading] = useState(false)
    return(
            <div>
                <h1> Welcome to TaskManager </h1>
                <h2> Add tasks, track and improve!!</h2>
                <Category/>
                { loading ? <LoadingSpinner/> : <></>}
                <Tasks loading={loading} setLoading={setLoading}/>
            </div>
    )
}

export default TaskManager
