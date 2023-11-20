import React, { useEffect } from 'react'
import style from './Sign.module.css'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import IconLogin  from '../../Assets/iconLogin.png';
import { Create_User } from '../../Api';
import * as faceapi from 'face-api.js'


const Sign = () => {
  const username = useForm();
  const email = useForm();
  const password = useForm();
  const password2 = useForm();
  const [error, seterror] = React.useState(null);
  const [descritor, setDescritor] = React.useState([]);
  const [load, setLoad] = React.useState(null);
  const [senha, setSenha] = React.useState(false);
  
  async function handleSubmit(event){
    event.preventDefault();
    console.log(senha)
      if(email.validate() && password.validate() && senha){
        const formData = new FormData();
        formData.append('name', username.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('descriptor', descritor);

        try{
          const { url, options } = Create_User(formData);      
          const response = await fetch( url, options);
          const data = await response.json();   
          console.log( JSON.parse(data))   
        }catch(e) { 
          console.log(e)   

        }  
      }else{

      }
  }

  async function handleImgChange(event) {
    setLoad('Lendo imagem, Aguade!')
    const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
    await Promise.all([
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ]);  

    const file = await faceapi.bufferToImage(event.target.files[0]);
    const detections = await faceapi
        .detectSingleFace(file)
        .withFaceLandmarks()
        .withFaceDescriptor();  
        setDescritor(JSON.stringify(Array.from(detections.descriptor)));
        console.log(JSON.stringify(detections.descriptor))
        setLoad('Imagem carregada!')
  }

  useEffect(() => {

    if(password.value === password2.value){
      console.log('igual')
      setSenha(true);
      seterror(null);
      
    }else{
      setSenha(false)
      seterror('senha não são iguais');      
    }    
   }, [password2.value]);


  return (
    <section className={style.areaLogin}>
      <div className={style.sign}> 
      <img className={style.icon} src={IconLogin}/>   
       <form action='' onSubmit={handleSubmit}>
          <Input name="name" label="Nome" type="text"{...username}/>
          <Input name="email" label="E-mail" type="email" {...email}/>          
          <Input name="password" label="Senha" type="password" {...password}/>  
          <Input name="password2" label="Confirme a senha" type="password" {...password2}/> 
          <p className={style.info}>Adicione uma imagem do seu rosto para realizar o cadastro</p>
          <input className={style.upload} id="img" type="file" accept=".jpg, .jpeg, .png" onChange={handleImgChange}></input>
          <p>{load ? load : ""}</p>          
          {error && <p className={style.error}>{error}</p>}
          <Button>Cadastrar</Button>
       </form>
      </div>
      
    </section>
  )
}

export default Sign
