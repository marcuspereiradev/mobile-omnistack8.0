// To access api url in the Android Studio emulator, change localhost by 10.0.2.2 
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:3333'
});

export default API;
