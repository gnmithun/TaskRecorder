import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customFetch } from "../Common/customFetch";
import useThrowAsyncError from "../Common/asyncErrorHandler"
import "./Signin.css"

function  Signin(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const navigateTo = useNavigate()
    const asyncErrorHandler = useThrowAsyncError()

    async function signin(event){
        try{
            const signinDetails = JSON.stringify({"email":userId,"password":password})
            const resp = await customFetch("http://localhost:8000/signin",{ method:'POST',body: signinDetails })
            const data = await resp.json()
            if (data.response === "Success") {
                const details = data.details
                if ( details === "Unauthorized"){
                    alert("Unauthorized: Please sign in")
                } else {
                    localStorage.setItem("loggedIn","yes")
                    navigateTo("/dashboard",{ state:{loggedIn:true}})
                }
            } else {
                alert(data.details)
            }
        } catch (error) {
            asyncErrorHandler(error)
        }
    }

    async function signup(event){ 
        try{
            const signupDetails = JSON.stringify({"email":userId,"password":password})
            const resp = await customFetch("http://localhost:8000/signup",{ method:'POST',body: signupDetails })
            const data = await resp.json()
            if (data.response === "Success") {
                signin(event)
            } else {
                alert(data.details)
            }
        } catch (error){
            asyncErrorHandler(error)
        }

    }

    useEffect(() => {
        if (localStorage.getItem("loggedIn") === "yes") {
            navigateTo("/dashboard",{ state:{loggedIn:true}})
        } 
    },[])

    function showSignInForm() { 
        return( 
            <div>
                <h2 className='textCenter'>  Task Master </h2> 
                <h3 className='textCenter'>  A productivity tool  </h3>         
                <div className='center'>
                    <form >
                        <label > Username </label> <br/>
                        <input type='text' className='inputbox' placeholder='Enter a preferred username' onChange={ (event) => {
                            try {
                                setUserId(event.target.value)
                            } catch (error) {
                                asyncErrorHandler(error)
                            }                   
                        }}/><br/>
                        
                        <label> Password </label> <br/>
                        <input type='password' className='inputbox' placeholder='Enter a hard to decipher password' onChange={ (event) => {
                            setPassword(event.target.value)
                        }}/><br/>

                        <div className='actionContainer'>
                            <input type='button' className='signin' value='Signin'  onClick={ signin }/>
                            <input type='button' className='signup' value='Signup' onClick={ (event) => {
                                signup(event)
                            }}/>                            
                        </div>
                    </form>
                </div>
            </div>
        )
    }

     return (showSignInForm());
}

export default Signin;