import React, { useState } from 'react';
import styles from './Signin.module.css';
import { signIn } from 'next-auth/client';
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const submitSignin = (e) => {
        e.preventDefault();

        signIn("credentials", {
            email,
            password,
            callbackUrl: '/'
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitSignin} className={styles.form}>

                <div className={styles.header}>
                    <h3>Sign In</h3>
                    {(router.query.error)
                        ? <div className="warning">User does not exist or wrong password</div>
                        : <div><br/></div>
                        }
                </div>
                 {/* EMAIL */}
                <div>
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
                </div>
                
                <button className="button" type="submit"> Submit</button>
                <Link href='/register'><p style={{marginTop:"0.1em", cursor:"pointer"}}> Or register </p></Link>
            </form>
        </div>
    )
}

