export const apiURL = "http://127.0.0.1:8000/api";

export function CREAT_EVENTOS(formData, token) {
  return {
    url: apiURL + '/evento',
    options: {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function GET_EVENTO(id) {
  return {
    url: apiURL + '/evento/' + id,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'Application/json', 
      },
    },
  };
}

export function DELETE_EVENTOS(id, token) {
  return {
    url: apiURL + '/evento',
    options: {
      method: 'DELETE',
      headers: {
        'Accept': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(id),
    },
  };
}

export function USER_EVENTOS(token) {
  return {
    url: apiURL + '/meuseventos',
    options: {
      method: 'GET',
      headers: {
        'Accept': 'Application/json',
        Authorization: 'Bearer ' + token,
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
          'Accept': 'Application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    };
  }

  export function USER_INSCRICOES(token) {
    return {
      url: apiURL + '/inscricao',
      options: {
        method: 'GET',
        headers: {
          'Accept': 'Application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    };
  }

  export function USER_INSCREVER(formData,token) {
    return {
      url: apiURL + '/inscricao',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      },
    };
  }

  export function USER_LOGOUT(token) {
    return {
      url: apiURL + '/logout',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',
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
        imagem : 'https://www.tecmobile.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/01/Conheca-os-10-maiores-eventos-do-Brasil-e-aprenda-com-eles.jpg.webp',
        descricao: 'paslestra sobre tecnologia e desenvolvimento sustentavel',
        preFed: {
            naoVou: 0,
            talvezVou: 0,
            vou:0
        }

    }
]