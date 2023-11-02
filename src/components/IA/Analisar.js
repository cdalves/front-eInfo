import React from 'react'
import * as faceapi from 'face-api.js';
import Button from '../Forms/Button'

const Analisar = () => {


    // async function saveFaces() {
    //     const labels = await loadLabels();
    //     //console.log(labels)
    //     window.localStorage.setItem('allDescriptions', JSON.stringify(await loadLabels()))
    //     const y = JSON.parse(window.localStorage.getItem('allDescriptions'))
    //     const x = new faceapi.FaceDescriptors(y)
    // }
    // const loadLabels = () => {  
    //     const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
    //     Promise.all([
    //         faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    //         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    //         faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    //       ]);  

    //     const FACES_URL = process.env.PUBLIC_URL + '/UserFaces';
    //     const labels = ['Sheldon','Daniel']
    //     return Promise.all(labels.map(async label => {
    //         const descriptions = []
    //         for (let i = 1; i <= 3; i++) {
    //             const img = await faceapi.fetchImage(`${FACES_URL}/${label}/${i}.jpg`)
    //             const detections = await faceapi
    //                 .detectSingleFace(img)
    //                 .withFaceLandmarks()
    //                 .withFaceDescriptor()
    //             descriptions.push(detections.descriptor);
    //         }
    //         return new faceapi.LabeledFaceDescriptors(label, descriptions);
    //     }))
    // }

    
    


  return (
    <div>
      <Button >Analisar face</Button>
    </div>
  )
}

export default Analisar
