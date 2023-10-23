import React, { useState } from 'react'
import { RESPONSE_IA } from '../../Api';
import { useParams } from 'react-router-dom';
import Button from './Button';
import style from './RespostaIA.module.css'

const RespostaIA = () => {
    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(false);

    const params = useParams();

    async function ResponseIA(){
        setCarregando(true);
        console.log('novo request')
        try{
          const {url, options} = RESPONSE_IA(params.id)
          const response = await fetch(url, options);   
          const data = await response.json();
          setResposta(data);
          setCarregando(false);
        }catch(erro){
          console.log(erro);
        }
      }


  return (
    <div className={style.layout}>
        <h1>Analizar os dados com IA</h1>
        <textarea
        className={style.textarea}
        value={carregando ? 'Carregando dados' : resposta}
        />
      
      <Button onClick={ResponseIA} disabled={carregando} >Analisar</Button>
    </div>
  )
}

export default RespostaIA
