import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://backend.tramites.lacosta.gob.ar/'
  });
  //? NUBE
  //baseURL: 'https://backend.tramites.lacosta.gob.ar/'

  //? LOCAL
  // 'http://11.11.15.8:4000/'