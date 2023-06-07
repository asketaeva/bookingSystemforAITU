import ApiService from '../configs/ApiService';
import { AUTH_TOKEN } from '../store/constants';
const HistoryService = {};

HistoryService.post_change_status_configs = async function (
    request_status_config_id
) {
    try {
        const response = await ApiService.post(
            '/auditorium/common/request_status_configs/change/',
            { request_status_config_id: request_status_config_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

HistoryService.get_request_status_configs = async function () {
    try {
        const response = await ApiService.get(
            '/auditorium/common/request_status_configs/read/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
                },
            }
        );
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};

HistoryService.approve_request_post = async function (
    booking_request_id,
    booking_request_status_id,
    reason_for_refuse
) {
    try {
        const response = await ApiService.post(
            `/auditorium/request/approve/`,
            {
                booking_request_id: booking_request_id,
                booking_request_status_id: booking_request_status_id,
                reason_for_refuse: reason_for_refuse,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
                },
            }
        );
        console.log('response', response);
        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

HistoryService.get_status = async function () {
    try {
        console.log('TRY');
        const response = await ApiService.get(
            '/auditorium/common/booking_request_statuses/read/',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('GETSTATUS', response);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error to propagate it to the caller
    }
};

HistoryService.get_requests = async function () {
    try {
        const response = await ApiService.get('/auditorium/requests/', {
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

export default HistoryService;
