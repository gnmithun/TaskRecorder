import React from "react"
import navigationStyles from './Navigation.module.css'
import styles from '../TaskManager/TaskManager.module.css'

export default function NavBar(props){    
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
            <hr className= { styles.hrCustom }></hr>
            <p className={ navigationStyles.clickableMenuItem } onClick = { props.signout }> Signout </p>
          </div>
        </div>
        <div className={ navigationStyles.dropDown}> 
          <ul className = { navigationStyles.navigationItems } > 
            Category 
          </ul>
          <div className = {navigationStyles.dropDownContent } >
            <p className={ navigationStyles.clickableMenuItem } onClick={ props.addCategory }> + Category </p>
          </div>
        </div>
      </div>
    )
}