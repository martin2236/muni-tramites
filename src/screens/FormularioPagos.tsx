import React, {useEffect, useState, useContext} from 'react';
import {Box} from 'native-base';
import {WebView} from 'react-native-webview';
import {DatosContext} from '../context/datos/DatosContext';
import {UserContext} from '../context/usuario/Usercontext';
import axios from 'axios';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigation';

interface FormData {
  callbackCancel: string;
  callbackSuccess: string;
  hash: string;
  id_user: string;
  montoEncriptado: string;
  sucursalComercio: string;
  comercio: string;
}

export interface Data {
  cuenta:   number;
  selected: Selected[];
}

export interface Selected {
  anio:        string;
  checked:     boolean;
  convenio:    null;
  cunica:      string;
  cuota:       string;
  descuento:   number;
  estaDeta:    string;
  estado:      string;
  estadonew:   null;
  fechaCertil: null;
  fecha_pago:  null;
  fecha_ven1:  Date;
  importe:     number;
  luz:         number;
  n_cuenta:    number;
  obra:        number;
  pagable:     boolean;
  recargo:     number;
  t_interes:   string;
  tasa:        string;
  totalcuota:  number;
}


interface Props extends StackScreenProps<RootStackParams, 'FormularioPagos'> {}

export const FormularioPagos = ({navigation, route}: Props) => {
  const {cuotasSeleccionadas} = useContext(DatosContext);
  const {user} = useContext(UserContext);
  const { data } = route.params!;
  const [formData, setFormData] = useState<FormData | null>(null);
  
  const randomNumber = Math.floor(Math.random() * 100000) + 1;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log({formData})
  }, [formData]);

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    console.log(data);
    let cunica = data.selected.map((item:Selected) => parseInt(item.cunica));
    let datosBack = {cuenta: data.cuenta, cunica, tipo: 'sandbox'};
    const totalRecargo = data.selected.reduce(
      (acc: any, curr: any) => acc + curr.totalcuota + curr.recargo,
      0,
    );
    console.log(user?.token, datosBack);
    try {
      const res = await axios.post('https://backend.tramites.lacosta.gob.ar/inmuebles/pagarCuotas', datosBack, config);
      const datos = res.data;
      setFormData(datos);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <style>
    body, html {
      width: 100vw;
      height: 100vh;
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
		.loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      background: linear-gradient(0deg, rgba(61, 180, 236, 0.2) 33%, rgb(61, 180, 236) 100%);
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    .loader::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #fff;
    }
    @keyframes rotation {
      0% { transform: rotate(0deg) }
      100% { transform: rotate(360deg)}
    } 
	</style>
      <span class="loader"></span>
      <form method="post" id="formulario" action="https://sandboxpp.asjservicios.com.ar" style="display: none">
		CallbackSuccess				<input name="CallbackSuccess" id="CallbackSuccess" value="${
      formData?.callbackSuccess
    }"/></br>
		CallbackCancel				<input name="CallbackCancel" id="CallbackCancel" value="${
      formData?.callbackCancel
    }"/></br>
		Comercio					<input name="Comercio" value="${formData?.comercio}"/></br>
		SucursalComercio			<input name="SucursalComercio" id="SucursalComercio" value="${
      formData?.sucursalComercio
    }"/></br>
		TransaccionComercioId		<input name="TransaccionComercioId" id="TransaccionComercioId" value="${randomNumber}"/></br>
		Monto						<input name="Monto" id="Monto" value="${formData?.montoEncriptado}" /></br>
    ${
      data.selected.length
        ? data.selected.map((item:Selected, index:number) => {
            return `Producto[${index}] <input key="${index}"  name="Producto[${index}]" value="${item.cuota}"/></br>`;
          })
        : console.log('no hay cuotas')
    }

		UserId						
    <input name="UserId" id="UserId" value="${formData?.id_user}"/></br>
		<button type="submit"> COMPRAR </button>
	</form>
</body>
</html>
`;
  const jsCode = `
document.getElementById("formulario").submit();
`;
  return (
    <Box flex={1}>
      {formData ? (
        <WebView
          source={{html: html}}
          style={{flex: 1}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          injectedJavaScript={jsCode}
          onMessage={event => {
            console.log('Message from WebView:', event.nativeEvent.data);
          }}
          onError={error => console.log(error)}
        />
      ) : (
        <Box flex={1}>
        </Box>
      )}
    </Box>
  );
};
