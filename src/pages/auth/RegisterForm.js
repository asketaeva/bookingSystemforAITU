import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    register,
    showLoading,
    showAuthMessage,
    hideAuthMessage,
} from '../../store/AuthSlice';
import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    CircularProgress,
    Link,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import logo from '../basic/AITU LOGO.png';
import { getGroup, getInstructor } from '../../store/GroupAndInstuctorSlice';

export const RegisterForm = (props) => {
    const dispatch = useDispatch();

    const groupAndInstructor = useSelector((state) => state.groupAndInstructor);
    const groupAndInstructorLoading = groupAndInstructor.loading;
    const groups = groupAndInstructor.group.groups;
    const instructors = groupAndInstructor.instructor.instructors;
    const isEmailExist = useSelector((state) => state.auth.isEmailExist);
    useEffect(() => {
        dispatch(getGroup());
        dispatch(getInstructor());
    }, []);

    if (groupAndInstructorLoading) {
        <CircularProgress />;
    }
    const {
        hideAuthMessage,
        showLoading,
        register,
        loading,
        showMessage,
        message,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fio, setFio] = useState('');
    const [isStaff, setIsStaff] = useState(false);
    const [selectedValue, setSelectedValue] = useState('group');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [success, setSucces] = useState(false);
    const [code, setCode] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeFio = (e) => {
        setFio(e.target.value);
    };
    const onChangeCode = (e) => {
        setCode(e.target.value);
    };

    const handleChecked = (event) => {
        setSelectedValue(event.target.value);
        setIsStaff(event.target.checked);
        setSelectedGroup('');
        setSelectedInstructor('');
    };

    const handleGroupChange = (event) => {
        const selectedGroupId = event.target.value;
        const selectedGroup = groups.find(
            (group) => group.group_name === selectedGroupId
        );
        setSelectedGroup(selectedGroup);
    };

    const handleInstructorChange = (event) => {
        const selectedInstructorId = event.target.value;
        const selectedInstructor = instructors.find(
            (instructor) => instructor.instructor_name === selectedInstructorId
        );
        setSelectedInstructor(selectedInstructor);
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => hideAuthMessage(), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    });

    const onRegister = () => {
        let payload = {};

        if (!isStaff) {
            payload = {
                email,
                password,
                fio,
                is_staff: isStaff,
                group_id: selectedGroup.group_id,
                instructor_id: null,
                code: code,
            };
        } else {
            payload = {
                email,
                password,
                fio: null,
                is_staff: isStaff,
                group_id: null,
                instructor_id: selectedInstructor.instructor_id,
                code: code,
            };
        }
        try {
            const response = register(payload);

            console.log('Response ', response);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    zIndex: '9999',
                    width: '50%',
                }}
            >
                {showMessage && <Alert severity='error'>{message}</Alert>}
            </div>

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
                        height: 650,
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
                            <FormControlLabel
                                label='Instructor'
                                control={
                                    <Checkbox
                                        checked={isStaff}
                                        value='checked'
                                        onChange={handleChecked}
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                }
                            />
                            {!isStaff && groups && groups.length > 0 && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{
                                                width: '100%',
                                                marginBottom: '20px',
                                            }}
                                            id='outlined-required'
                                            label='Enter fio'
                                            value={fio}
                                            onChange={onChangeFio}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            sx={{
                                                width: '100%',
                                                marginBottom: '20px',
                                            }}
                                            onChange={handleGroupChange}
                                            displayEmpty
                                        >
                                            <InputLabel id='demo-simple-select-label'>
                                                Select Group
                                            </InputLabel>
                                            {groups.map((option, index) => (
                                                <MenuItem
                                                    key={index.group_id}
                                                    value={option.group_name}
                                                >
                                                    {option.group_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </>
                            )}
                            {selectedValue === 'checked' && isStaff && (
                                <>
                                    {' '}
                                    <Grid item xs={12}>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            sx={{ width: '100%' }}
                                            onChange={handleInstructorChange}
                                            displayEmpty
                                        >
                                            <InputLabel id='demo-simple-select-label'>
                                                Select Instructor
                                            </InputLabel>
                                            {instructors.map(
                                                (option, index) => (
                                                    <MenuItem
                                                        key={
                                                            index.instructor_id
                                                        }
                                                        value={
                                                            option.instructor_name
                                                        }
                                                    >
                                                        {option.instructor_name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12} style={{ marginTop: '10px' }}>
                                <div onClick={onRegister}>Give me code</div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{
                                        width: '100%',
                                        marginTop: '15px',
                                    }}
                                    id='outlined-required'
                                    label='Enter code'
                                    value={code}
                                    onChange={onChangeCode}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Link href='/map'>
                                <Button
                                    sx={{ width: '100%' }}
                                    variant='outlined'
                                    size='large'
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            Already have an account?{' '}
                            <Link href='/login'>Login</Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
};

const mapStateToProps = ({ auth }) => {
    const { loading, message, showMessage, token } = auth;
    return { loading, message, showMessage, token };
};

const mapDispatchToProps = {
    register,
    showAuthMessage,
    showLoading,
    hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
