import React, { useState } from 'react'
import { GET_EVENTO, UPDATE_EVENTOS } from '../Api';
import { useParams } from 'react-router-dom';
import style from './EditPage.module.css'
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import Button from './Forms/Button';

const EditPage = () => {
    const params = useParams();
    const [evento, setEvento] = useState();
    const [eventname, seteventname] = useState();
    const [descricao, setDescricao] = React.useState('');
    const [qtd, setQtd] = useState();
    const [local, setLocal] = useState();
    const [data, setData] = useState();
    const [horario, setHorario] = useState();
    const [error, seterror] = React.useState(null);
    const [img, setImg] = React.useState({});


    React.useEffect(() => {
        geteventos();
       }, [params.id]);

    async function geteventos(){
        try{
            const {url, options} = GET_EVENTO(params.id);
            const response = await fetch(url, options);  
            const data = await response.json();
            seteventname(data.nome);
            setDescricao(data.descricao);
            setQtd(data.quantidade);
            setData(data.data)
            setLocal(data.local);
            setHorario(data.horario);

        }catch(erro){
            console.log(erro);
        }
        
    }

       console.log(evento)

       function handleImgChange({ target }) {
        setImg({
          preview: URL.createObjectURL(target.files[0]),
          raw: target.files[0],
        });
      }

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
        const id = params.id;
          if(token){        
            try{
              const {url, options} = UPDATE_EVENTOS(formData, token, id)
              const response = await fetch(url, options);   
              const json = await response.json();
              seterror(json.message);
            }catch(e){          
              console.log(e);
            }  
          }
      }

      
  
if(true){
    return (
    <div className={style.pagEvent}>
      <section>
        <div>   
        <form action="" onSubmit={handleSubmit}>
            <div className={style.itens}>
              <Input name="name" label="Nome" type="text" value={eventname} onChange={({ target }) => seteventname(target.value)}/>
              <label className={style.label} >Descrição</label>
              <textarea
              className={style.textarea}
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva o evento..."
                  value={descricao}
                  onChange={({ target }) => setDescricao(target.value)}
                />
              <Input name="local" label="Local" type="text" {...local} value={local} onChange={({ target }) => setLocal(target.value)}/>
            </div>
             
            <div className={style.itens2}>
              <Input name="quantidade" label="Vagas" type="number" value={qtd} onChange={({ target }) => setQtd(target.value)}/> 
              <Input name="data" label="Data" type="date" value={data} onChange={({ target }) => setData(target.value)}/> 
              <Input name="horario" label="Horario" type="time" value={horario} onChange={({ target }) => setHorario(target.value)}/> 
              <input
                type="file"
                name="img"
                id="img"
                onChange={handleImgChange}
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
  
}

export default EditPage
