import axios from 'axios';
import ApiService from '../configs/ApiService';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../store/constants';
import { API_BASE_URL } from '../configs/Environment';
// import { AUTH_TOKEN, REFRESH_TOKEN } from '../constants/AuthConstant';

const AuthService = {};

AuthService.login = async function (email, password) {
    try {
        const response = await ApiService.post(
            '/auth/login/',
            {
                email: email,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('response', response);
        return response;
    } catch (e) {
        console.error(e.response.data);
        throw e;
    }
};

AuthService.refreshToken = async function (refresh) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/token/refresh/`,
            { refresh: refresh },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        REFRESH_TOKEN
                    )}`,
                },
            }
        );
        return response;
    } catch (e) {
        throw e;
    }
};

AuthService.register = async function (
    email,
    password,
    fio,
    is_staff,
    group_id,
    instructor_id,
    code
) {
    try {
        const response = await ApiService.post(
            '/auth/signup/',
            {
                email: email,
                password: password,
                fio: fio,
                is_staff: is_staff,
                group_id,
                instructor_id,
                code,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('response', response.data.is_email_exist);
        return response;
    } catch (e) {
        //TODO: Throw proper exception

        console.error(e);
        throw e;
    }
};

export default AuthService;
