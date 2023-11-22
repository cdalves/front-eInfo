import * as faceapi from 'face-api.js';
import React, { useRef, useState } from 'react';
import style from "./CamFace.module.css"
import { useParams } from 'react-router-dom';
import { EVENTO_INSCRICOES, LISTA_PRESENCA } from '../../Api';
import Button from '../Forms/Button';
import { DrawBox } from 'face-api.js/build/commonjs/draw';

function CamFace() {
  const videoRef = useRef();
  const videoHeight = 720;
  const videoWidth = 1080;
  const canvasRef = useRef(); 
  let results = [];
  const params = useParams();
  const [inscricoes, setInscricoes] = useState([]);

  async function InscritosEvento(){
    const token = window.localStorage.getItem("token");
    try{
      const {url, options} = EVENTO_INSCRICOES(token, 2)
      const response = await fetch(url, options);   
      const data = await response.json();
      setInscricoes(data)
      startVideo()
    }catch(erro){
      console.log(erro);
    }
  }
  
  async function GetDados() {   

    const labeledDescriptors = [];
    for(let i=0; i< inscricoes.length; i++){
      const descritores = await JSON.parse(inscricoes[i].descriptor)
      const descritor = await [new Float32Array([...descritores])];
      const identificador = inscricoes[i].name +' '+ inscricoes[i].id;
      labeledDescriptors.push( 
        new faceapi.LabeledFaceDescriptors(identificador, descritor))
    }

    return labeledDescriptors; 
    
  }

 
  const startVideo = () => {   
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720 } })
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
       // console.log(labels)
        
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6);
        results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )

        if(results){
          const token = window.localStorage.getItem("token");
            results.map( async presentes => {
              const idUser = presentes.label.split(" ")
              if(idUser[1] !== undefined){
                const {url, options} = LISTA_PRESENCA(token,idUser[1]);
                const response = await fetch(url, options);  
                const data = await response.json();              
              }
              
            })
        }
        
        

          await canvasRef.current.getContext('2d').clearRect(0, 0, videoRef.Width, videoRef.Height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          console.log(canvasRef)
          results.forEach((result, index) => {
            console.log(result)
              const box = resizedDetections[index].detection.box
              new faceapi.draw.DrawTextField(result.label, box.bottomRight)
              .draw(canvasRef.current)       
            
          });
           
          
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

  
  return (
    <div >
      <div className={style.container}>
        <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} className={style.video} />
        <canvas ref={canvasRef} className={style.canvas} /> 
                   
      </div>
      <div className={style.btn}>
        <Button  onClick={InscritosEvento}>caregar dados</Button>
      </div>
    </div>
  );
}

export default CamFace;