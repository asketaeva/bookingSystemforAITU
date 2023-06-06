import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Card,
    Chip,
    Divider,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditoriumSchedule } from '../../store/AuditoriumSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import dayjs from 'dayjs';

function stringAvatar(name) {
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const today = dayjs();

const ViewSchedule = React.memo(({ auditoriumID, auditoriumName }) => {
    const dispatch = useDispatch();
    const auditoriumSchedule = useSelector(
        (state) =>
            state.auditoriumSchedule?.auditoriumSchedule?.auditorium_schedule
    );

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            dispatch(
                getAuditoriumSchedule({
                    auditoriumID,
                    date: moment(selectedDate?.$d).format('DD.MM.YYYY') || '',
                })
            );
        }
    }, [dispatch, auditoriumID, selectedDate]);

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    return (
        <div>
            <Card>
                <Grid container spacing={2} style={{ padding: '30px' }}>
                    <Grid
                        item
                        xs={12}
                        style={{
                            display: 'flex',
                            marginBottom: '10px',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            Schedule for Auditorium {auditoriumName}
                        </Typography>
                    </Grid>

                    <div
                        style={{
                            width: '230px',
                            display: 'flex',
                            marginBottom: '10px',
                            justifyContent: 'center',
                            alignItems: 'center', // Added property to center vertically
                            margin: '0 auto', // Added property to center horizontally
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format='DD.MM.YYYY'
                                value={selectedDate}
                                onAccept={handleDateChange}
                                slotProps={{ textField: { size: 'small' } }}
                                defaultValue={today}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        {auditoriumSchedule?.length > 0 &&
                            auditoriumSchedule.map((item, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        width: '100%',
                                        padding: '30px',
                                        marginLeft: '40px',
                                    }}
                                    key={index}
                                >
                                    <ListItem alignItems='flex-center'>
                                        <ListItemAvatar>
                                            <Avatar
                                                {...stringAvatar(
                                                    item.instructor_name
                                                )}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`Teacher: ${
                                                item.is_from_booking
                                                    ? item.booking_instructor_name
                                                    : item.instructor_name
                                            }`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        color='text.primary'
                                                    >
                                                        Course:{' '}
                                                        {item.subject_name}
                                                        <br />
                                                        Time:{' '}
                                                        {
                                                            item.auditorium_day_date_begin
                                                        }{' '}
                                                        -{' '}
                                                        {
                                                            item.auditorium_day_date_end
                                                        }
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                            sx={{
                                                marginBottom: '5px',
                                            }}
                                        />
                                        <Divider
                                            style={{
                                                marginBottom: '7px',
                                                marginTop: '7px',
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem alignItems='flex-start'>
                                        {item.is_from_booking ? (
                                            <Chip
                                                key={item.booking_group_name}
                                                label={
                                                    item.booking_group_name ||
                                                    'no data'
                                                }
                                                variant='outlined'
                                                style={{
                                                    marginBottom: '5px',
                                                    marginRight: '5px',
                                                }}
                                            />
                                        ) : (
                                            item.groups?.map((group) => (
                                                <Chip
                                                    key={group.group_id}
                                                    label={
                                                        group.group_name ||
                                                        'no data'
                                                    }
                                                    variant='outlined'
                                                    style={{
                                                        marginBottom: '5px',
                                                        marginRight: '5px',
                                                    }}
                                                />
                                            ))
                                        )}
                                    </ListItem>
                                </Grid>
                            ))}
                    </div>
                </Grid>
            </Card>
        </div>
    );
});

export default ViewSchedule;
