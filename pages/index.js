import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Nav from '../components/Nav/Nav';
import Home from '../components/Home/Home';
import Signin from '../components/Signin/Signin';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState({
                                                    id: '',
                                                    name: '',
                                                    email: '',
                                                    entries: '',
                                                    joined: ''
                                                  })

  const onSubmit = (user) => {
    
    setIsSignedIn(!isSignedIn);
    setUserSignedIn({
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
    })
  }  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav onSubmit={onSubmit} isSignedIn={isSignedIn} />
      { isSignedIn === false ? <Signin onSubmit={onSubmit} /> : <Home userSignedIn={userSignedIn} />}
    </div>
  )
}