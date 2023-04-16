import React from 'react';

function Signout(props) {
    return (
        <div>
            <input type='submit' value='Signout' onClick={ async (event) => {
                event.preventDefault()
                const requestOptions = {
                  method:'POST',
                  credentials:"include",
                  mode:'cors'
              }
                const signedOut = await fetch('http://localhost:8000/signout',requestOptions)
                const data = await signedOut.json()            
            }}/>
        </div>
    );
}

export default Signout;