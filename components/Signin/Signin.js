import React, { useState } from 'react';

export default function Signin({onSubmit}) {
    
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signinvalidation, setSigninValidation] = useState(true)
    const [registervalidation, setRegisterValidation] = useState(true)

    const onSubmitSignIn = () => {
        fetch('https://desolate-thicket-19650.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.email) {
                onSubmit(user)
            } else {
                passwordInput.value = '';
                setSigninValidation(false);
            }
        })
    }
    
    const onSubmitRegister = () => {
        fetch('https://desolate-thicket-19650.herokuapp.com/register', {
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
        .then(response => response.json())
        .then(user => {
            if (user.email) {
                onSubmit(user);
            } else {
                setRegisterValidation(false);
            }
        })
    }

    const goToRegister = () => {
        setRegister(true)
    }
    
    return (
        <div>
            <form style={{
                padding: "4rem", 
                border: ".5px solid rgba(0,0,0,.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2em",
                maxWidth:"fit-content"
                }}>
                
                { register === false ? 
                    <div style={{display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                                }}>
                        <h3>Sign In</h3>
                        {(signinvalidation === false)
                            ? <div className="warning">User does not exist or wrong password</div>
                            : <div><br/></div>
                        }
                    </div>
                    : 
                    <div style={{display: "flex",
                                flexDirection: "column",
                                alignItems: "center"}}>
                        <h3>Register</h3>
                        {(registervalidation === false)
                            ? <div className="warning">Error registering</div>
                            : <div><br/></div>
                        }
                        <div style={{
                                display: "flex",
                                flexDirection: "column"}}>
                            <label style={{padding: ".4em"}}>Name</label>
                            <input onChange = {(e) => {setName(e.target.value)}}
                                type="name" placeholder="Enter name" 
                                style={{padding: ".3em"}}/>
                        </div>
                    </div>
                }
                
                <div>
                    <div  style={{
                                display: "flex",
                                flexDirection: "column"}}>
                        <label style={{padding: ".4em"}}>Email address</label>
                        <input onChange = {(e) => {setEmail(e.target.value)}}
                            type="email" placeholder="Enter email" 
                            style={{padding: ".3em"}}/>
                    </div>

                    <div style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: "2em"
                                }}>
                        <label style={{padding: ".4em"}}>Password</label>
                        <input id='passwordInput' onChange = {(e) => {setPassword(e.target.value)}}
                            type="password" placeholder="Enter password" 
                            style={{padding: ".3em"}}/>
                    </div>
                </div>
                { register === false 
                    ?
                    <div>
                        <p className="button" onClick={onSubmitSignIn} type="submit">Submit</p>
                        <p onClick={goToRegister} style={{marginTop:"0.1em", cursor:"pointer"}}>Or register</p> 
                    </div> 
                    :
                        <p className="button" onClick={onSubmitRegister} type="submit">Submit</p>
                }
            </form>
        </div>
    )    
}

