import * as faceapi from 'face-api.js';
import React, { useEffect } from 'react';
import style from "./CamFace.module.css"
import Button from '../Forms/Button';
import { Link, json } from 'react-router-dom';


function CamFace() {
  const [resultados, setResultados] = React.useState(false);
  const [startCam, setStartCam] = React.useState(false);
  const [arrayTam, setArrayTam] = React.useState(null);
  const [time, setTime] = React.useState(0);
  const newdata = [0,0,0,0,0,0,0,0];

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef(); 

 
  React.useEffect(() => {
    const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    
      


     await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    }

    if(!startCam){
      startVideo();
      setStartCam(true);
    }
    loadModels();
  }, []);
  
  async function startVideo(){
   
    navigator.mediaDevices
      .getUserMedia({ video: { width: 600 } })
      .then(stream => {
        const video =  videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        closeWebcam();
        console.error("error:", err);
      });
  }

  async function handleVideoOnPlay(){
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        if(resizedDetections.length){
          setArrayTam(resizedDetections.length);
          setResultados(resizedDetections);          
        }; 


          await canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 1000)
  }

  useEffect(() => {
    for(let i= 0; i < arrayTam; i++){      
      newdata[1] += (resultados[i].expressions.neutral *100)/arrayTam;
      newdata[2] += (resultados[i].expressions.happy *100)/arrayTam;
      newdata[3] += (resultados[i].expressions.sad *100)/arrayTam;
      newdata[4] += (resultados[i].expressions.fearful *100)/arrayTam;
      newdata[5] += (resultados[i].expressions.angry *100)/arrayTam;
      newdata[6] += (resultados[i].expressions.disgusted *100)/arrayTam;
      newdata[7] += (resultados[i].expressions.surprised *100)/arrayTam;
    };
    setTime(time + 0.5);
    newdata[0] = time;
    if(newdata){
      let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
      data.push(newdata);
      localStorage.setItem("data", JSON.stringify(data));}

  }, [resultados]);
  
  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
  }
  

  return (
    <div className={style.container}>
      <div className={style.grid} >
              <div className={style.video}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
                <canvas ref={canvasRef} style={{ position: 'absolute', left: '0' }} />
                {/* <div>
                <Button onClick={startVideo}>Iniciar Camera</Button>
                <Link to='/grafico'>Graficos</Link>
                </div> */}
              </div>  

              {/* <div className='grafico'>
                <Exprecao data={resultados}/>
              </div> */}
    
      </div>    

  </div>
  );
}

export default CamFace;