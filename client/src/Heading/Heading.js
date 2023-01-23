import React from "react";
import styles from "./Heading.module.css"

export default () =>{

    return (
    <div className={ styles.heading }>
        <h1 className={ styles.customH1}> Welcome to TaskManager </h1>
        <h2 className={ styles.customH2}> Add tasks, track and improve!!</h2>
    </div>
    )

}