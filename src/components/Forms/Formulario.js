import React, { useContext, useState } from 'react'
import style from './Formulario.module.css'
import Button from './Button'
import { SUBMIT_FORMULARIO } from '../../Api';
import { useParams } from 'react-router-dom';

const Formulario = () => { 
    const param = useParams();
    const [data, setData] = useState({
        resposta_1: null,
        resposta_2: null,
        resposta_3: null,
        resposta_4: null,
        resposta_5: null,
        resposta_6: null,
        resposta_7: null,
        resposta_8: null,
        resposta_9: null,
        resposta_10: null,
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({
          ...data,
          [name]: value,
        });
      };
    
       async function handleSubmit (event) {
        event.preventDefault();
        const token = window.localStorage.getItem("token");
        
    
        const formData = new FormData();
        formData.append('evento_id', param.id);
        formData.append('resposta_1', data.resposta_1);
        formData.append('resposta_2', data.resposta_2);
        formData.append('resposta_3', data.resposta_3);
        formData.append('resposta_4', data.resposta_4);
        formData.append('resposta_5', data.resposta_5);
        formData.append('resposta_6', data.resposta_6);
        formData.append('resposta_7', data.resposta_7);
        formData.append('resposta_8', data.resposta_8);
        formData.append('resposta_9', data.resposta_9);
        formData.append('resposta_10', data.resposta_10);
        try{
            const {url, options} = SUBMIT_FORMULARIO(formData, token); 
            const response = await fetch(url, options)
            const res = await response.json();
            console.log(res)
          }catch(e){
            console.log(e);
          }     
    
      };
    
      return (
        <div className='container'>
          <form onSubmit={handleSubmit} className= {style.form}>
            <div>
              <h3>1. Satisfação Geral:</h3>
              <label>Como você avaliaria a qualidade geral do evento? (1 = Muito insatisfeito, 5 = Muito satisfeito)</label>
              <div>
                <label>
                  <input type="radio" name="resposta_1" value="1" required onChange={handleInputChange} checked={data.resposta_1 === "1"} /> 1
                </label>
                <label>
                  <input type="radio" name="resposta_1" value="2" required onChange={handleInputChange} checked={data.resposta_1 === "2"} /> 2
                </label>
                <label>
                  <input type="radio" name="resposta_1" value="3" required onChange={handleInputChange} checked={data.resposta_1 === "3"} /> 3
                </label>
                <label>
                  <input type="radio" name="resposta_1" value="4" required onChange={handleInputChange} checked={data.resposta_1 === "4"} /> 4
                </label>
                <label>
                  <input type="radio" name="resposta_1" value="5" required onChange={handleInputChange} checked={data.resposta_1 === "5"} /> 5
                </label>
              </div>
            </div>
    
            <div>
            <h3>2. Conteúdo do Evento:</h3>
            <label>A qualidade das palestras, apresentações ou workshops atendeu às suas expectativas?</label>
            <div>
                <label>
                    <input type="radio" name="resposta_2" value="Sim" required onChange={handleInputChange} checked={data.resposta_2 === "Sim"}/> Sim
                </label>
                <label>
                    <input type="radio" name="resposta_2" value="Não" required onChange={handleInputChange} checked={data.resposta_2 === "Não"}/> Não
                </label>
            </div>
        </div>

        <div>
            <h3>3. Houve informações valiosas e relevantes apresentadas durante o evento?</h3>
            <label>
                <input type="radio" name="resposta_3" value="Sim" required onChange={handleInputChange} checked={data.resposta_3 === "Sim"}/> Sim
            </label>
            <label>
                <input type="radio" name="resposta_3" value="Não" required onChange={handleInputChange} checked={data.resposta_3 === "Não"}/> Não
            </label>
        </div>

        <div>
            <h3>4. Organização e Logística:</h3>
            <label>Como você avaliaria a organização geral do evento? (1 = Muito desorganizado, 5 = Muito organizado)</label>
            <div>
                <label>
                    <input type="radio" name="resposta_4" value="1" required onChange={handleInputChange} checked={data.resposta_4 === "1"}/> 1
                </label>
                <label>
                </label>
                <label>
                    <input type="radio" name="resposta_4" value="3" required onChange={handleInputChange} checked={data.resposta_4 === "3"}/> 3
                </label>
                <label>
                    <input type="radio" name="resposta_4" value="4" required onChange={handleInputChange} checked={data.resposta_4 === "4"}/> 4
                </label>
                <label>
                    <input type="radio" name="resposta_4" value="5" required onChange={handleInputChange} checked={data.resposta_4 === "5"}/> 5
                </label>
            </div>
        </div>

        <div>
            <h3>5. Como foi a facilidade de registro e check-in?(1 = Muito difício, 5 = Muito facil)</h3>
            <label>
                <input type="radio" name="resposta_5" value="1" required onChange={handleInputChange} checked={data.resposta_5 === "1"}/> 1
            </label>
            <label>
                <input type="radio" name="resposta_5" value="2" required onChange={handleInputChange} checked={data.resposta_5 === "2"}/> 2
            </label>
            <label>
                <input type="radio" name="resposta_5" value="3" required onChange={handleInputChange} checked={data.resposta_5 === "3"}/> 3
            </label>
            <label>
                <input type="radio" name="resposta_5" value="4" required onChange={handleInputChange} checked={data.resposta_5 === "4"}/> 4
            </label>
            <label>
                <input type="radio" name="resposta_5" value="5" required onChange={handleInputChange} checked={data.resposta_5 === "5"}/> 5
            </label>
        </div>

        <div>
            <h3>6. Houve tempo suficiente para perguntas e respostas?</h3>
            <label>
                <input type="radio" name="resposta_6" value="Sim" required onChange={handleInputChange} checked={data.resposta_6 === "Sim"}/> Sim
            </label>
            <label>
                <input type="radio" name="resposta_6" value="Não" required onChange={handleInputChange} checked={data.resposta_6 === "Não"}/> Não
            </label>
        </div>

        <div>
            <h3>7. Como você avaliaria a localização e as instalações do evento? (1 = Insatisfatório, 5 = Excelente)</h3>
            <label>
                <input type="radio" name="resposta_7" value="1" required onChange={handleInputChange} checked={data.resposta_7 === "1"}/> 1
            </label>
            <label>
                <input type="radio" name="resposta_7" value="2" required onChange={handleInputChange} checked={data.resposta_7 === "2"}/> 2
            </label>
            <label>
                <input type="radio" name="resposta_7" value="3" required onChange={handleInputChange} checked={data.resposta_7 === "3"}/> 3
            </label>
            <label>
                <input type="radio" name="resposta_7" value="4" required onChange={handleInputChange} checked={data.resposta_7 === "4"}/> 4
            </label>
            <label>
                <input type="radio" name="resposta_7" value="5" required onChange={handleInputChange} checked={data.resposta_7 === "5"}/> 5
            </label>
        </div>

        <div>
            <h3>8. Que sugestões você tem para melhorar futuros eventos semelhantes?</h3>
            <textarea name="resposta_8" rows="4" onChange={handleInputChange} value={data.resposta_8}></textarea>
        </div>

        <div>
            <h3>9. Você tem algum comentário adicional que gostaria de compartilhar conosco?</h3>
            <textarea name="resposta_9" rows="4" onChange={handleInputChange} value={data.resposta_9}></textarea>
        </div>

            
            <div>
              <h3>10. Recomendação:</h3>
              <label>Você recomendaria este evento a outras pessoas?</label>
              <div>
                <label>
                  <input type="radio" name="resposta_10" value="Sim" required onChange={handleInputChange} checked={data.resposta_10 === "Sim"} /> Sim
                </label>
                <label>
                  <input type="radio" name="resposta_10" value="Não" required onChange={handleInputChange} checked={data.resposta_10 === "Não"} /> Não
                </label>
              </div>
            </div>
    
            <button type="submit">Enviar</button>
          </form>
        </div>
      );
    }

export default Formulario
