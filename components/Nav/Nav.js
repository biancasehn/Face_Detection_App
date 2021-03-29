import styles from './Nav.module.css';
import Logo from '../Logo/Logo';

export default function Nav({onSubmit, isSignedIn}) {
        return(
            <div className={styles.container}>
                <div>
                    <Logo/>
                </div>
                {isSignedIn ? 
                    <div>
                        <a onClick={onSubmit} className="signInButton">Sign Out</a>
                    </div> : <div/> 
                }
                  
            </div>          
        ) 
}