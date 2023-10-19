import React from 'react'
import style from './PageUser.module.css'
import Eventos from '../Eventos';
import { USER_EVENTOS, USER_INSCRICOES, USER_LOGOUT } from '../../Api';
import iconUser from '../../Assets/usuário-90.png'
import { UserContext } from '../../UserContext';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const PageUser = () => {
  const [eventos, setEventos] = React.useState([]);
  const [show, setShow] = React.useState();

  const navigate = useNavigate();


  const { data } = React.useContext(UserContext);
  const token = window.localStorage.getItem("token");
  
  
  React.useEffect(() => {
    geteventos();
     
   }, []);
 
   async function geteventos(){
     try{
       const {url, options} = USER_EVENTOS(token)
       const response = await fetch(url, options);   
       const data = await response.json();
       setEventos(data);

     }catch(erro){
       console.log(erro);
     }
   }

   async function getInscricoes(){
    try{
      const {url, options} = USER_INSCRICOES(token)
      const response = await fetch(url, options);   
      const data = await response.json();
      console.log(data);
      

    }catch(erro){
      console.log(erro);
    }
  }

   async function logout(){
    try{
      const {url, options} = USER_LOGOUT(token)
      const response = await fetch(url, options);   
      const data = await response.json();
      window.localStorage.removeItem('token');  
      navigate('/entrar');  
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
                  <span>{data.email}</span></>)
                      : (<h3>Carregando...</h3>)}
            </div>
            <div className={style.opcoes}>
              <ul>
                <li>
                  <Link className={style.btn}>Editar perfil</Link>
                </li>
                <li>
                  <Link className={style.btn} onClick={getInscricoes}>Inscrições</Link>
                </li>
                <li>
                  <Link to='/criar-evento' className={style.btncriar}>Criar evento</Link>
                </li>
                <li>
                  <Link className={style.btnExit} onClick={logout}>Sair</Link>
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
