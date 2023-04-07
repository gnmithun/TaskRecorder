import React, { useState } from 'react';

function  Signup(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    
    async function signup(event){
        event.preventDefault()

        const requestOptions = {
            method:'POST',
            headers:{ 'Content-Type' : 'application/json' },
            body: JSON.stringify( {
                    "email":userId,
                    "password":password
            }),
            mode:'cors'
        }
        
            const resp = await fetch("http://localhost:8000/signup",requestOptions)           
            const data = await resp.json()
            if (data.response === "Success") {
                const details = data.details
                console.log(details)
            } else {
                alert(data.details)
            }
    }

    return (
        <div>
            <h1>Show signup form here</h1>
            <form onSubmit={ signup }>

                <label > Username </label> <br/>
                <input type='text' placeholder='Enter a preferred username' onChange={ (event) => {
                    setUserId(event.target.value)
                }}/><br/>
                
                <label> Password </label> <br/>
                <input type='password' placeholder='Enter a hard to decipher password' onChange={ (event) => {
                    setPassword(event.target.value)
                }}/><br/>

                <input type='submit' value='Signup'  />
            </form>
        </div>
    );
}

export default Signup;