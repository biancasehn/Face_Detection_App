import Head from 'next/head';
import React from 'react';

import Nav from '../components/Nav/Nav.js';
import Register from '../components/Register/Register'

export default function register() {
    
    return(
        <div>
            <Head>
                <title>Face Recognition App</title>
            </Head>
            <Nav />
            <Register />
        </div>
    )
}