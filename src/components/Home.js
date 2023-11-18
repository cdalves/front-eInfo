import React, { useEffect, useState } from 'react'
import Eventos from './Eventos'
import style from './Home.module.css'
import {Link} from 'react-router-dom';
import { BUSCA_EVENTO, GET_EVENTO } from '../Api';
import Input from './Forms/Input';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState([]);
  const [eventos2, setEvento2] = useState([]);
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
   geteventos();
    
  }, []);



  async function geteventos(){
    try{
      const recente = []
      const {url, options} = GET_EVENTO("")
      const response = await fetch(url, options);   
      const data = await response.json();
      recente.push(await data[data.length - 1]);
      recente.push(await data[data.length - 2]);
      setEventos(data);
      setEvento2(recente)
    }catch(erro){
      console.log(erro);
    }
  }
  async function buscaEventos(nome){
    setBuscando(true)
    try{
      const {url, options} = BUSCA_EVENTO(nome)
      const response = await fetch(url, options);   
      const data = await response.json();
      setBusca(data);
      console.log(busca)

    }catch(erro){
      console.log(erro);
    }
  }



  if(eventos && eventos2){
    return(
      <div className={style.layoutHome}>
          <div className={style.principal}>
            {eventos?.map(evento => (
            <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>
          ))}         

          </div>

          <div className={style.secundario}>
            <div className={style.pesquisa}>
              <input type='' name='busca' placeholder="Busque eventos..."  className={style.busca} onChange={({ target }) => buscaEventos(target.value)}/>
              {buscando ? 
                <div className={style.resultado}>
                {busca?.map(evento => (
                  <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>
                ))}
                </div> : 
                <div className={style.ultimosev}>
                    {eventos2?.map(evento => (
                  <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>
                ))}
                </div> 
              }
              
               
            </div>              
          </div>
      </div>

    )
  }else{
    return null;
  }
}

export default Home