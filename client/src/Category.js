import { useState, useEffect } from "react";
import React from 'react';
import CategoryList from "./CategoryList";

function Category(props) {

  const [categories,setCategories] = useState([])
  const [inputCategory,setInpCategory] = useState("")
  const [category,setCategory] = useState("")

  useEffect(()=>{
    async function fetchdata(params) {
      const resp = await fetch("http://localhost:8000/categories")
      const data = await resp.json() 
      setCategories(data.details)     
         
    }
    fetchdata()    
  },[category])

  async function addCategory(event){   
    event.preventDefault() 
    const options = {
      method:'POST', mode:'cors', body:JSON.stringify({"category":inputCategory}), headers:{ 'Content-Type' : 'application/json' }
    }
    const resp = await fetch("http://localhost:8000/category",options)
    const data = await resp.json()   
    setCategory(data.details.type)
    setInpCategory(" ")    
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
       <CategoryList data={categories}/>
    </div>
  );
}

export default Category;