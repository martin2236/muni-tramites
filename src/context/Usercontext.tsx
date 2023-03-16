import React, { createContext } from 'react';



export interface Inmuebles {
  id:number
  nombre: string;
  cuenta: string;
  deuda: number;
  info: {
      cuentaMunicipal: string;
      partidaPovincial: string;
      categoria: string;
      codigoServicio: string;
      baseImponible: number;
      nomenclaturaCatastral: string;
  };
}
interface ContextProps  {
    inmuebleId:number | null,
    setInmuebleId:(id:number | null) => void,
    inmuebles:Inmuebles[] | null,
    setInmuebles: (inmuebles: Inmuebles[] | null) => void
  };

export const UserContext = createContext<ContextProps | null>  (null);