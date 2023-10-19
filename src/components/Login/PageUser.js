import React from 'react'
import Login from './Login'
import style from './PageUser.module.css'
import Eventos from '../Eventos';
import { USER_EVENTOS } from '../../Api';
import iconUser from '../../Assets/usuário-90.png'
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import { FaUserPen } from "react-icons/fa6";


const PageUser = () => {
  const [eventos, setEventos] = React.useState([]);

  const { data } = React.useContext(UserContext);
  
  
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

     }catch(erro){
       console.log(erro);
     }
   }

  return (
    <div className={style.layout}>
      <div className={style.grid}>
          <div className={style.userArea}>
          <img className={style.icon} src={iconUser}/> 
          <div className={style.dadosUser}>
            {data ? (
                  <>
                  <h3>{data.name}</h3>
                  <span>{data.email}</span>
                  <Link>{FaUserPen}</Link></>)
                      : (<h3>Carregando...</h3>)}
            <ul className={style.opcoes}>
              <li>
                <Link>Inscrições</Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link to='/criar-evento' className={style.btncriar}>Criar evento</Link>
              </li>
            </ul>
          </div> 
          
             
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
