import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
export default function AlertInfo({ closeInfoMessage, info }) {
    return (
        <div>
            {info ? null : (
                <Alert severity='info'>
                    <AlertTitle
                        style={{
                            display: 'flex',
                            alignItems: 'end',
                        }}
                    >
                        <span style={{ marginRight: '1000px' }}>Info</span>
                        <div onClick={closeInfoMessage}>
                            <CloseIcon />
                        </div>
                    </AlertTitle>

                    <div>
                        <div
                            style={{
                                height: '10px',
                                width: '10px',
                                border: '1px solid',
                                backgroundColor: '#A5C5EB',
                                display: 'inline-block',
                                marginRight: '5px',
                            }}
                        />
                        - disabled auditoriums or places not for study
                    </div>
                    <div>
                        <div
                            style={{
                                height: '10px',
                                width: '10px',
                                border: '1px solid',
                                backgroundColor: '#B1F8A3',
                                display: 'inline-block',
                                marginRight: '5px',
                            }}
                        />
                        - available auditoriums at the moment time
                    </div>
                    <div>
                        <div
                            style={{
                                height: '10px',
                                width: '10px',
                                border: '1px solid',
                                backgroundColor: '#FFC8C6',
                                display: 'inline-block',
                                marginRight: '5px',
                            }}
                        />
                        - auditoriums that cannot be booked
                    </div>
                    <div>
                        {' '}
                        <div
                            style={{
                                height: '10px',
                                width: '10px',
                                border: '1px solid',
                                backgroundColor: '#F8F4DE',
                                display: 'inline-block',
                                marginRight: '5px',
                            }}
                        />
                        - searched auditorium
                    </div>
                </Alert>
            )}
        </div>
    );
}
