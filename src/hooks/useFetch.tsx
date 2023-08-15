import React, {useState} from 'react'
import { instance } from '../connection/connection'

export const useFetch = () => {

  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  // maneja todas las peticiones get si tiene token y tipo hace la peticion al endpoint correspondiente
  // si tiene token e id hace get al endpoint que pide id
  // por ultimo puede hacer una peticion a un endpoint que no requiera datos
    const makeGet = async(uri:string, token = '' , id?:number, tipo?:string) => {
      let config = {
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      }
      if(token && tipo){
        try {
          const res = await instance.get(uri , config);
          const datos = await res.data;
          const objData = {[`${tipo}`]: datos};
          setData(objData);
          setCargando(false);
        } catch (error:any) {
          setData(error.response.data);
          setCargando(false);
        }
      }else if(token && id){
        try {
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
          setData(datos);
          setCargando(false);
         } catch (error) {
          console.log(error);
          setCargando(false);
         }
      };
    };
    //desde esta funcion se manejan todas las peticiones post de la app como
    //login registro, creacion de datos y peticiones a endpoints como traerCuotas
    const makePost = async(uri:string ,data:{}, token= '', tipo?:string) => {
        let config = {
          headers: {
            'Authorization':`Bearer ${token}`,
          }
        };
        if(token === '' && tipo == 'login'){
        try {
          const res = await instance.post(uri, data);
          const datos = await res.data;
          setData(datos);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      }else if( token === '' && tipo == 'registro'){
        try {
          setCargando(true)
          const nuevaData = {...data,token}
          const res = await instance.post(uri, nuevaData);
          const datos = await res.data;
          setData(datos);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setData(error)
          setCargando(false);
        }
      }else{
        try {
          const res = await instance.post(uri, data, config);
          const datos = await res.data;
          const objData = {[`${tipo}`]: datos}
          setData(objData);
          setCargando(false);
        } catch (error) {
          console.log(error);
          setCargando(false);
        }
      }
    }

    //este endpoint se usa para hacer todas las peticiones put de la app
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
