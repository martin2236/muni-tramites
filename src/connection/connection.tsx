import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://11.11.15.8:4000/'
  });

  //baseURL: 'https://backend.tramites.lacosta.gob.ar/'