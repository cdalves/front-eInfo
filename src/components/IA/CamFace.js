import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import style from "./CamFace.module.css"
import { useParams } from 'react-router-dom';
import { EVENTO_INSCRICOES } from '../../Api';
import Button from '../Forms/Button';

function CamFace() {
  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef(); 
  let results = [];
  const params = useParams();
  const [usuarios, setUsuarios] = useState([]);

  async function InscritosEvento(){
    const token = window.localStorage.getItem("token");
    try{
      const {url, options} = EVENTO_INSCRICOES(token, 1)
      const response = await fetch(url, options);   
      const data = await response.json();
      setUsuarios(data)
      startVideo()
    }catch(erro){
      console.log(erro);
    }
  }
  
  async function GetDados() {    
    const labeledDescriptors = [];
    for(let i=0; i< usuarios.length; i++){
      const descritores = await JSON.parse(usuarios[i].descriptor)
      const descritor = await [new Float32Array([...descritores])];
      labeledDescriptors.push( 
        new faceapi.LabeledFaceDescriptors(usuarios[i].name, descritor))
    }

    console.log(labeledDescriptors)

    return labeledDescriptors;        
    
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
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]); 

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
        
        const labels = await GetDados();
        //console.log(labels)
        
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6);
        results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        
        console.log(results)
        

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
    }, 10000)
  }

  useEffect(() => {
    const newdata = [];
    let data = JSON.parse(localStorage.getItem("data"))
    
    
      
    
    if(newdata){
      data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
      data.push(newdata);
      localStorage.setItem("data", JSON.stringify(data));
    
    }
  }, [results]);

  


  return (
    <div className={style.container}>
      <div >
        <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
        <canvas ref={canvasRef} style={{ position: 'absolute', left: '0' }} />            
      </div>
      <Button onClick={InscritosEvento}>caregar dados</Button>
    </div>
  );
}

export default CamFace;