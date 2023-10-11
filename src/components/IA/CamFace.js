import * as faceapi from 'face-api.js';
import React from 'react';
import style from "./CamFace.module.css"


function CamFace() {
  const [resultados, setResultados] = React.useState(false);


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
    startVideo();
    loadModels();
  }, []);

  async function startVideo(){
    await navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video =  videoRef.current;
        video.srcObject =  stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
        closeWebcam();
      });
  }

  const handleVideoOnPlay = () => {
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
        setResultados(resizedDetections);
          await canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          await faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          await faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          await faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 1000)
  }
console.log(resultados);
  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
  }

  return (
    <div>
      <div className={style.container}>
              <div >
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
                <canvas ref={canvasRef} style={{ position: 'absolute', left: '0' }} />
              </div>         
      </div>   

  </div>
  );
}

export default CamFace;