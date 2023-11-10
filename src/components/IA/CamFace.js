import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import style from "./CamFace.module.css"

function CamFace() {
  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef(); 
  let results = [];
  const labels = ['Daniel', 'Sheldon'];
  

  // async function loadLabels () {
  //   const descritores = await JSON.parse(window.localStorage.getItem('descritores'));
  //   const json = await faceapi.fetchJson(window.localStorage.getItem('descritores'))
  //   const FACES_URL = process.env.PUBLIC_URL + '/UserFaces';
  //   const labeledDescriptors = [];
  //   console.log(json)

  //    for (let i = 0; i <descritores.length ; i++) {
  //     const descritor = [new Float32Array([...descritores[i]])];
  //     console.log(descritor)
  //      labeledDescriptors.push( 
  //       new faceapi.LabeledFaceDescriptors(
  //         descritor[i].label,descritor
  //         )) 

  //    }
  //    console.log(labeledDescriptors)
  //    return labeledDescriptors;        
  // }


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
 
  const startVideo = () => {   
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640 } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  
  };
 
    const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(startVideo); 

  async function handleVideoOnPlay(){
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }
        

        faceapi.matchDimensions(canvasRef.current, displaySize);        
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const labels = await loadLabels();
        //console.log(labels)
        
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6);
        results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        
        console.log(results[0]?.label)
        

          await canvasRef.current.getContext('2d').clearRect(0, 0, videoRef.Width, videoRef.Height);
           faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
           faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

        //   results.forEach((result, index) => {
        //     const box = resizedDetections[index].detection.box
        //     const { label, distance } = result
        //     new faceapi.draw.DrawTextField([
        //         `${label} (${parseInt(distance * 100, 10)})`
        //     ], box.bottomRight).draw(canvasRef)
        // })
        
      }
    }, 5000)
  }

  useEffect(() => {
    const newdata = [];
    let data = JSON.parse(localStorage.getItem("data"))
    
    
      
    
    if(newdata){
      data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
      data.push(newdata);
      localStorage.setItem("data", JSON.stringify(data));
      console.log(data)
    }
  }, [results]);

  


  return (
    <div className={style.container}>
      <div >
        <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
        <canvas ref={canvasRef} style={{ position: 'absolute', left: '0' }} />            
      </div>
    </div>
  );
}

export default CamFace;