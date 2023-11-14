import React, { useContext } from 'react'
import Button from './Forms/Button';
import Input from './Forms/Input';
import useForm from '../Hooks/useForm';
import { CREAT_EVENTOS } from '../Api';
import { UserContext } from '../UserContext';
import style from './CreatEventos.module.css';

const CreatEventos = () => {
  
  const eventname = useForm();
  const [descricao, setDescricao] = React.useState('');
  const qtd = useForm();
  const local = useForm();
  const data = useForm();
  const horario = useForm();
  const [error, seterror] = React.useState(null);
  const [img, setImg] = React.useState({});



  const {testToken } = React.useContext(UserContext);
  
  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', eventname.value);
    formData.append('descricao', descricao);
    formData.append('quantidade', qtd.value);
    formData.append('local', local.value);
    formData.append('data', data.value);
    formData.append('horario', horario.value);
    formData.append('imagem', img.raw);

    console.log(formData)
    
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

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }
  

  return (
    <div className={style.pagEvent}>
      <section>
        <div>   
        <form action="" onSubmit={handleSubmit}>
            <div className={style.itens}>
              <Input name="name" label="Nome" type="text"{...eventname}/>
              <label className={style.label} >Descrição</label>
              <textarea
              className={style.textarea}
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva o evento..."
                  value={descricao}
                  onChange={({ target }) => setDescricao(target.value)}
                />
              <Input name="local" label="Local" type="text" {...local}/>
            </div>
             
            <div className={style.itens2}>
              <Input name="quantidade" label="Vagas" type="number"  {...qtd}/> 
              <Input name="data" label="Data" type="date"{...data}/> 
              <Input name="horario" label="Horario" type="time" {...horario}/> 
              <input
                type="file"
                name="img"
                id="img"
                onChange={handleImgChange}
                accept=".jpg, .jpeg, .png"
              />

            </div>
                        
            {error && <p>{error}</p>}
            <Button>Finalizar</Button>
        </form>
        </div>      
      </section>
    </div> 
  )
  
}

export default CreatEventos
