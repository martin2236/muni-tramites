import React, { useEffect, useState,useContext } from 'react'
import {Box, Text, Divider} from 'native-base'
import {WebView} from 'react-native-webview';
import { DatosContext } from '../context/datos/DatosContext';
import { UserContext } from '../context/usuario/Usercontext';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';

interface FormData {
    callbackCancel:     string;
    callbackSuccess:    string;
    hash:          string;
    id_user:             string;
    monto:              string;
    sucursalComercio:   string;
    comercio:           string;
}

interface Props extends StackScreenProps<RootStackParams,'FormularioPagos'>{}

export const FormularioPagos = ({navigation,route}:Props) => {
    const {cuotasSeleccionadas} = useContext(DatosContext);
    const {user} = useContext(UserContext);
    const {data} = route.params;
    const [formData, setFormData] = useState<FormData | null>(null);
    const totalRecargo = data.selected.reduce((acc:any,curr:any)=> acc + curr.totalcuota + curr.recargo,0);
    const randomNumber = Math.floor(Math.random() * 100000) + 1
    

    useEffect(()=>{
        getData()
    },[])


    const getData = async () => {
        const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
        };

        let cunica = data.selected.map(item => parseInt(item.cunica));
        let datosBack = {cuenta:data.cuenta,cunica, tipo:'sandbox'}
        try {
          const res = await axios.post('https://backend.tramites.lacosta.gob.ar/inmuebles/pagarCuotas', datosBack, config);
          const datos = res.data;
          setFormData(datos);
          console.log('respuesta del back', datos);
        } catch (error:any) {
            if (error.response) {
                console.log(error.response.data);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
        }
        
      };

    const inputStyles = " color:blue;margin:0; font-size:15px; height:20px; width:80%;";
    
    let html =`
    <head>
<meta name="referrer" content="no-referrer">
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<form id="form" style="width:100% height:100%;"  method="post" action="https://sandboxpp.asjservicios.com.ar/"> 
<p>callbackSuccess</p>
    <input  name="CallbackSuccess" value="${formData?.callbackSuccess}"></input>
    <p>callbackCancel</p>
    <input  name="CallbackCancel" value="${formData?.callbackCancel}"></input>
    <p>Comercio</p>
    <input  name="Comercio" value="e18ee849-644e-4dc9-a9d4-d687c9aa892b"></input> 
    <p>sucursalComercio</p>
    <input  name="SucursalComercio" value="${formData?.sucursalComercio}"></input> 
    <p>hash</p>
    <input  name="Hash" value="${formData?.hash}"></input> 
    <p>transaccion comercio id</p>
    <input  name="TransaccionComercioId" value="${randomNumber}"></input>
    <p>userId</p>
    <input  name="UserId" value="${formData?.id_user}" ></input> 
    <p>monto</p>
    <input  name="Monto" value="${formData?.monto}" ></input> 
    <p>cuotas</p>
    ${
        data.selected.length ?
        data.selected.map((item,index)=>{
            console.log(`Producto[${item.cuota}]`)
            return `<input key=${index}  name=Producto[${index}] value=${item.cuota}></input>`
        })
        :
        console.log('no hay cuotas')
    }
    <button style=" display:block; margin-left:auto; margin-right:auto; border-radius:15px; padding-top:10px; padding-bottom:10px; background-color:#71717a; color:white; font-size:25px; height:50px; width:80%;" type="submit">prueba</button>
</form> 
`

  return (
    <Box flex={1}  >
        {
            formData ?
            <WebView
                source={{ html: html }}
                style={{ flex:1}}y
            />
            :
            <Box  flex={1}>
                <Text>pagando</Text>
            </Box>
        }
    </Box>
  )
}
