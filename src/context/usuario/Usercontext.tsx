import React, { createContext } from 'react';

export interface Periodo{
 fecha:{ 
  mes: string,
  vencimiento: string,
  estado: string
  total:number
 }
}

export interface Deuda{
  total:number,
  periodos:Periodo[]
}

export interface Info{
      cuentaMunicipal: string;
      partidaPovincial: string;
      categoria: string;
      codigoServicio: string;
      baseImponible: number;
      nomenclaturaCatastral: string;
}

export interface Inmuebles {
  id:number
  nombre: string;
  cuenta: string;
  deuda: Deuda;
  info:Info
}

export interface User {
  pkusuario:          number;
  cuit:               number;
  cuit_baja:          null;
  tipo_cuit:          string;
  nombre:             string;
  clave:              string;
  mail:               string;
  telefono:           string;
  telefono_area:      string;
  celular:            string;
  celular_area:       string;
  celular_empresa:    string;
  fkestado:           number;
  token_confirmacion: string;
  mails_enviados:     number;
  fecha_registro:     Date;
  token?:             string
}

export interface CarouselStatus{
    estado:string | null
}

export interface ContextProps  {
    user: User | null,
    setUser: (user: User | null) => void,
    carouselStatus:CarouselStatus,
    setCarouselVerification: React.Dispatch<React.SetStateAction<boolean>>
  };

  const initialState = {
    user:null,
    setUser:() => {},
    carouselStatus:{estado:null},
    setCarouselVerification:() => {}
  }
export const UserContext = createContext<ContextProps>(initialState);