import axios from 'axios';
import { API_BASE_URL } from '../configs/Environment';

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
});

export default service;
