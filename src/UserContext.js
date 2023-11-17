import React from 'react';
import { GET_TOKEN, Get_User, } from './Api';
import { Navigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [testToken, setTestToken] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);


  async function getUser(token) {
    const { url, options } = Get_User(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    const [nome, ...sobrenome] = json.name.split(" ");
    setFirstname(nome);
  }

  async function userLogin(email, password) {
    try{
      const { url, options } = GET_TOKEN({ email, password });
      const tokenRes = await fetch(url, options);
      const json = await tokenRes.json();
      window.localStorage.setItem('token', json.data.token);
      setTestToken(tokenRes.ok)
      getUser(json.data.token);
    }catch(erro){
      console.log(erro);
    }
  }


  return (
    <UserContext.Provider value={{ userLogin, data, testToken, firstname }}>
      {children}
    </UserContext.Provider>
  );
};
