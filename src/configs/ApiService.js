import axios from 'axios';
import { API_BASE_URL } from './Environment';
import { AUTH_TOKEN } from '../store/constants';

import store from '../store';
import { refreshTokenAccess, signOut } from '../store/AuthSlice';

const unauthorizedCode = [401, 404];

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
});

const TOKEN_PAYLOAD_KEY = 'Authorization';

service.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;
        console.log('jwtToken', jwtToken);
        if (jwtToken) {
            config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
        }
        console.log('Config', config);
        return config;
    },
    (error) => {
        // Handle the request error here
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        console.log(response);

        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (unauthorizedCode.includes(error.response.status)) {
            try {
                const refresh = localStorage.getItem('REFRESH_TOKEN');
                const token = await store.dispatch(
                    refreshTokenAccess({ refresh })
                );

                console.log(token);
                if (token === null) {
                    store.dispatch(signOut());
                }
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                console.log('axios(originalRequest)', axios(originalRequest));
                return axios(originalRequest);
            } catch (error) {
                console.error('error', error);
                store.dispatch(signOut());
                return Promise.reject(error);
            }
        }
        if (error.response.status === 404) {
            return 'Not Found';
        }

        if (error.response.status === 500) {
            return 'Internal Server Error';
        }

        if (error.response.status === 508) {
            return 'Time Out';
        }
        if (error.response.status === 502) {
            return <div>Bad Gateway</div>;
        }
        if (error.response.status === 403) {
            return store.dispatch(signOut());
        }

        return Promise.reject(error);
    }
);
export default service;
