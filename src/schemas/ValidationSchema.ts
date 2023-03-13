import { object, string, ref } from 'yup';
import axios from 'axios';


export const loginSchema = object({
    cuit: 
    string()
    .required('Ingrese un numero de CUIT')
    .max(12,'El CUIT debe tener menos de 11 caracteres')
    .test('isvalidCUIT','El cuit ingresado no es valido', function(value){return new Promise((resolve, reject) => {
        axios.get(`https://backend.tramites.lacosta.gob.ar/users/controlCuit/${parseInt(value)}`)
        .then(res => {resolve(res.data)})
    })}
    )
    ,
    clave: string().min(5,'La contraseña debe tener mas de 5 caracteres').required('ingrese una contraseña'),
  });

  export const registerSchema = object({
    nombre:
    string()
    .required('Ingrese un nombre')
    .min(5,'El nombre debe tener más de 5 caracteres'),
    cuit:
    string()
    .required('Ingrese un numero de CUIT')
    .max(12,'El CUIT debe tener menos de 11 caracteres')
    ,
    clave:
    string()
    .required('Ingrese una clave')
    ,
    verificacion:string()
    .oneOf([ref('clave')], 'Las contraseñas no coinciden.')
    ,
    mail:
    string()
    .required('Ingrese un email'),
    tipo_cuit:
    string()
    .required('Ingrese un tipo de cuit'),
    telefono:
    string()
    .required('Ingrese un telefono'),
    telefono_area:
    string()
    .required('ingrese un codigo de area'),
    celular:
    string()
    .required('Ingrese un numero de celular'),
    celular_area:
    string()
    .required('ingrese un codigo de area'),
    celular_empresa:
    string()
    .required('ingrese un nombre'),
  })