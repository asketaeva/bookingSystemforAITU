import ApiService from '../configs/ApiService';
import { AUTH_TOKEN } from '../store/constants';
const UserService = {};

UserService.get_user_info = async function () {
    try {
        console.log('TRY');
        const response = await ApiService.get('/auth/user_info/read/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
            },
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};

UserService.group = async function () {
    try {
        console.log('TRY');
        const response = await ApiService.get(
            '/auditorium/common/groups/read/',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('responsennjkmmk', response);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error to propagate it to the caller
    }
};

UserService.instructor = async function () {
    try {
        const response = await ApiService.get(
            '/auditorium/common/instructors/read/',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('responseIns', response);
        return response.data;
    } catch (e) {
        console.error(e);
    }
};

export default UserService;
