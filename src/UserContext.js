import React from 'react';
import { GET_TOKEN, Get_User, } from './Api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    const { url, options } = Get_User(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    const { url, options } = GET_TOKEN({ email, password });
    const tokenRes = await fetch(url, options);
    const json = await tokenRes.json();
    //window.localStorage.setItem('token', token);
    console.log(json);
    getUser(json.data.token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
