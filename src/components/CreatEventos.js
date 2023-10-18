import React, { useContext } from 'react'
import Button from './Forms/Button';
import Input from './Forms/Input';
import useForm from '../Hooks/useForm';
import { CREAT_EVENTOS } from '../Api';
import { UserContext } from '../UserContext';


const CreatEventos = () => {
  
  const eventname = useForm();
  const descricao = useForm();
  const qtd = useForm();
  const local = useForm();
  const data = useForm();
  const horario = useForm();
  const [error, seterror] = React.useState(null);

  const {testToken } = React.useContext(UserContext);
  
  async function handleSubmit(event){
    console.log(eventname.value)
    event.preventDefault();
    const formData = new FormData();
    //formData.append('img', img.raw);
    formData.append('nome', eventname.value);
    formData.append('descricao', descricao.value);
    formData.append('quantidade', qtd.value);
    formData.append('local', local.value);
    formData.append('data', data.value);
    formData.append('horario', horario.value);

    
    const token = window.localStorage.getItem("token");
      if(eventname.validate() && token){        
        try{
          const {url, options} = CREAT_EVENTOS(formData, token)
          const response = await fetch(url, options);   
          const json = await response.json();
          seterror(json.message);
        }catch(e){          
          console.log(e);
        }  
      }
  }
  

  return (
    <div className='container'>
      <section>
        <div>   
        <form action="" onSubmit={handleSubmit}>
            <Input name="name" label="Nome" type="text"{...eventname}/>
            <Input name="descricao" label="Descrição" type="text" {...descricao}/> 
            <Input name="quantidade" label="Quantidade de vagas" type="number" {...qtd}/> 
            <Input name="local" label="Local" type="text" {...local}/> 
            <Input name="data" label="Data" type="date"{...data}/> 
            <Input name="horario" label="Horario" type="time" {...horario}/>             
            {error && <p>{error}</p>}
            <Button>Finalizar</Button>
        </form>
        </div>      
      </section>
    </div> 
  )
  
}

export default CreatEventos
