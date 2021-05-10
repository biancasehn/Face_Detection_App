import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Nav from '../components/Nav/Nav';
import Home from '../components/Home/Home';

export default function App() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Face Recognition App</title>
        </Head>

        <Nav />

        <Home/>
      </div>
  )
}