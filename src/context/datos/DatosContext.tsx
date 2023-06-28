import React, { createContext } from 'react';
import { Cuota } from '../../interfaces/inmuebles/deuda';

export interface Inmueble {
    pkinmueble:     number;
    fkusuario:      number;
    cuenta:         number;
    partida:        number;
    descripcion:    string;
    titular:        number;
    eliminado:      number;
    fecha_registro: Date;
    t_desvie:       string;
    t_lugar:        string;
    condicontri:    string;
    d_vefi:         number;
    condi:          string;
    t_web:          string;
}

export interface Comercio {
    pkcomercio:     number;
    fkusuario:      number;
    padron:         number;
    descripcion:    string;
    titular:        number;
    eliminado:      number;
    fecha_registro: Date;
    t_desvie:       string;
    t_lugar:        string;
    condicontri:    string;
    cuit:           string;
    condicio:       string;
    razosoci:       string;
    iniciogc:       null;
    condi:          string;
}

export interface Cementerio {
    pkcementerio:   number;
    fkusuario:      number;
    num_orden:      number;
    eliminado:      number;
    descripcion:    string;
    fecha_registro: Date;
    fnrorden:       number;
    fapenom:        string;
}

export interface Vehiculo {
    dominio:     string;
    tipo:        string;
    fecbaja:     string;
    condicontri: string;
    condimoncho: number;
    descripcion: string;
}

export interface updateInfo {
    ruta:string,
    actualizar:boolean
}

interface DatosInterface{
    comercios:Comercio[] | null,
    cementerios:Cementerio[] | null,
    inmuebles:Inmueble[] | null,
    vehiculos:Vehiculo[] | null,
    cuotas:Cuota[] | [],
    setCuotas:(cuotas:Cuota[] | []) => void,
    numeroCuota:number[] | [],
    setNumeroCuota:(lista:number[] | []) => void,
    inmuebleId:number | null,
    setInmuebleId:(id:number | null) => void,
    updated:updateInfo,
    setUpdated:({}:updateInfo) => void,
    cuotasSeleccionadas:Cuota[] | [],
    setCuotasSeleccionadas:(cuotas:Cuota[] | []) => void,
}

const initialState = {
    comercios:[],
    cementerios:[],
    inmuebles:[],
    vehiculos:[],
    cuotas:[],
    setCuotas:() => {},
    numeroCuota:[],
    setNumeroCuota:() => {},
    inmuebleId:null,
    setInmuebleId:() => {},
    updated:{ruta:'',actualizar:false},
    setUpdated:() => {},
    cuotasSeleccionadas:[],
    setCuotasSeleccionadas:() => {},
}

export const DatosContext = createContext<DatosInterface>(initialState);
