import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Fade,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import React, { useEffect, useState } from 'react';
import logo from './AITU LOGO.png';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/AuthSlice';
import { getUser } from '../store/UserInfoSlice';

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: '#4682E4',
        },
        children: `${name.split(' ')[0][0]}` || 'no data',
    };
}

const HeaderBar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickSignOut = () => {
        handleSignOut();
    };

    const handleSignOut = () => {
        dispatch(signOut());
    };
    const userFio = user?.user_info?.fio || 'no data';

    return (
        <div>
            {' '}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{ backgroundColor: 'white' }}>
                    <Container maxWidth='xl'>
                        <Toolbar>
                            <Typography
                                variant='h5'
                                noWrap
                                component='a'
                                href='/'
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#66C4F3',
                                    textDecoration: 'none',
                                    flexGrow: 1,
                                }}
                            >
                                <img
                                    src={logo}
                                    alt=''
                                    style={{ width: 80, height: 41 }}
                                />
                            </Typography>
                            <Link href='/map'>
                                <Button>AITU Map</Button>
                            </Link>
                            <Link href='/history'>
                                <Button>History</Button>
                            </Link>
                            <Button
                                id='fade-button'
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Contact us
                            </Button>
                            <Menu
                                id='fade-menu'
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>
                                    {/* <EmailTwoToneIcon /> */}
                                    Contact with us:{' '}
                                    <Link href='mailto:asketaevaa@gmail.com'>
                                        asketaevaa@gmail.com
                                    </Link>
                                </MenuItem>
                            </Menu>

                            <Link href='/login'>
                                <Button onClick={handleClickSignOut}>
                                    <LogoutOutlinedIcon />
                                </Button>
                            </Link>

                            <Avatar {...stringAvatar(userFio)} />
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </div>
    );
};

export default HeaderBar;
