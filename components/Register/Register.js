import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/client';
import Link from 'next/link'

import styles from '../Signin/Signin.module.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validRegister, setValidRegister] = useState(true);

    const onSubmitRegister = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.NEXT_PUBLIC_FETCHURL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id:'?',
                name: name,
                email: email,
                password: password,
                entries: '0',
                joined: new Date()
            })
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }
        })
        .then(data => {
            if (data) {
                signIn("credentials", {
                    email,
                    password,
                    callbackUrl: '/'
                    })
            } else {
                setValidRegister(false)
            }
        })
        .catch(err => {console.log("Error registering", err)})
    }

    return(
        <div className={styles.container}>
            <form onSubmit={onSubmitRegister} className={styles.form}>
                <div className="header">
                    <h3>Register</h3>
                    {(!validRegister)
                        ? <div className="warning">Error registering</div>
                        : <div><br/></div>
                    }
                </div>
                {/* NAME */}
                <div style={{
                            display: "flex",
                            flexDirection: "column"}}>
                    <label style={{padding: ".4em"}}>Name</label>
                    <input onChange = {(e) => {setName(e.target.value)}}
                        type="name" name="name" placeholder="Enter name" 
                        style={{padding: ".3em"}}/>
                </div>
                {/* EMAIL */}
                <div  style={{
                            display: "flex",
                            flexDirection: "column"}}>
                    <label style={{padding: ".4em"}}>Email address</label>
                    <input onChange = {(e) => {setEmail(e.target.value)}}
                        type="email" name="email" placeholder="Enter email" 
                        style={{padding: ".3em"}}/>
                </div>
                {/* PASSWORD */}
                <div style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingBottom: "2em"
                            }}>
                    <label style={{padding: ".4em"}}>Password</label>
                    <input id='passwordInput' onChange = {(e) => {setPassword(e.target.value)}}
                        type="password" name="password" placeholder="Enter password" 
                        style={{padding: ".3em"}}/>
                </div>
                    <button className="button" type="submit">Submit</button> <br/>
                    <Link href='/signin'><p style={{marginTop:"0.1em", cursor:"pointer"}}>Already subscribed? Sign In</p></Link>
                
            </form>
        </div>
    )
}