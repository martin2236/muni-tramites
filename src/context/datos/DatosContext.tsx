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

interface DatosInterface{
    inmuebles:Inmueble[] | null,
    cuotas:Cuota[] | [],
    setCuotas:(cuotas:Cuota[] | []) => void,
    numeroCuota:number[] | [],
    setNumeroCuota:(lista:number[] | []) => void,
    inmuebleId:number | null,
    setInmuebleId:(id:number | null) => void,
}

const initialState = {
    inmuebles:[],
    cuotas:[],
    setCuotas:() => {},
    numeroCuota:[],
    setNumeroCuota:() => {},
    inmuebleId:null,
    setInmuebleId:() => {},
}

export const DatosContext = createContext<DatosInterface>(initialState);
