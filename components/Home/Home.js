import React, { useEffect, useState } from 'react';

import InputURL from '../InputURL/InputURL';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import EntriesCount from '../EntriesCount/EntriesCount';

export default function Home({ userSignedIn }) {

  const [url, setUrl] = useState('')
  const [pic, setPic] = useState('')
  const [box, setBox] = useState ('')
  const [userEntries, setUserEntries] = useState('')

  useEffect(() => {
    setUserEntries(userSignedIn.entries)
  },[userSignedIn.entries])

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
      fetch('https://desolate-thicket-19650.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: url
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://desolate-thicket-19650.herokuapp.com/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: userSignedIn.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUserEntries(count);
          })
          .catch(console.log);
        }
        displayBox(boxCalculation(response))
      })
      .catch(err => console.log("erro"))
  }

  return (
    <div >
      <div style={{marginTop:"5em"}}>
        <EntriesCount userName={userSignedIn.name} entries={userEntries} />
        <h1>Let's detect faces in your pictures!</h1>
      </div>
      <InputURL onChange={onFormChange} onSubmit={handlePictureSubmit} />
      <FaceRecognition pic={pic} box={box} />         
    </div>
  )
}