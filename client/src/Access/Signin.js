import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function  Signin(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

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
                navigate('/dashboard', { state : { loggedIn : true } } )
            }
        } else {
            alert(data.details)
        }
    }

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
                signin(event)
            } else {
                alert(data.details)
            }
    }

    return (
        <div>
            <form onSubmit={ signin }>

                <label > Username </label> <br/>
                <input type='text' placeholder='Enter a preferred username' onChange={ (event) => {
                    setUserId(event.target.value)
                }}/><br/>
                
                <label> Password </label> <br/>
                <input type='password' placeholder='Enter a hard to decipher password' onChange={ (event) => {
                    setPassword(event.target.value)
                }}/><br/>

                <input type='submit' value='Signin'  />
                <input type='button' value=' Signup' onClick={ (event) => {
                    signup(event)
                }}/>
            </form>
        </div>
    );
}

export default Signin;