import React, {useState} from 'react'
import { instance } from '../connection/connection'

export const useFetch = () => {

  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

    const makeGet = async(uri:string, token = '' , id?:number, tipo?:string) => {
      let config = {
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      }
      if(token && tipo){
        try {
          console.log(`pidiendo ${tipo}`)
          const res = await instance.get(uri , config);
          const datos = await res.data;
          const objData = {[`${tipo}`]: datos}
          setData(objData);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      }else if(token && id){
        try {
            console.log(`pidiendo ${tipo}`)
            console.log(uri, token, id, tipo)
          const res = await instance.get(uri+`/${id}` , config);
          const datos = await res.data;
          const objData = {[`${tipo}`]: datos}
          setData(objData);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      }else{
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
       
    }

    const makePost = async(uri:string ,data:{}, token= '', tipo?:string) => {
        let config = {
          headers: {
            'Authorization':`Bearer ${token}`,
          }
        }
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
          //console.log('makepost', data)
          const res = await instance.post(uri, data, config);
          console.log('en envio el token', token)
          const datos = await res.data;
          const objData = {[`${tipo}`]: datos}
          setData(objData);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      
    }

    const makePut =  async(uri:string,token:string ,data:{}) => {
      let config = {
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      }
        try {
          const res = await instance.patch(uri, data,config);
          const ruta = uri.split('/')[0]
          const datos = {...res.data,ruta};
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
