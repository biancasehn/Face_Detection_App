import React, { useEffect, useState } from 'react';
import Link from 'next/link'

import InputURL from '../InputURL/InputURL';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import EntriesCount from '../EntriesCount/EntriesCount';

import styles from './home.module.css'
import { useSession } from 'next-auth/client'

export default function Home() {

  const [ session ] = useSession()

  const [url, setUrl] = useState('')
  const [pic, setPic] = useState('')
  const [box, setBox] = useState ('')
  const [entries, setEntries] = useState(0)
  const [displayModal, setDisplayModal] = useState(false)

  useEffect(() => {
    (session) &&
    fetch(`${process.env.NEXT_PUBLIC_FETCHURL}/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: session.accessToken.id
      })
    })
    .then(response => {
      return response.json()
    })
    .then(entries => {
      setEntries(entries);
    })
    .catch(err => console.log("Failed to fetch", err))
  }, [session])

  function fetchEntries() {
    fetch(`${process.env.NEXT_PUBLIC_FETCHURL}/image`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: session.accessToken.id
      })
    })
    .then(response => {
      return response.json()
    })
    .then(count => {
      setEntries(count[0]);
    })
    return
  }

  const boxCalculation = (response) => {
    const output = [];
    const image = document.getElementById('inputimage');

    const width = Number(image.width);
    const height = Number(image.height);
    const regions = response.outputs[0].data.regions
    regions.map(region => {
      const measurements = region.region_info.bounding_box;
      const calc = {
        left_col: measurements.left_col * width,
        top_row: measurements.top_row * height,
        right_col: width - (measurements.right_col * width),
        bottom_row: height - (measurements.bottom_row * height)
      }
      output.push(calc)
    })
    return output;
  }

  const displayBox = (box) => {
        setBox(box);
    }
    
  const onFormChange = (event) => {
    setUrl(event.target.value)
  }

  const handlePictureSubmit = (event) => {
      event.preventDefault();
      setPic(url);
      // handle Clarifai API Call
      fetch(`${process.env.NEXT_PUBLIC_FETCHURL}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: url
        })
      })
      .then(response => response.json())
      .then(boxData => {
        if (session) {
          if (boxData) {
            fetchEntries()
          }
        } else {
          setDisplayModal(true)
        }
        displayBox(boxCalculation(boxData))
      })
      .catch(err => console.log("erro"))
  }
  return (
    <div className={styles.main}>
      { (displayModal) ? 
        <div className={styles.modal}>
          <Link href={"/signin"}><div className={styles.animateLeft}>
            Sign in to keep track of your entries!
          </div></Link>
        </div>
        : <div />
      }
      <div>
        { (session) ?
        <EntriesCount userName={session.accessToken.name}
                      entries={entries} />
        : <div></div>
        }
        <div className={styles.callToAction}><h1>Let's detect faces in your pictures!</h1></div>
      </div>
      <InputURL onChange={onFormChange} onSubmit={handlePictureSubmit} />
      <FaceRecognition pic={pic} box={box} />
      <br />
    </div>
  )
}