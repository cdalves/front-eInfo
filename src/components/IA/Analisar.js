import React from 'react'
import * as faceapi from 'face-api.js';
import Button from '../Forms/Button'

const Analisar = () => {
  const labels = ['Daniel', 'Sheldon']

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
    const loadLabels = () => {  
       const FACES_URL = process.env.PUBLIC_URL + '/UserFaces';
        
        return Promise.all(labels.map(async label => {
            const descriptions = []
            for (let i = 1; i <= 1; i++) {
                const img = await faceapi.fetchImage(`${FACES_URL}/${label}/${i}.jpg`)
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor()
                descriptions.push(detections.descriptor);
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
        }))

    }

  return (
    <div>
      <Button onClick = {saveFaces} >Analisar face</Button>
    </div>
  )
}

export default Analisar
