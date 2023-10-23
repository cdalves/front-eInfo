import React, { useEffect, useState } from 'react'
import Eventos from './Eventos'
import style from './Home.module.css'
import {Link} from 'react-router-dom';
import { GET_EVENTO } from '../Api';

const Home = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
   geteventos();
    
  }, []);

  async function geteventos(){
    try{
      const {url, options} = GET_EVENTO("")
      const response = await fetch(url, options);   
      const data = await response.json();
      setEventos(data);
    }catch(erro){
      console.log(erro);
    }
  }
  console.log(eventos)

  if(eventos){
    return(
      <div>
          <div className={"container"}>
          {eventos.map(evento => (
            <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>

          ))}

          </div>
      </div>

    )
  }else{
    return null;
  }
}

export default Home