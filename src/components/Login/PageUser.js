import React from 'react'
import Login from './Login'
import style from './PageUser.module.css'
import Eventos from '../Eventos';
import { USER_EVENTOS } from '../../Api';
import { useParams } from 'react-router-dom';

const PageUser = () => {
  const [eventos, setEventos] = React.useState([]);
  
  

  React.useEffect(() => {
    geteventos();
     
   }, []);
 
   async function geteventos(){
    const token = window.localStorage.getItem("token");
     try{
       const {url, options} = USER_EVENTOS(token)
       const response = await fetch(url, options);   
       const data = await response.json();
       setEventos(data);
       console.log(data);

     }catch(erro){
       console.log(erro);
     }
   }


  return (
    <div className={style.layout}>
      <div className={style.grid}>
          <div className={style.userArea}>
              usuario
          </div>
          <div className={style.userEventos}>
            <h1>Meus eventos</h1>
          {eventos.map(evento => (
                <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>

              ))}
          </div>
      </div>
      
    </div>
  )
}

export default PageUser
