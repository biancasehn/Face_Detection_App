import React, { useState } from 'react';

import Nav from '../components/Nav/Nav.js';
import Signin from '../components/Signin/Signin';

export default function signin() {
     
    return(
        <div>
            <Nav isSignedIn="Home" href="/" />
            <Signin />
        </div>
    )
}
         