export const apiURL = "http://127.0.0.1:8000/api";

export function GET_EVENTO(id) {
  return {
    url: apiURL + '/evento/' + id,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json', 
      },
    },
  };
}

export function Create_User(body) {
    return {
      url: apiURL + '/usuario',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json', 
        },
        body: JSON.stringify(body),
      },
    };
}


export function GET_TOKEN(body){
        return {
          url: apiURL + '/login',
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        };
      
}

 
export function Get_User(token) {
    return {
      url: apiURL + '/me',
      options: {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    };
  }

export const eventos = [
    {
        id: "1",
        idUser: "1",
        name : 'Espera de uma oportunidade',
        imagem : 'https://www.fainor.com.br/wp-content/uploads/2023/08/pos-graduacao.webp',
        descricao: ' evento mais aguardado do ano para todos os entusiastas, profissionais e curiosos sobre o mundo da tecnologia. Em um ambiente envolvente e futurista, esta feira inovadora promete ser uma jornada emocionante pelos avanços tecnológicos que estão moldando o nosso mundo.',
        preFed: {naoVou: 4,
            talvezVou: 10,
            vou:20}

    },
    {
        id: "2",
        idUser: "1",
        name : 'palestra',
        imagem : '',
        descricao: 'paslestra sobre tecnologia e desenvolvimento sustentavel',
        preFed: {
            naoVou: 0,
            talvezVou: 0,
            vou:0
        }

    }
]