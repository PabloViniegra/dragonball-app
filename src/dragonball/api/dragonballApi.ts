import axios from 'axios';

export const dragonballApi = axios.create({
    baseURL: import.meta.env.VITE_DRAGONBALL_API_URL
});
