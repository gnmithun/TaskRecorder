import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function  Signup(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

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
                navigate('/signin')
            } else {
                alert(data.details)
            }
    }

    return (
        <div>
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
                <input type='button' value='Signin' onClick={ () => {
                    navigate('/signin')
                }}/>
            </form>
        </div>
    );
}

export default Signup;