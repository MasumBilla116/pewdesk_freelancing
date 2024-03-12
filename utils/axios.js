import axios from 'axios';
import { useRouter } from 'next/router.js';
import { useState } from 'react';
import { lStorageClear, lStorageGet, lStorageSet } from '../helpers/lStorage';

export default function Axios() { 

  //get token string
  function getToken(){
    if (typeof window !== 'undefined') {
      const userToken = lStorageGet('access_token');
      return userToken;
    }
  }

  //get user string
  function getUser(){
    if (typeof window !== 'undefined') {
      const user_detail = lStorageGet('user');
      return user_detail;
    }
  }

  
  const router = useRouter();
  const [user,setUser] = useState(getUser());
  const [token,setToken] = useState(getToken());

  

  function saveToken(user,token){
    if (typeof window !== 'undefined') {

      // Perform localStorage action
      const storeToken = lStorageSet('access_token',token);
      const storeUser = lStorageSet('user',user);

      setToken(storeToken);
      setUser(storeUser);

      router.replace("/profile/user/", "/dashboard");

    }
  }

  function logout(){
    lStorageClear();
     router.replace("/profile/user/", "/login");
  }

  const http = axios.create({
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Authorization": `Bearer ${token}`,
      }
  });
  http.defaults.withCredentials = true;

  return {
    http,
    saveToken,
    logout,
    token,
    user,
    getToken
  };
}