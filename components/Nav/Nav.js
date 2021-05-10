import styles from './Nav.module.css';
import Logo from '../Logo/Logo';
import Link from 'next/link'
import { useSession, signOut, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Nav() {
    const [session] = useSession()
    const router = useRouter()
    return(
            <div className={styles.container}>
                <div>
                    <Logo/>
                </div>
                
                { router.pathname === '/' ?
                    session ? 
                    <a onClick={() => signOut({ callbackUrl: 'http://localhost:3000/signin' })}>Sign Out</a>
                    : <Link href="/signin" > Sign in </Link>
                    :
                    <Link href='/'>Home</Link>
                }   
                
            </div>      
        )
}