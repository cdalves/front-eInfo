import React from 'react'
import * as faceapi from 'face-api.js'
import Button from '../Forms/Button'

const AddFAce = () => {
    const labels = ['Daniel', 'Sheldon']
    const [img, setImg] = React.useState(null);

    const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          ]);  
  
      async function saveFaces() {
          const descriptions = await loadLabels();
          let descritores =Array.from(descriptions)//convert float32Array into number[]
          window.localStorage.setItem('descritores', JSON.stringify(descritores));
          console.log(descritores)
  
  
      }

     async function handleImgChange(event) {
        const file = await faceapi.bufferToImage(event.target.files[0]);
        setImg(file);
      }


      async function loadLabels (){  
        const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
            alert("rosto cadastrado com sucesso!!")
            console.log(detections.descriptor)
      }
  
    return (
      <div className='container'>
        <p>Realise o cadastro do seua rosto pra sabermos se você esteve presente em eventos futuros! Bem simples, apenas anexar uma foto e cadastrar!</p>
        <input id="img" type="file" onChange={handleImgChange} accept=".jpg, .jpeg, .png"></input>
        <Button onClick = {loadLabels} >Cadastrar rosto</Button>
      </div>
    )
  }

export default AddFAce
