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
interface ContextProps  {
    inmuebleId:number | null,
    setInmuebleId:(id:number | null) => void,
    inmuebles:Inmuebles[] | null,
    setInmuebles: (inmuebles: Inmuebles[] | null) => void
  };

export const UserContext = createContext<ContextProps | null>  (null);