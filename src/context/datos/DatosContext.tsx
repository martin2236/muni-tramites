import React, { createContext } from 'react';

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
    inmuebles:Inmueble[] | null
    inmuebleId:number | null
    setInmuebleId:(id:number | null) => void,
}

const initialState = {
    inmuebles:[],
    inmuebleId:null,
    setInmuebleId:() => {},
}

export const DatosContext = createContext<DatosInterface>(initialState);
