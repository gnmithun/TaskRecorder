import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customFetch } from "../Common/customFetch";
import { useCookies } from 'react-cookie';

function  Signin(props) {
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const [cookies, setCookies] = useCookies(['loggedIn']);

    const navigateTo = useNavigate()

    async function signin(event){
        const signinDetails = JSON.stringify({"email":userId,"password":password})
        const resp = await customFetch("http://localhost:8000/signin",{ method:'POST',body: signinDetails })
        const data = await resp.json()
        if (data.response === "Success") {
            const details = data.details
            if ( details === "Unauthorized"){
                alert("Unauthorized: Please sign in")
            } else {
                navigateTo("/dashboard",{ state:{loggedIn:true}})
            }
        } else {
            alert(data.details)
        }
    }

    async function signup(event){ 
            const signupDetails = JSON.stringify({"email":userId,"password":password})
            const resp = await customFetch("http://localhost:8000/signup",{ method:'POST',body: signupDetails })
            const data = await resp.json()
            if (data.response === "Success") {
                signin(event)
            } else {
                alert(data.details)
            }
    }

    function showSignInForm() {
        if(cookies.loggedIn) {
            console.log("Should navigate to dashboard",cookies,cookies.loggedIn)
        } else {
            return( 
                <div>
                    <form >
                        <label > Username </label> <br/>
                        <input type='text' placeholder='Enter a preferred username' onChange={ (event) => {
                            setUserId(event.target.value)
                        }}/><br/>
                        
                        <label> Password </label> <br/>
                        <input type='password' placeholder='Enter a hard to decipher password' onChange={ (event) => {
                            setPassword(event.target.value)
                        }}/><br/>
        
                        <input type='button' value='Signin'  onClick={ signin }/>
                        <input type='button' value='Signup' onClick={ (event) => {
                            signup(event)
                        }}/>
                    </form>
                </div>
                )
        }

            
        }
    return (showSignInForm());
}

export default Signin;