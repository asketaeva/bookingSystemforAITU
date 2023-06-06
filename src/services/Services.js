import ApiService from '../configs/ApiService';
import { AUTH_TOKEN } from '../store/constants';
const AuditoriumService = {};

AuditoriumService.book_auditorium_post = async function (
    reason,
    date,
    datetime_from,
    datetime_to,
    auditoriumID
) {
    try {
        const response = await ApiService.post(
            `/auditorium/${auditoriumID}/request/?day=${date}`,
            {
                reason: reason,
                datetime_from: datetime_from,
                datetime_to: datetime_to,
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
        //TODO: Throw proper exception
        console.error(e);
        throw e;
    }
};

AuditoriumService.get_auditorium = async function () {
    try {
        const response = await ApiService.get('/auditorium/read/', {
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

AuditoriumService.get_auditorium_schedule = async function (
    auditoriumID,
    date
) {
    console.log('auditoriumID service', auditoriumID, date);
    try {
        const response = await ApiService.get(
            `/auditorium/${auditoriumID}/read/schedule/?day=${date}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
                },
            }
        );
        console.log('response', response);
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};
export default AuditoriumService;
