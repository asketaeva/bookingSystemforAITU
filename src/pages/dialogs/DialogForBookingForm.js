import React, { useState } from 'react';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import '../../style.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { bookAuditorium } from '../../store/BookingAuditoriumSlice';

const todayAtNoon = dayjs().set('hour', 8).startOf('hour');
const todayAt3PM = dayjs().set('hour', 20).startOf('hour');

const BookingForm = ({ handleCloseModal, auditoriumID }) => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.bookingAuditorium.error);
    const [bookReason, setBookReason] = useState('');
    const [seletedDateFrom, setSeletedDateFrom] = useState(null);
    const [seletedDateTo, setSeletedDateTo] = useState(null);
    const [success, setSuccess] = useState(false);

    const onChangeReason = (e) => {
        setBookReason(e.target.value);
    };

    function onChangeTimeFrom(timeFrom) {
        setSeletedDateFrom(timeFrom);
    }

    function onChangeTimeTo(timeTo) {
        setSeletedDateTo(timeTo);
    }

    const handleSubmit = async () => {
        let payload = {};
        if (seletedDateFrom !== undefined) {
            payload = {
                reason: bookReason,
                date: moment(seletedDateFrom?.$d).format('DD.MM.YYYY') || '',
                datetime_from:
                    moment(seletedDateFrom?.$d)
                        .format('YYYY-MM-DD HH:mm:ss')
                        .toString() || '',
                datetime_to:
                    moment(seletedDateTo.$d)
                        .format('YYYY-MM-DD HH:mm:ss')
                        .toString() || '',
                auditoriumID,
            };
        }

        try {
            const response = await dispatch(bookAuditorium(payload));
            setSuccess(true);
            if (response.error.message !== 'Rejected') {
                handleCloseModal();
            }

            console.log(response);
        } catch (error) {
            console.error(error);
            // Отобразить сообщение об ошибке для пользователя
        }
    };

    return (
        <div>
            <Grid container spacing={2} style={{ padding: '30px' }}>
                <Grid item xs={12}>
                    <Typography
                        style={{
                            fontSize: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        Form for Booking classroom (classroom number)
                    </Typography>
                </Grid>
                <br />

                <Grid item xs={12}>
                    <Typography>Write for what events</Typography>

                    <TextField
                        required
                        id='outlined-required'
                        label='This request will be send to someone'
                        style={{
                            width: '100%',
                            marginBottom: '20px',
                            marginTop: '10px',
                        }}
                        variant='outlined'
                        value={bookReason}
                        onChange={onChangeReason}
                    />
                </Grid>

                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            defaultValue={todayAtNoon}
                            minDateTime={todayAt3PM}
                            value={seletedDateFrom}
                            onChange={onChangeTimeFrom}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            defaultValue={todayAtNoon}
                            minDateTime={todayAt3PM}
                            value={seletedDateTo}
                            onChange={onChangeTimeTo}
                        />
                    </LocalizationProvider>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Alert severity='error'>
                            <Typography variant='body1'>
                                {error || ''}
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                <Grid item xs={6} style={{ marginTop: '20px' }}>
                    <Button
                        onClick={handleCloseModal}
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='large'
                    >
                        reject
                    </Button>
                </Grid>

                <Grid
                    item
                    xs={6}
                    style={{
                        marginTop: '20px',
                    }}
                >
                    {success ? (
                        <Button
                            variant='contained'
                            style={{ width: '100%' }}
                            size='large'
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    ) : (
                        <Button
                            variant='contained'
                            style={{ width: '100%' }}
                            size='large'
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default BookingForm;
