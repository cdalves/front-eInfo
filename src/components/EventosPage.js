import React, { useEffect, useState } from 'react'
import style from '../components/EventosPage.module.css'
import {DELETE_EVENTOS, GET_EVENTO, USER_INSCREVER, eventos, imgApiUrl} from '../Api'
import Button from './Forms/Button'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Analisar from './IA/Analisar'


const Eventos = () => {
  const params = useParams();
  const [evento, setEvento] = useState();

  const token = window.localStorage.getItem("token");
  const {testToken, data} = React.useContext(UserContext);

  useEffect(() => {
    Inscrições();     
   }, []);

  async function Inscrições(){
    try{
      const {url, options} = GET_EVENTO(params.id);
      const response = await fetch(url, options);  
      const data = await response.json();
      setEvento(data);
    }catch(erro){
      console.log(erro);
    }
  }


  async function Inscrever(){    
    const formData = new FormData();
    formData.append('user_id', data.id);
    formData.append('evento_id', evento.id);
    if(token && testToken){try{
      const {url, options} = USER_INSCREVER(formData, token);
      const response = await fetch(url, options)
      const res = await response.json();
    }catch(e){
      console.log(e);
    }}
  }

  async function deleteEvento(){
    try{
      const {url, options} = DELETE_EVENTOS(params.id, token);
      const response = await fetch(url, options);  
      const data = await response.json();
    }catch(erro){
      console.log(erro);
    }
  }
  if(evento){
    return (
      <div className={`${style.layout} container`}>
          <img className={style.imgEventos} src={imgApiUrl + evento.imagem}/>
          <div className={style.info}>
            <h1>{evento.nome}</h1>
            <p>{evento.descricao}</p>
            <h3>{evento.local}</h3>
            <h4>{evento.data}</h4>
            <h4>{evento.horario}</h4>

            {token ? <Button onClick={Inscrever} >Inscrever-se</Button> : ''}
            {evento?.user_id === data?.id ? <Button onClick={deleteEvento}>Deletar evento</Button> : ''}
            <Link to = {`formulario/`} className={style.btn}>Formulário</Link>
            <Link to = {`editar/`} className={style.btn}>Editar</Link>
            
            {data && evento && evento.user_id === data.id ? <Link to= '/facial' className={style.btn}>Reconhecimento facial</Link> : ''}
            
            <Analisar/>

          </div>        
      </div>
      
    )
  }else{
    return null;
  }

}              

export default Eventos
