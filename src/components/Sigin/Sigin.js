import React from 'react'
import style from './Sigin.module.css'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import IconLogin  from '../../Assets/iconLogin.png';
import { Create_User } from '../../Api';

const Sigin = () => {
  const username = useForm();
  const email = useForm();
  const password = useForm();
  const password2 = useForm();
  const [error, seterror] = React.useState(null);

  
  async function handleSubmit(event){
    event.preventDefault();
      if(email.validate() && password.validate()){
        try{
          const { url, options } = Create_User({
            name: username.value,
            email: email.value,
            password: password.value,
          });      
          const response = await fetch(url, options);
          const json = await response.json();      
        }catch(error) { 
          seterror(error.message);
        }  
      }
  }

  return (
    <section className={style.areaLogin}>
      <div className={style.sigin}> 
      <img className={style.icon} src={IconLogin}/>   
       <form action="" onSubmit={handleSubmit}>
          <Input name="name" label="Nome" type="text"{...username}/>
          <Input name="email" label="E-mail" type="email" {...email}/>          
          <Input name="password" label="Senha" type="password" {...password}/>  
          <Input name="password2" label="Confirme a senha" type="password"{...password2}/> 
          {error && <p className={style.error}>{error}</p>}
          <Button>Cadastrar</Button>
       </form>
      </div>
      
    </section>
  )
}

export default Sigin
