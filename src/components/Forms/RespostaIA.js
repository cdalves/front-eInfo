import React, { useState } from 'react'
import { RESPONSE_IA } from '../../Api';
import { useParams } from 'react-router-dom';
import Button from './Button';
import style from './RespostaIA.module.css'

const RespostaIA = () => {
    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(null);

    const params = useParams();

    async function ResponseIA(){
        setCarregando('Carregando dados...');
        try{
          const {url, options} = RESPONSE_IA(params.id)
          const response = await fetch(url, options);   
          const data = await response.json();
          setResposta(data);
        }catch(erro){
          console.log(erro);
        }
      }


  return (
    <div className='container'>

        <textarea
        className={style.textarea}
        value={resposta ? resposta : carregando}
        />
      
      <Button onClick={ResponseIA}>Analisar</Button>
    </div>
  )
}

export default RespostaIA
