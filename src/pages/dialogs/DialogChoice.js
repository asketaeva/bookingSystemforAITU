import React, { useMemo, useState } from 'react';
import {
    Button,
    Card,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import '../../style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewSchedule from './DialogSchedule';
import BookingForm from './DialogForBookingForm';
const DialogChoice = ({
    openDialog,
    dialogState,
    auditoriumID,
    auditoriumName,
}) => {
    const [value, setValue] = React.useState('schedule');

    function handleCloseModal() {
        dialogState(false);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleCloseModal}
                aria-labelledby='modal-title'
                aria-describedby='modal-description'
                className='modal'
            >
                <FormControl>
                    <ArrowBackIcon
                        style={{
                            display: 'flex',
                            fontSize: '20px',
                            marginLeft: '30px',
                            marginTop: '30px',
                        }}
                        onClick={handleCloseModal}
                    />{' '}
                    <Typography
                        style={{
                            display: 'flex',
                            fontSize: '20px',
                            margin: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        Choose one of the option
                    </Typography>
                    <RadioGroup
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                        style={{
                            display: 'flex',
                            fontSize: '20px',
                            marginBottom: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        <FormControlLabel
                            value='schedule'
                            control={<Radio />}
                            label='View Schedule'
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            value='booking'
                            control={<Radio />}
                            label='Booking Auditorium'
                            onChange={handleChange}
                        />
                    </RadioGroup>
                    <Divider variant='middle' />
                </FormControl>
                {value === 'schedule' && (
                    <ViewSchedule
                        auditoriumID={auditoriumID}
                        auditoriumName={auditoriumName}
                    />
                )}
                {value === 'booking' && (
                    <BookingForm
                        handleCloseModal={handleCloseModal}
                        auditoriumID={auditoriumID}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default DialogChoice;
