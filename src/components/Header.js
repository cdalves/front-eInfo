import React from 'react'
import {Link} from 'react-router-dom';
import styles from "./Header.module.css";
import { ReactComponent as Logo } from '../Assets/logo.svg'
import { UserContext } from '../UserContext';

const Header = () => {

   const { data } =  React.useContext(UserContext);

  return (
    <header className={styles.header}>     
       
        <Link className={styles.logo} to={'/'}><Logo/></Link>
        <nav className={styles.nav}>       
          <Link className={styles.links} to={'/'}>Home</Link>
          {data ? (
            <Link className={styles.links} to="/conta">{data.name}</Link>) 
            : (<div>
                   <Link className={styles.links} to={'/entrar'}>Entrar</Link></div>)}
        </nav>

    </header>
  )
}

export default Header