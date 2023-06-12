import React, { useEffect, useState,useContext } from 'react'
import {Box, Text, Input, Button} from 'native-base'
import {WebView} from 'react-native-webview';
import { DatosContext } from '../context/datos/DatosContext';
import { UserContext } from '../context/usuario/Usercontext';
//@ts-ignore

interface FormData {
    callbackSucces: string,
    callbackCancel: string,
    sucursalComercio: string,
    comercio:string,
    monto: string
}

export const FormularioPagos = () => {
    const {cuotasSeleccionadas} = useContext(DatosContext)
    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState<FormData | null>(null)
    const monto = 1500
    const totalRecargo = cuotasSeleccionadas.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);

    useEffect(() => {
        getData();
    },[])

    const getData = async() =>{
        let response = await fetch(`http://192.168.0.112:8085/api/main/pago`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId":user?.pkusuario,
                "monto":totalRecargo
            })
        })
        const data = await response.json();
        let comercio = 'e13ee849-644e-4dc9-a9d4-d687c9a0892b'
        const datosForm = {...data,comercio}
        setFormData(data)
    }
    
    let html =`
    <!DOCTYPE html>
        <html lang='en'>
        <head>
        <meta charset='UTF-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <script src='https://cdn.jsdelivr.net/npm/pluspagos-aes-encryption@1.0.0/dist/AESEncrypter.
        js'></script>
        <!-- <script src='node_modules\pluspagos-aesencryptor\dist\AESEncrypter.js'></script>
        -->
        <title>Ejemplo</title>
        </head>
        <body>
        <form style="width:100% height:100%;" method='post' action='https://sandboxpp.asjservicios.com.ar/' id='form-firma'>
        <input style="margin-top: 10px; display:none; color:blue; font-size:25px; height:50px; width:80%;" type='text' name='CallbackSucces' id='CallbackSucces' value=${formData?.callbackSucces} />
        <input style="margin-top: 10px; display:none; color:blue; font-size:25px; height:50px; width:80%;" type='text' name='CallbackCancel' id='CallbackCancel' value=${formData?.callbackCancel} />
        <input type='hidden' name='Comercio' value= ${formData?.comercio} />
        <input style="margin-top: 10px; display:none; color:blue; font-size:25px; height:50px; width:80%;" type='text' name='SucursalComercio' id='SucursalComercio' value=${formData?.sucursalComercio} />
        <input  style="display:none; margin-left:auto; margin-right:auto; text-align:center; width:80%; font-size:25px; height:50px; " type='text' name='Monto' id='Monto' value=${formData?.monto}  readonly/>
        <input  style="display:none;" name='23456456769' value='23456456769' />
        <input style="display:none;" name='Pedro Martinez' value='Pedro Martinez' /> 
        <input type='hidden' name='Hash' value='4be6253c592a60c3ffb27acc9d130908b05f7e10fd3ae671d326b5224e69dff6' />
        <input type='hidden' name='TransaccionComercioId' value='abc001' />
        <div style="">
                <label style="display:block; margin-left:auto; margin-right:auto; width:80%;">Total a pagar</label>
                <div style="display:block; margin-left:auto; margin-right:auto; width:80%;">
                    <p style="font-size:30px;">$ ${totalRecargo}</p>
                </div>
            </div>
           
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
    <Box style={{flex:1}}  >
        <Box flex={2}>
            <Text>Cuotas a pagar</Text>
            <Box flexDir={"row"} height={"12"} borderBottomWidth={1} alignItems={"center"} justifyContent={"space-around"}>
                <Text>Año</Text>
                <Text>Cuota N°</Text>
                <Text>Fecha de vencimiento</Text>
                <Text>Monto</Text>
            </Box>
            {cuotasSeleccionadas.map((cuota:any) => {
                return <Box key={cuota.cuota} flexDir={"row"} height={"12"} borderBottomWidth={1} alignItems={"center"} justifyContent={"space-around"}>
                    <Text>{cuota.anio}</Text>
                    <Text>{cuota.cuota}</Text>
                    <Text>{ordenarFecha(cuota.fecha_ven1)}</Text>
                    <Text>$ {cuota.totalcuota}</Text>
                </Box>
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
