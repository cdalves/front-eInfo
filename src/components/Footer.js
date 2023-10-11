import React from 'react'
import style from './Footer.module.css'
import { ReactComponent as Logo } from '../Assets/logoFooter.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={style.rodape}>
      <div className={style.containerFooter}>

        <div className={style.conteudo} >
          <Link to="/"><Logo/></Link>          
        </div>

        <div className={style.conteudo} >
            <h2>Sobre-nós</h2>
            <ul>
            <li><Link className={style.Link}>Info da página</Link></li>
            <li><Link className={style.Link}>Contato</Link></li>
          </ul> 
        </div>

        <div className={style.conteudo} >
          <h2>Suporte</h2>
          <ul>
            <li><Link className={style.Link}>FQA</Link></li>
            <li><Link className={style.Link}>Chat</Link></li>
          </ul>                

        </div>
        
        <div className={style.conteudo} >
          
          
        </div>



      </div>
    </footer>
  )
}

export default Footer