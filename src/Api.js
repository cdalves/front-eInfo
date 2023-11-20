export const apiURL = "http://127.0.0.1:8000/api";
export const imgApiUrl = "http://127.0.0.1:8000/storage/"

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

export function BUSCA_EVENTO(name) {
  return {
    url: apiURL + '/evento?nome=' + name,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'Application/json', 
      },
    },
  };
}

export function UPDATE_EVENTOS(formData, token, id) {
  return {
    url: apiURL + '/evento/' + id,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',   
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function DELETE_EVENTOS(id, token) {
  return {
    url:`${apiURL}/evento/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Accept': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
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

export function Create_User(formData) {
    return {
      url: apiURL + '/usuario',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'Application/json', 
        },
        body: formData,
      },
    };
}


export function GET_TOKEN(body){
        return {
          url: apiURL + '/login',
          options: {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',               
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
          'Content-Type': 'Application/json', 
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

  export function LISTA_PRESENCA(token, id) {
    return {
      url: apiURL + '/registrar-presenca/' + id,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json', 
           Authorization: 'Bearer ' + token,
        },
      },
    };
  }
  export function EVENTO_INSCRICOES(token, id) {
    return {
      url: apiURL + '/inscritos-evento/' + id,
      options: {
        method: 'GET',
        headers: {
          'Accept': 'Application/json',
          Authorization: 'Bearer ' + token,
        },
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

  export function SUBMIT_FORMULARIO(data,token) {
    return {
      url: apiURL + '/avaliacoes',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',  
          Authorization: 'Bearer ' + token,
        },
        body: data,
      },
    };
  }

  export function RESPONSE_IA(id) {
    return {
      url: apiURL + '/avaliar/' + id,
      options: {
        method: 'GET',
        headers: {
          'Accept': 'Application/json', 
        },
      },
    };
  }
  

