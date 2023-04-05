import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://backend.tramites.lacosta.gob.ar/'
  });
  //? NUBE
  //baseURL: 'https://backend.tramites.lacosta.gob.ar/'

  //? LOCAL
  // 'http://11.11.15.8:4000/'

  //? local notebook
  //'http://192.168.254.8:4000/'