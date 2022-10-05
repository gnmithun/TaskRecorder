import { useState, useEffect } from "react";
import React from 'react';

function Category(props) {

  const [category,setCategory] = useState("")

  useEffect(()=>{
    async function fetchdata(params) {
      const resp = await fetch("http://localhost:8000/categories")
      const data = await resp.json()
      const categories = data.details
      console.log(categories)                  
    }
    fetchdata()    
  },[category])

  async function addCategory(event){   
    event.preventDefault() 

    const options = {
      method:'POST',
      mode:'cors',      
      body:JSON.stringify({"category":category}),
      headers:{ 'Content-Type' : 'application/json' }
    }

    const resp = await fetch("http://localhost:8000/category",options)
    const data = await resp.json()            
    setCategory(" ")    
  }

  const onChange = (event) => {
    setCategory(event.target.value)
  }

  return (    
    <div>
      <form onSubmit={addCategory}> 
        <input type="text"
               placeholder='Add a category..e.g Work, Music, Writing etc'
               name="category"
               value={category}
               onChange={onChange}/>

        <input type="submit"
               value="Add category"/>               
       </form>
    </div>
  );
}

export default Category;