import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    login,
    showLoading,
    showAuthMessage,
    hideAuthMessage,
} from '../../store/AuthSlice';
import {
    Alert,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Link,
} from '@mui/material';
import logo from '../basic/AITU LOGO.png';

export const RegisterForm = (props) => {
    const {
        hideAuthMessage,
        showLoading,
        login,
        loading,
        showMessage,
        message,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => hideAuthMessage(), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    });

    const onLogin = async () => {
        showLoading();

        let payload = { email, password };

        try {
            const response = await login(payload);
            // window.location.reload();
        } catch (error) {
            // Handle registration error
            console.error('Error registering:', error);
        }
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    return (
        <>
            {showMessage && (
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
                        <Typography variant='body1'>{message}</Typography>
                    </Alert>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#E1F1FF',
                }}
            >
                <Box
                    sx={{
                        width: 500,
                        height: 500,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        borderRadius: '8px',
                    }}
                >
                    <Grid container spacing={2} style={{ padding: '30px' }}>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    fontSize: '25px',
                                    margin: '30px',
                                    textAlign: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#020B5B',
                                    textDecoration: 'none',
                                }}
                            >
                                <img
                                    src={logo}
                                    alt=''
                                    style={{ width: 140, height: 70 }}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='outlined-required'
                                label='Enter email'
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='outlined-required'
                                label='Enter password'
                                value={password}
                                onChange={onChangePassword}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {loading ? (
                                <Link href='/map'>
                                    <Button
                                        sx={{ width: '100%' }}
                                        variant='outlined'
                                        size='large'
                                        onClick={onLogin}
                                        loading='true'
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    sx={{ width: '100%' }}
                                    variant='outlined'
                                    size='large'
                                    onClick={onLogin}
                                >
                                    Sign In
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            Don't have an Account?{' '}
                            <Link href='/signup'>Create Account</Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
};

const mapStateToProps = ({ auth }) => {
    const { loading, message, showMessage, token, redirect } = auth;
    return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
    login,
    showAuthMessage,
    showLoading,
    hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
