import React, { useEffect, useState,useContext } from 'react'
import {Box, Text, Divider} from 'native-base'
import {WebView} from 'react-native-webview';
import { DatosContext } from '../context/datos/DatosContext';
import { UserContext } from '../context/usuario/Usercontext';
//@ts-ignore

interface FormData {
    callbackCancel:     string;
    callbackSuccess:    string;
    hashFinal:          string;
    idUser:             string;
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
    const totalRecargo = cuotasSeleccionadas.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);

    useEffect(() => {
        getIP()
    },[])

    useEffect(()=>{
        if(ipCel){
            getData()
        }
    },[ipCel])

    const getIP = async () => {
        let response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json();
        setIpCel(data)
    }

    const getData = async() =>{
       if(ipCel){
         let response = await fetch(`http://192.168.0.112:8085/api/main/pago`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                monto:totalRecargo,
                ipCel,
                userId:user?.pkusuario,
                tipo:"prueba"
            })
        })
        const data = await response.json();
        setFormData(data)
       }else{
        console.log('no se pudo obtener la ip')
       }
    }
    const inputStyles = " color:blue;margin:0; font-size:15px; height:20px; width:80%;";
    
    let html =`
    <!DOCTYPE html>
        <html lang='en'>
        <head>
        <meta charset='UTF-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Formulario de pago</title>
        </head>
        <body>
            <form style="width:100% height:100%;" method='post' action='https://sandboxpp.asjservicios.com.ar/' id='form'>
                <input  name='CallbackSucces'   value=${formData?.callbackSuccess} />
                <input  name='CallbackCancel'   value=${formData?.callbackCancel} />
                <input  name='Comercio'         value= ${formData?.comercio} />
                <input  name='SucursalComercio' value=${formData?.sucursalComercio} />
                <input  name='Monto'            value=${formData?.monto}/>
                <input  name='userId'           value='${formData?.idUser}' />
                <input  name='Hash'             value=${formData?.hashFinal} />
                
                <button style=" display:block; margin-left:auto; margin-right:auto; border-radius:15px; padding-top:10px; padding-bottom:10px; background-color:#71717a; color:white; font-size:25px; height:50px; width:80%;" type='submit' >Pagar</button>
            </form>
        </body>
    </html>
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
        <Box  flex={1}>
            <Box bg={'white'}>
                <Text style={{fontSize:20,marginTop:10,marginBottom:10,marginLeft:5}}>Cuotas a pagar</Text>
            </Box>
            <Box bg={'white'} flexDir={"row"} height={"12"} borderBottomWidth={1} alignItems={"center"} justifyContent={"space-around"}>
                <Text>Año</Text>
                <Text>Cuota N°</Text>
                <Text>Vencimiento</Text>
                <Text>Monto</Text>
            </Box>
            {cuotasSeleccionadas.map((cuota:any) => {
                return (
                <Box bg={'white'}>
                    <Box key={cuota.cuota} flexDir={"row"} height={"12"} alignItems={"center"} justifyContent={"space-around"}>
                        <Text>{cuota.anio}</Text>
                        <Text>{cuota.cuota}</Text>
                        <Text>{ordenarFecha(cuota.fecha_ven1)}</Text>
                        <Text>$ {cuota.totalcuota}</Text>
                    </Box>
                    <Divider/>
                </Box>
                )
            })
            }
        </Box>
        {
            formData &&
            <WebView
                source={{ html: html }}
                style={{ flex:1}}
            />
        }
    </Box>
  )
}
