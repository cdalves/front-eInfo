import React from 'react'
import style from './Login.module.css'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import IconLogin  from '../../Assets/iconLogin.png';
import { UserContext } from '../../UserContext';


const Login = () => {
  const email = useForm();
  const password = useForm();
  const [error, seterror] = React.useState(null)

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event){
    event.preventDefault();
      if(email.validate() && password.validate()){
        userLogin(email.value, password.value);
      }
  }

  return (
    <section className={style.areaLogin}>
      <div className={style.login}>
        <img className={style.icon} src={IconLogin}/>      
        <form action="" onSubmit={handleSubmit}>
          <Input name="email" label="Email" type="email" {...email}/>
          <Input name="password" label="Senha" type="password" {...password}/>
          {error && <p className={style.error}>{error}</p>}
          <Button>Entrar</Button>
        </form>
      </div>
    </section>
  )
}

export default Login;