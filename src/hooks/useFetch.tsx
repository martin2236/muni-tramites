import React, {useState} from 'react'
import { instance } from '../connection/connection'

export const useFetch = () => {

  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);

    const makeGet = async(uri:string, token = '') => {
      let config = {
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      }
       try {
        const res = await instance.get(uri, config);
        const datos = res.data;
        setData(datos)
        setCargando(false);
       } catch (error) {
        console.log(error)
        setCargando(false);
       }
    }

    const makePost = async(uri:string ,data:{}, token= '') => {
        let config = {
          headers: {
            'Authorization':`Bearer ${token}`,
          }
        }
        console.log(token)
        if(token === ''){
        try {
          console.log('haciendo login')
          const res = await instance.post(uri, data);
          const datos = await res.data;
          setData(datos);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      }
      try {
        const res = await instance.post(uri, data, config);
        console.log('en envio el token', token)
        const datos = await res.data;
        setData(datos);
        setCargando(false);
      } catch (error) {
        console.log(error);
        setCargando(false);
      }
    }

    const makePut =  async(uri:string ,data:{}) => {
        try {
          const res = await instance.put(uri, data);
          const datos = res.data;
          setData(datos);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
    }

  return {
    makeGet,
    makePost,
    makePut,
    cargando,
    setCargando,
    data,
  }
}
