import React, { useEffect, useState } from 'react'
import Eventos from './Eventos'
import style from './Home.module.css'
import {Link} from 'react-router-dom';
import { BUSCA_EVENTO, GET_EVENTO } from '../Api';
import Input from './Forms/Input';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState([]);

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
  async function buscaEventos(nome){
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



  if(eventos){
    return(
      <div className={style.layoutHome}>
          <div className={style.principal}>
            {eventos?.map(evento => (
            <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>
          ))}         

          </div>

          <div className={style.secundario}>
            <div className={style.pesquisa}>
              <input type='' name='busca' placeholder="Digite sua pesquisa"  className={style.busca} onChange={({ target }) => buscaEventos(target.value)}/>

              <div className={style.resultado}>
                {busca?.map(evento => (
                  <Eventos key={evento.id} id={evento.id} nome={evento.nome} imagem={evento.imagem}/>
                ))}
              </div>
               
            </div>              
          </div>
      </div>

    )
  }else{
    return null;
  }
}

export default Home