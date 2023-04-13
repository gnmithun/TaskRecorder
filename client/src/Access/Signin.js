import React, { useState } from 'react';

function  Signin(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    
    async function signin(event){
        event.preventDefault()

        const requestOptions = {
            method:'POST',
            headers:{ 'Content-Type' : 'application/json' },
            credentials:"include",
            body: JSON.stringify( {
                    "email":userId,
                    "password":password
            }),
            mode:'cors'
        }
        
        const resp = await fetch("http://localhost:8000/signin",requestOptions)           
        const data = await resp.json()
        if (data.response === "Success") {
            const details = data.details
            
            if ( details === "Unauthorized"){
                alert("Unauthorized: Please sign in")
            } else {
                const requestOptionsForGetTasks = {
                    method:'GET',
                    headers:{ 'Content-Type' : 'application/json' },
                    credentials:"include",
                    mode:'cors'
                }
                const tasksData = await fetch("http://localhost:8000/tasks",requestOptionsForGetTasks)
                const respData = await tasksData.json()
                console.log(respData.details)
                props.setTasks(respData.details)
            }
        } else {
            alert(data.details)
        }
    }

    return (
        <div>
            <h1>Show signin form here</h1>
            <form onSubmit={ signin }>

                <label > Username </label> <br/>
                <input type='text' placeholder='Enter a preferred username' onChange={ (event) => {
                    setUserId(event.target.value)
                }}/><br/>
                
                <label> Password </label> <br/>
                <input type='password' placeholder='Enter a hard to decipher password' onChange={ (event) => {
                    setPassword(event.target.value)
                }}/><br/>

                <input type='submit' value='signin'  />
            </form>
        </div>
    );
}

export default Signin;