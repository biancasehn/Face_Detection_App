import Head from 'next/head';
import React from 'react';

import Nav from '../components/Nav/Nav.js';
import Signin from '../components/Signin/Signin';

export default function signin() {
     
    return(
        <div>
            <Head>
                <title>Face Recognition App</title>
            </Head>
            <Nav />
            <Signin />
        </div>
    )
}
         