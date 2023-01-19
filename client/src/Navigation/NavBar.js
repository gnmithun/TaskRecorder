import React, { useState } from "react"
import navigationStyles from './Navigation.module.css'
import styles from '../TaskManager/TaskManager.module.css'

export default function NavBar(props){

    const [loading,setLoading] = useState(false)

    async function addCategory() {
        let category = prompt("Enter a category")
        if (category === null) {
          return
        }
        const options = { method : 'POST', mode:'cors', body:JSON.stringify({"category":category}), headers:{'Content-Type':'application/json'}}
        setLoading(true)
        const resp = await fetch("http://localhost:8000/category",options)
        const data = await resp.json()
        setLoading(false)
        if (data.response === "Success"){
          props.setCategory({ id:data.details.id , type:data.details.type })      
        } else {
          alert(data.details)
        }
      }

    return(
        <div className={ navigationStyles.navigationMain }>
        <div className={ navigationStyles.dropDown}> 
          <ul className={ navigationStyles.navigationItems}> 
             About
          </ul>
          <div className= { navigationStyles.dropDownContent } >
            <p className={ navigationStyles.clickableMenuItem }> About </p>
            <hr className= { styles.hrCustom }></hr>
            <p className={ navigationStyles.clickableMenuItem }> T & C </p>
          </div>
        </div>
        <div className={ navigationStyles.dropDown}> 
          <ul className = { navigationStyles.navigationItems } > 
            Category 
          </ul>
          <div className = {navigationStyles.dropDownContent } >
            <p className={ navigationStyles.clickableMenuItem } onClick={ addCategory }> Category </p>
          </div>
        </div>
      </div>
    )
}