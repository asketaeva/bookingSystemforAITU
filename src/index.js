import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     Avatar,
//     Card,
//     Chip,
//     CircularProgress,
//     Dialog,
//     Divider,
//     Grid,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     Typography,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAuditoriumSchedule } from '../../store/AuditoriumSlice';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import moment from 'moment';

// function stringAvatar(name) {
//     return {
//         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
// }

// const DialogSchedule = ({
//     openSchedule,
//     scheduleState,
//     auditoriumID,
//     auditoriumName,
// }) => {
//     const dispatch = useDispatch();
//     const auditoriumSchedule = useSelector(
//         (state) =>
//             state.auditoriumSchedule?.auditoriumSchedule?.auditorium_schedule
//     );
//     const isLoading = useSelector(
//         (state) => state.auditoriumSchedule?.isLoading
//     );

//     const [selectedDate, setSelectedDate] = useState(null);
//     const latestAuditoriumID = useRef(auditoriumID);

//     // Remove the 'date' variable from the 'useEffect' dependency array
//     useEffect(() => {
//         if (latestAuditoriumID.current !== auditoriumID) {
//             latestAuditoriumID.current = auditoriumID;
//         }
//     }, []);

//     // Add a new 'useEffect' to trigger the API call when 'selectedDate' changes
//     useEffect(() => {
//         if (selectedDate) {
//             dispatch(getAuditoriumSchedule({ auditoriumID, date }));
//         }
//     }, [selectedDate]);

//     function handleCloseModal() {
//         scheduleState(false);
//     }

//     console.log(moment(selectedDate?.$d).format('DD.MM.YYYY'));
//     let date = moment(selectedDate?.$d).format('DD.MM.YYYY') || '';

//     if (isLoading) {
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <CircularProgress />
//             </div>
//         );
//     }
//     return (
//         <div>
//             <Dialog
//                 open={openSchedule}
//                 onClose={handleCloseModal}
//                 aria-labelledby='modal-title'
//                 aria-describedby='modal-description'
//                 className='modal'
//             >
//                 <Card>
//                     <Grid container spacing={2} style={{ padding: '30px' }}>
//                         {/* <Grid item xs={12} style={{ marginTop: '20px' }}>

//                         </Grid> */}
//                         <ArrowBackIcon onClick={handleCloseModal} />
//                         <Grid
//                             item
//                             xs={12}
//                             style={{
//                                 display: 'flex',
//                                 marginBottom: '10px',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <Typography
//                                 style={{
//                                     fontSize: '20px',
//                                 }}
//                             >
//                                 Schedule for Auditorium {auditoriumName}
//                             </Typography>
//                         </Grid>
//                         <Divider />
//                         <div
//                             style={{
//                                 width: '180px',
//                                 display: 'flex',
//                                 marginBottom: '10px',
//                                 justifyContent: 'center',
//                                 alignItems: 'center', // Added property to center vertically
//                                 margin: '0 auto', // Added property to center horizontally
//                             }}
//                         >
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DatePicker
//                                     format='DD.MM.YYYY'
//                                     value={selectedDate}
//                                     onChange={(newDate) =>
//                                         setSelectedDate(newDate)
//                                     }
//                                 />
//                             </LocalizationProvider>
//                         </div>
//                         <div
//                             style={{
//                                 height: '500px',
//                                 width: '100%',
//                                 padding: '30px',
//                                 margin: '20px',
//                                 overflowY: 'scroll',
//                             }}
//                         >
//                             {auditoriumSchedule?.length > 0 &&
//                                 auditoriumSchedule.map((item, index) => (
//                                     <Grid
//                                         item
//                                         xs={12}
//                                         style={{ marginTop: '10px' }}
//                                         key={index}
//                                     >
//                                         <ListItem alignItems='flex-start'>
//                                             <ListItemAvatar>
//                                                 <Avatar
//                                                     {...stringAvatar(
//                                                         item.instructor_name
//                                                     )}
//                                                 />
//                                             </ListItemAvatar>
//                                             <ListItemText
//                                                 primary={`Teacher: ${
//                                                     item.is_from_booking
//                                                         ? item.booking_instructor_name
//                                                         : item.instructor_name
//                                                 }`}
//                                                 secondary={
//                                                     <React.Fragment>
//                                                         <Typography
//                                                             component='span'
//                                                             variant='body2'
//                                                             color='text.primary'
//                                                         >
//                                                             Course:{' '}
//                                                             {item.subject_name}
//                                                             <br />
//                                                             Time:{' '}
//                                                             {
//                                                                 item.auditorium_day_date_begin
//                                                             }{' '}
//                                                             -{' '}
//                                                             {
//                                                                 item.auditorium_day_date_end
//                                                             }
//                                                         </Typography>
//                                                     </React.Fragment>
//                                                 }
//                                                 sx={{
//                                                     marginBottom: '5px',
//                                                 }}
//                                             />
//                                             <Divider
//                                                 style={{
//                                                     marginBottom: '7px',
//                                                     marginTop: '7px',
//                                                 }}
//                                             />
//                                         </ListItem>
//                                         <ListItem alignItems='flex-start'>
//                                             {item.is_from_booking ? (
//                                                 <Chip
//                                                     key={
//                                                         item.booking_group_name
//                                                     }
//                                                     label={
//                                                         item.booking_group_name ||
//                                                         'no data'
//                                                     }
//                                                     variant='outlined'
//                                                     style={{
//                                                         marginBottom: '5px',
//                                                         marginRight: '5px',
//                                                     }}
//                                                 />
//                                             ) : (
//                                                 item.groups?.map((group) => (
//                                                     <Chip
//                                                         key={group.group_id}
//                                                         label={
//                                                             group.group_name ||
//                                                             'no data'
//                                                         }
//                                                         variant='outlined'
//                                                         style={{
//                                                             marginBottom: '5px',
//                                                             marginRight: '5px',
//                                                         }}
//                                                     />
//                                                 ))
//                                             )}
//                                         </ListItem>
//                                     </Grid>
//                                 ))}
//                         </div>
//                     </Grid>
//                 </Card>
//             </Dialog>
//         </div>
//     );
// };

// export default DialogSchedule;

// import React, { useMemo, useState } from 'react';
// import { Button, Card, Dialog, Grid, Typography } from '@mui/material';
// import '../style.css';
// import DialogForBookingForm from './DialogForBookingForm';
// import DialogSchedule from './DialogSchedule';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// const DialogChoice = ({
//     openDialog,
//     dialogState,
//     auditoriumID,
//     auditoriumName,
// }) => {
//     const [open, setOpen] = useState(false);
//     const [openSchedule, setOpenSchedule] = useState(false);

//     function handleCloseModal() {
//         dialogState(false);
//     }

//     function openBookingForm(polyline) {
//         setOpen(true);
//     }
//     function openScheduleView(polyline) {
//         setOpenSchedule(true);
//     }
//     return (
//         <div>
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseModal}
//                 aria-labelledby='modal-title'
//                 aria-describedby='modal-description'
//                 className='modal'
//             >
//                 <Card>
//                     <Grid container spacing={2} style={{ padding: '30px' }}>
//                         <Grid item xs={12}>
//                             <ArrowBackIcon onClick={handleCloseModal} />
//                             <Typography
//                                 style={{
//                                     display: 'flex',
//                                     fontSize: '20px',
//                                     marginBottom: '20px',
//                                     justifyContent: 'center',
//                                 }}
//                             >
//                                 Choose one of the option
//                             </Typography>
//                         </Grid>

//                         <Grid item xs={6} style={{ marginTop: '20px' }}>
//                             <Button
//                                 onClick={openScheduleView}
//                                 variant='outlined'
//                                 style={{ width: '100%' }}
//                                 size='large'
//                             >
//                                 View Schedule
//                             </Button>
//                         </Grid>
//                         <Grid
//                             item
//                             xs={6}
//                             style={{
//                                 marginTop: '20px',
//                             }}
//                         >
//                             <Button
//                                 onClick={openBookingForm}
//                                 variant='contained'
//                                 style={{ width: '100%' }}
//                                 size='large'
//                             >
//                                 Open Booking Form
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Card>
//             </Dialog>
//             <DialogForBookingForm openForm={open} formState={setOpen} />
//             <DialogSchedule
//                 openSchedule={openSchedule}
//                 scheduleState={setOpenSchedule}
//                 auditoriumID={auditoriumID}
//                 auditoriumName={auditoriumName}
//             />
//         </div>
//     );
// };

// export default DialogChoice;
