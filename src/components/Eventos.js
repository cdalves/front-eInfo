import React from 'react'
import style from '../components/Eventos.module.css'
import {eventos} from '../Api'
import { Link } from 'react-router-dom'

const Eventos = ({id, nome, imagem}) => {
  return (
    <div className={style.layout}>
      <Link to = {`evento/${id}`}>
        <img className={style.imgEventos} src={eventos[0].imagem}/>
        <div className={style.info}>
          <h1>{nome}</h1>
        </div>      
       </Link>        
    </div>
    
  )
  
}              

export default Eventos
