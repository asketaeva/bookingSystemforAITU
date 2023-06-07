import React, { useEffect, useState } from 'react';
import HeaderBar from '../HeaderBar';
import {
    Alert,
    Button,
    Card,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import FileDownloadDoneTwoToneIcon from '@mui/icons-material/FileDownloadDoneTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import {
    approveRequestPost,
    changeStatusConfigs,
    getRequestStatusConfigs,
    getRequests,
    getStatus,
} from '../../store/RequestsSlice';
import { getUser } from '../../store/UserInfoSlice';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

const History = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests.requests.requests);
    const error = useSelector((state) => state.requests.error);
    const users = useSelector((state) => state.user.user);
    const status = useSelector(
        (state) => state.requestStatus.status.booking_request_status_ids
    );
    const statusConfigs = useSelector(
        (state) => state.requests.statusConfigs.request_status_configs
    );
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedStatusConfigs, setSelectedStatusConfigs] = useState(1);

    const [displayItems, setDisplayItems] = useState(false);
    const [displayTextField, setDisplayTextField] = useState(
        Array((requests && requests.length) || 0).fill(false)
    );
    const [refuseReason, setRefuseReason] = useState(
        Array((requests && requests.length) || 0).fill('smth')
    );
    useEffect(() => {
        dispatch(getRequests());
        dispatch(getUser());
        dispatch(getStatus());
        dispatch(getRequestStatusConfigs());
    }, []);
    const isSuperuser = users?.user_info?.is_superuser || 'no data';
    const user = users?.user_info?.user_id || 'no data';

    console.log('statusConfigs', statusConfigs?.request_status_config_id);

    const handleSelectedStatus = (event) => {
        const selectedRequestStatus = event.target.value;
        if (selectedRequestStatus === 'All') {
            setSelectedStatus(null);
            setDisplayItems(true);
            return;
        }
        const selectedStatus = status.find(
            (item) => item.booking_request_status_name === selectedRequestStatus
        );
        setSelectedStatus(selectedStatus);
        setDisplayItems(true);
    };

    const handleStatusConfigs = async (event) => {
        const selectedRequestStatusConfigs = event.target.value;
        console.log(
            'selectedRequestStatusConfigs',
            selectedRequestStatusConfigs
        );
        let payload = {};
        if (selectedRequestStatusConfigs !== undefined) {
            payload = {
                request_status_config_id: selectedRequestStatusConfigs,
            };
            setSelectedStatusConfigs(selectedRequestStatusConfigs);
        }

        try {
            const response = await dispatch(changeStatusConfigs(payload));
            // setSuccess(true);
            // if (response.error.message !== 'Rejected') {
            //     handleCloseModal();
            // }

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    function SortListStatus(status) {
        // console.log('STATUS', status);
        if (status === 'ACCEPTED') {
            return (
                <EventAvailableTwoToneIcon
                    sx={{
                        color: 'green',
                        fontSize: 40,
                    }}
                />
            );
        } else if (status === 'WAITING') {
            return (
                <EventTwoToneIcon
                    sx={{
                        color: 'blue',
                        fontSize: 40,
                    }}
                />
            );
        } else if (status === 'REFUSED') {
            return (
                <EventBusyTwoToneIcon
                    sx={{
                        fontSize: 40,
                    }}
                />
            );
        }
    }

    const handleRefuseReason = (value, index) => {
        const updatedRefuseReason = [...displayTextField];
        updatedRefuseReason[index] = value;
        setRefuseReason(updatedRefuseReason);
    };

    const handleActionRequest = async (
        bookingRequestId,
        action,
        refuseReason
    ) => {
        try {
            let selectedStatusId;

            if (action === 'accept') {
                selectedStatusId = status.find(
                    (item) => item.booking_request_status_code === 'ACCEPTED'
                )?.booking_request_status_id;
            }

            if (action === 'refuse') {
                selectedStatusId = status.find(
                    (item) => item.booking_request_status_code === 'REFUSED'
                )?.booking_request_status_id;
            }

            const payload = {
                booking_request_id: bookingRequestId,
                booking_request_status_id: selectedStatusId,
                reason_for_refuse: refuseReason,
            };
            await dispatch(approveRequestPost(payload));
            dispatch(getRequests());
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const renderListItem = (item, index) => {
        const isButtonHidden =
            displayTextField[index] ||
            item.booking_request_status_code === 'REFUSED';
        return (
            <>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={4}
                        lg={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '16px',
                        }}
                    >
                        {item.booking_request_status_name}{' '}
                    </Grid>
                    <Grid
                        item
                        lg={1}
                        xs={4}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemIcon>
                            {SortListStatus(item.booking_request_status_code)}
                        </ListItemIcon>
                    </Grid>

                    <Grid item lg={5} xs={12}>
                        <ListItemText
                            primary={
                                <div>
                                    For: {item.reason} <br />{' '}
                                    <div
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        Auditorium: {item.auditorium_name}
                                    </div>
                                </div>
                            }
                            secondary={
                                <>
                                    {moment(item.datetime_to).format(
                                        'dddd, DD.MM.YYYY, h:mma'
                                    )}
                                    {' - '}
                                    {moment(item.datetime_from).format(
                                        ' h:mma'
                                    )}
                                </>
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        lg={5}
                        xs={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'end', // Aligns content to the end horizontally
                            alignItems: 'center', // Centers content vertically
                            paddingRight: '15px', // Adjusts the right padding
                        }}
                    >
                        <>
                            {isSuperuser === true &&
                                (item.booking_request_status_code ===
                                'WAITING' ? (
                                    <>
                                        <div
                                            style={{
                                                paddingRight: '10px', // Adjusts the right padding
                                            }}
                                        >
                                            <Button
                                                variant='outlined'
                                                edge='end'
                                                sx={{
                                                    color: 'green',
                                                }}
                                                color='success'
                                                onClick={() =>
                                                    handleActionRequest(
                                                        item.booking_request_id,
                                                        'accept'
                                                    )
                                                }
                                            >
                                                <FileDownloadDoneTwoToneIcon />
                                            </Button>
                                        </div>
                                        {!isButtonHidden && (
                                            <Button
                                                variant='outlined'
                                                edge='end'
                                                sx={{
                                                    color: 'red',
                                                }}
                                                color='error'
                                                onClick={() =>
                                                    setDisplayTextField(
                                                        (prevState) => {
                                                            const updatedState =
                                                                [...prevState];
                                                            updatedState[
                                                                index
                                                            ] = true;
                                                            return updatedState;
                                                        }
                                                    )
                                                }
                                            >
                                                <DeleteTwoToneIcon />
                                            </Button>
                                        )}
                                    </>
                                ) : item.booking_request_status_code ===
                                  'ACCEPTED' ? (
                                    <>
                                        {!isButtonHidden && (
                                            <Button
                                                variant='outlined'
                                                edge='end'
                                                sx={{
                                                    color: 'red',
                                                }}
                                                color='error'
                                                onClick={() =>
                                                    setDisplayTextField(
                                                        (prevState) => {
                                                            const updatedState =
                                                                [...prevState];
                                                            updatedState[
                                                                index
                                                            ] = true;
                                                            return updatedState;
                                                        }
                                                    )
                                                }
                                            >
                                                <DeleteTwoToneIcon />
                                            </Button>
                                        )}{' '}
                                    </>
                                ) : item.booking_request_status_code ===
                                  'REFUSED' ? (
                                    <Button
                                        variant='outlined'
                                        edge='end'
                                        sx={{
                                            color: 'green',
                                        }}
                                        color='success'
                                        onClick={() =>
                                            handleActionRequest(
                                                item.booking_request_id,
                                                'accept'
                                            )
                                        }
                                    >
                                        <FileDownloadDoneTwoToneIcon />
                                    </Button>
                                ) : null)}

                            {user && <></>}
                        </>
                        {displayTextField[index] && (
                            <>
                                <TextField
                                    value={refuseReason[index] || ''}
                                    onChange={(event) =>
                                        handleRefuseReason(
                                            event.target.value,
                                            index
                                        )
                                    }
                                    id='outlined-size-small'
                                    size='small'
                                    style={{
                                        width: '100%',
                                        paddingLeft: '15px',
                                        paddingRight: '15px',
                                    }}
                                />
                                <Button
                                    variant='outlined'
                                    edge='end'
                                    sx={{
                                        color: 'red',
                                    }}
                                    color='error'
                                    onClick={() =>
                                        handleActionRequest(
                                            item.booking_request_id,
                                            'refuse',
                                            refuseReason[index]
                                        )
                                    }
                                >
                                    <DeleteTwoToneIcon />
                                </Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </>
        );
    };
    const selectedStatusValue = selectedStatus
        ? selectedStatus.booking_request_status_name
        : 'All';
    const selectedStatusConfigsValue = selectedStatusConfigs
        ? statusConfigs?.request_status_config_id
        : 1;
    return (
        <div>
            {error && (
                <div>
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '10px',
                            left: '10px',
                            zIndex: '9999',
                            width: '50%',
                        }}
                    >
                        <Alert severity='error'>
                            <Typography variant='body1'>{error}</Typography>
                        </Alert>
                    </div>
                </div>
            )}
            <HeaderBar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    marginTop: '100px',
                    height: '100vh',
                }}
            >
                <Card
                    sx={{
                        width: '1000px',
                        padding: '30px',
                    }}
                >
                    <Grid container spacing={2} sx={{ padding: '30px' }}>
                        <Grid item lg={5}>
                            <Typography
                                sx={{
                                    fontFamily: 'Roboto',
                                    color: 'inherit',
                                    fontSize: '20px',
                                }}
                            >
                                History of booking classrooms
                            </Typography>
                        </Grid>

                        <Grid item lg={3}>
                            <Select
                                value={selectedStatusValue}
                                onChange={handleSelectedStatus}
                                displayEmpty
                                sx={{ width: '100%' }}
                                size='small'
                            >
                                <MenuItem value='All'>All</MenuItem>
                                {status &&
                                    status.length > 0 &&
                                    status.map((option) => (
                                        <MenuItem
                                            key={
                                                option.booking_request_status_id
                                            }
                                            value={
                                                option.booking_request_status_name
                                            }
                                        >
                                            {option.booking_request_status_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>

                        <Grid item lg={4}>
                            <Select
                                value={selectedStatusConfigsValue}
                                onChange={handleStatusConfigs}
                                displayEmpty
                                sx={{ width: '100%' }}
                                size='small'
                            >
                                {statusConfigs &&
                                    statusConfigs.length > 0 &&
                                    statusConfigs.map((option) => (
                                        <MenuItem
                                            key={
                                                option.request_status_config_code
                                            }
                                            value={
                                                option.request_status_config_id
                                            }
                                        >
                                            {option.request_status_config_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}
                    >
                        {displayItems
                            ? (isSuperuser || user) &&
                              requests &&
                              requests
                                  .filter((item) =>
                                      selectedStatus
                                          ? item.booking_request_status_name ===
                                            selectedStatus.booking_request_status_name
                                          : true
                                  )
                                  .map((item, index) => (
                                      <div key={index}>
                                          <ListItem>
                                              {renderListItem(item, index)}
                                          </ListItem>
                                          <Divider />
                                      </div>
                                  ))
                            : (isSuperuser || user) &&
                              requests &&
                              requests.map((item, index) => (
                                  <div key={index}>
                                      <ListItem>
                                          {renderListItem(item, index)}
                                      </ListItem>
                                      <Divider />
                                  </div>
                              ))}
                    </List>
                </Card>
            </div>
        </div>
    );
};

export default History;
