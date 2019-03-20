import axios from 'axios';

export const http = axios.create({
    baseURL: "https://crush-management.herokuapp.com/api/"
});