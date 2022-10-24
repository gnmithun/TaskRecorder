import { useState } from "react";
import React from 'react';

function Category(props) {

  const [inputCategory,setInpCategory] = useState("")
  
  async function addCategory(event){   
    event.preventDefault() 
    const options = {
      method:'POST', mode:'cors', body:JSON.stringify({"category":inputCategory}), headers:{ 'Content-Type' : 'application/json' }
    }
    const resp = await fetch("http://localhost:8000/category",options)
    const data = await resp.json()
    if (data.response === "Success"){
      props.setCategory({ id:data.categories.id , type:data.categories.type })
      setInpCategory(" ")      
    } else {
      alert(data.details)
    }  
  }

  const onChange = (event) => {
    setInpCategory(event.target.value)
  }

  return (    
    <div>
      <form onSubmit={addCategory}> 
        <input type="text"
               placeholder='Add a category..e.g Work, Music, Writing etc'
               name="category"
               value={inputCategory}
               onChange={onChange}/>

        <input type="submit"
               value="Add category"/>               
       </form>

       <br></br>
    </div>
  );
}

export default Category;