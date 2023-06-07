import React from "react"
import navigationStyles from "./NavBar.module.css"
import "./NavBar.css"
export default function NavBar(props){    
    return(
        <div className={ navigationStyles.navigationMain }>
        <div className={ navigationStyles.dropDown}> 
          <ul className={ navigationStyles.navigationItems}> 
             About
          </ul>
          <div className= { navigationStyles.dropDownContent } >
            <p className={ navigationStyles.clickableMenuItem }> About </p>
            <hr className= { navigationStyles.hrCustom }></hr>
            <p className={ navigationStyles.clickableMenuItem }> T & C </p>
            <hr className= { navigationStyles.hrCustom }></hr>
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

// export default function NavBar(props) {
//   return (
//     <div>
//       <div className="navigationMain">
//         <p> One Item </p>
//         <p> Another Item </p>
//         <ul>
//           <li> <a href="#"> Home  </a> </li>
//           <li> <a href="#"> About </a> </li>
//           <li> <a href="#"> FAQ   </a> </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

