import { combineReducers } from 'redux';
import auditorium from './AuditoriumSlice.js';
import auditoriumSchedule from './AuditoriumSlice.js';
import auth from './AuthSlice.js';
import groupAndInstructor from './GroupAndInstuctorSlice.js';
import user from './UserInfoSlice.js';
import bookingAuditorium from './BookingAuditoriumSlice';
import requests from './RequestsSlice.js';
import requestStatus from './RequestsSlice.js';

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auditorium,
        bookingAuditorium,
        auditoriumSchedule,
        auth,
        groupAndInstructor,
        user,
        requests,
        requestStatus,
        ...asyncReducers,
    });
    return combinedReducer(state, action);
};

export default rootReducer;
