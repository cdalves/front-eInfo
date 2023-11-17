import React from 'react'
import style from './Sigin.module.css'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import IconLogin  from '../../Assets/iconLogin.png';
import { Create_User } from '../../Api';
import * as faceapi from 'face-api.js'


const Sigin = () => {
  const username = useForm();
  const email = useForm();
  const password = useForm();
  const password2 = useForm();
  const [error, seterror] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [descritor, setDescritor] = React.useState([]);

  
  async function handleSubmit(event){
    event.preventDefault();
    let descritores =Array.from(descritor);
    const descriptor= JSON.stringify(descritores);
      if(email.validate() && password.validate()){
        try{
          const { url, options } = Create_User({
            name: username,
            email: email,
            password: password,
            descriptor: descriptor,
          });      
          const response = await fetch(url, options);
          const json = await response.json();   
          console.log(json)   
        }catch(error) { 
          seterror(error.message);
        }  
      }
  }

  async function handleImgChange(event) {
    const file = await faceapi.bufferToImage(event.target.files[0]);
    const detections = await faceapi
        .detectSingleFace(file)
        .withFaceLandmarks()
        .withFaceDescriptor();  
        setDescritor(Array.from(detections.descriptor));
        console.log(JSON.stringify(detections.descriptor))
  }



  return (
    <section className={style.areaLogin}>
      <div className={style.sigin}> 
      <img className={style.icon} src={IconLogin}/>   
       <form action='' onSubmit={handleSubmit}>
          <Input name="name" label="Nome" type="text"{...username}/>
          <Input name="email" label="E-mail" type="email" {...email}/>          
          <Input name="password" label="Senha" type="password" {...password}/>  
          <Input name="password2" label="Confirme a senha" type="password"{...password2}/> 
          <input id="img" type="file" onChange={handleImgChange} accept=".jpg, .jpeg, .png"></input>
          {error && <p className={style.error}>{error}</p>}
          <Button>Cadastrar</Button>
       </form>
      </div>
      
    </section>
  )
}

export default Sigin
