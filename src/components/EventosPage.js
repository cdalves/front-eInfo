import React, { useEffect, useState } from 'react'
import style from '../components/EventosPage.module.css'
import {GET_EVENTO, eventos} from '../Api'
import Button from './Forms/Button'
import { Link, useParams } from 'react-router-dom'

const Eventos = () => {
  const params = useParams();
  const [evento, setEvento] = useState();

   console.log(params);

  useEffect(() => {
    geteventos();     
   }, []);

  async function geteventos(){
    try{
      const {url, options} = GET_EVENTO(params.id)
      const response = await fetch(url, options);  
      const data = await response.json();
      setEvento(data);
    }catch(erro){
      console.log(erro);
    }
  }

  if(evento){
    return (
      <div className={`${style.layout} container`}>
          <img className={style.imgEventos} src={eventos[0].imagem}/>
          <div className={style.info}>
            <h1>{evento.nome}</h1>
            <p>{evento.descricao}</p>
            <h3>{evento.local}</h3>
            <h4>{evento.data}</h4>
            <h4>{evento.horario}</h4>

            <Button>Inscrever-se</Button>
          </div>        
      </div>
      
    )
  }else{
    return null;
  }

}              

export default Eventos
