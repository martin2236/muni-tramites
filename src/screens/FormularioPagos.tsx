import React, { useEffect, useState,useContext } from 'react'
import {Box, Text, Divider} from 'native-base'
import {WebView} from 'react-native-webview';
import { DatosContext } from '../context/datos/DatosContext';
import { UserContext } from '../context/usuario/Usercontext';

interface FormData {
    callbackCancel:     string;
    callbackSucces:    string;
    hash:          string;
    id_user:             string;
    monto:              string;
    sucursalComercio:   string;
    comercio:           string;
}

export const FormularioPagos = () => {
    const {cuotasSeleccionadas} = useContext(DatosContext);
    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState<FormData | null>(null);
    const [ipCel, setIpCel] = useState<FormData | null>(null)
    const monto = 1500
    const totalRecargo = cuotasSeleccionadas.reduce((acc:any,curr:any)=> acc + curr.totalcuota + curr.recargo,0);
    const randomNumber = Math.floor(Math.random() * 100000) + 1
    

    useEffect(()=>{
        getData()
    },[])


    const getData = async() =>{
        console.log(user?.token)
         let response = await fetch(`https://backend.tramites.lacosta.gob.ar/funciones/macroPago?monto=2000`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user?.token}`,
            }
        })
        const data = await response.json();
        console.log('respuesta del back', data)
        setFormData(data)
    }
    const inputStyles = " color:blue;margin:0; font-size:15px; height:20px; width:80%;";
    
    let html =`
    <head>
<meta name="referrer" content="no-referrer">
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<form id="form" style="width:100% height:100%;"  method="post" action="https://sandboxpp.asjservicios.com.ar/"> 
<p>callbackSuccess</p>
    <input  name="CallbackSuccess" value="${formData?.callbackSucces}" />
    <p>callbackCancel</p>
    <input  name="CallbackCancel" value="${formData?.callbackCancel}" />
    <p>Comercio</p>
    <input  name="Comercio" value="e18ee849-644e-4dc9-a9d4-d687c9aa892b" /> 
    <p>sucursalComercio</p>
    <input  name="SucursalComercio" value="${formData?.sucursalComercio}" /> 
    <p>hash</p>
    <input  name="Hash" value="${formData?.hash}" /> 
    <p>transaccion comercio id</p>
    <input  name="TransaccionComercioId" value="${randomNumber}" />
    <p>userId</p>
    <input  name="UserId" value="${formData?.id_user}" /> 
    <p>monto</p>
    <input  name="Monto" value="${formData?.monto}" /> 
    <p>cuotas</p>
    ${
        cuotasSeleccionadas.length ?
        cuotasSeleccionadas.map((item,index)=>{
            console.log(`Producto[${index}]`)
            return `<input key=${index}  name=Producto[${index}] value=${item.cuota}/>`
        })
        :
        console.log('no hay cuotas')
    }
    <button style=" display:block; margin-left:auto; margin-right:auto; border-radius:15px; padding-top:10px; padding-bottom:10px; background-color:#71717a; color:white; font-size:25px; height:50px; width:80%;" type="submit">prueba</button>
</form> 
`

const ordenarFecha = (fecha:string) => {
    if(fecha){
        const fechaArray = fecha.split('-');
    const dia = fechaArray[2].split('T')[0];
    return `${dia}/${fechaArray[1]}/${fechaArray[0]}`
    }
    return 'Sin fecha';   
}

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
