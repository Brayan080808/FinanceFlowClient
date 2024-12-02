import axios from 'axios';
const serverUrl = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  withCredentials: true, // Para enviar cookies con las solicitudes
});

export default serverUrl;