import React, {useState} from 'react'
import { instance } from '../connection/connection'

export const useFetch = () => {

  const [data, setData] = useState(null)

    const makeGet = async(uri:string) => {
       try {
        const res = await instance.get(uri);
        const datos = res.data;
        setData(datos)
       } catch (error) {
        console.log(error)
       }
    }

    const makePost = async(uri:string ,data:{}) => {
      console.log(data)
        try {
          const res = await instance.post(uri, data);
          const datos = await res.data;
          setData(datos)
        } catch (error) {
          console.log(error)
        }
    }

    const makePut =  async(uri:string ,data:{}) => {
        try {
          const res = await instance.put(uri, data);
          const datos = res.data;
          setData(datos)
        } catch (error) {
          console.log(error)
        }
    }

  return {
    makeGet,
    makePost,
    makePut,
    data
  }
}
