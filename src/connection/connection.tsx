import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://192.168.254.8:4000/'
  });
  //? NUBE
  //baseURL: 'https://backend.tramites.lacosta.gob.ar/'

  //? LOCAL
  // 'http://11.11.15.8:4000/'