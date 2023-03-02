import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://backend.tramites.lacosta.gob.ar/'
  });