import React, { useEffect, useState } from 'react'
import style from '../components/EventosPage.module.css'
import {DELETE_EVENTOS, GET_EVENTO, USER_INSCREVER, imgApiUrl} from '../Api'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'


const Eventos = () => {
  const params = useParams();
  const [evento, setEvento] = useState();
  const [inscrito, setInscrito] = useState(false)
  const navigate = useNavigate();
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
      navigate('/conta');  
    }catch(erro){
      console.log(erro);
    }
  }
  if(evento){
    return (
      <div className={style.layout}>
          <img className={style.imgEventos} src={imgApiUrl + evento.imagem}/>
          <h1 className={style.titulo}>{evento.nome}</h1>
          <div className={style.info}>
            <p>{evento.descricao}</p>
            <h3>{evento.local}</h3>
            <h4>{evento.data}</h4>
            <h4>{evento.horario}</h4>

            {testToken ? 
              inscrito ? <div>
                <button className={style.btnDesinscrever} onClick={Inscrever} >Desinscrever-se</button> 
                <Link to = {`formulario/${params.id}`} className={style.btnForm}>Formulário</Link>
                </div> : 
                  <button className={style.btnInscrever} onClick={Inscrever} >Inscrever-se</button> 
            
            : <h3 className={style.aviso}>Realize o login para se inscrever</h3>}

          </div> 
          <div>
          {evento?.user_id === data?.id ? <div > 
              <h2 className={style.opcoestitulo}>Opções do Administrador</h2>   
              <div className={style.opcoes}> 
              <Link to = {`analisar/${params.id}`} className={style.btn}>Analisar dados(IA)</Link>
              <Link to={`/facial/`} className={style.btn}>Reconhecimento facial</Link>
              <Link to = {`editar/`} className={style.btnEdit}>Editar</Link>
              <button className={style.btnDel} onClick={deleteEvento}>Deletar evento</button>
              </div>                     
              
            </div> : ''}             
          </div>       
      </div>
      
    )
  }else{
    return null;
  }

}              

export default Eventos
