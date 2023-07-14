import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import { Autocomplete, Grid, Switch, TextField, Tooltip } from '@mui/material';
// import FloorFirst from './floor1/FloorFirst';
import HeaderBar from './HeaderBar';
import Map from '../floors/Map';
import { floorOne } from '../coordinates/FloorFirstPoints';
import MapDefault from '../floors/MapDefault';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditorium } from '../../store/AuditoriumSlice';
import AlertInfo from '../floors/AlertInfo';
import { floorSecond } from '../coordinates/FloorSecondPoints';
import { floorThird } from '../coordinates/FloorThirdPoints';

export default function HomePage() {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState('1');
    const [checked, setChecked] = useState(false);
    const [search, setSearch] = useState('');
    const [infoMessage, setInfoMessage] = useState(false);
    const auditorium = useSelector(
        (state) => state.auditorium.auditorium.auditoriums
    );
    useEffect(() => {
        dispatch(getAuditorium());
    }, []);

    const handleFindAuditorium = (options) => {
        let targetAuditorium;
        if (options) {
            targetAuditorium = options.value;
            setSearch(targetAuditorium);
            return targetAuditorium;
        }
        return null;
    };

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event, newValue) => {
        setMenu(newValue);
    };
    const closeInfoMessage = () => {
        setInfoMessage(true);
    };
    return (
        <div>
            <HeaderBar />
            <Card sx={{ width: '75%', mx: 'auto', marginTop: '100px' }}>
                <AlertInfo
                    closeInfoMessage={closeInfoMessage}
                    info={infoMessage}
                />
                <TabContext value={menu} style={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            paddingTop: '20px',
                        }}
                    >
                        <Grid container>
                            <Grid item lg={8} xs={12}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label='lab API tabs example'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'canter',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Tab label='Floor 1' value='1' />
                                    <Tab label='Floor 2' value='2' />
                                    <Tab label='Floor 3' value='3' />
                                </TabList>
                            </Grid>
                            <Grid item lg={3} xs={10}>
                                <Autocomplete
                                    size='small'
                                    options={
                                        auditorium &&
                                        auditorium.length > 0 &&
                                        auditorium.map((option) => ({
                                            label: option.auditorium_name,
                                            value: option.auditorium_name,
                                        }))
                                    }
                                    getOptionLabel={(option) => option.label}
                                    isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Search auditorium'
                                        />
                                    )}
                                    onChange={(event, value) =>
                                        handleFindAuditorium(value)
                                    }
                                    style={{ marginTop: '5px' }}
                                />
                            </Grid>
                            <Grid item lg={1} xs={2}>
                                <Tooltip
                                    title='Click to see free auditorium'
                                    placement='right-end'
                                >
                                    <Switch
                                        checked={checked}
                                        onChange={handleChangeChecked}
                                        color='primary'
                                        inputProps={{
                                            'aria-label': 'Switch example',
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Box>
                    <TabPanel value='1'>
                        {checked ? (
                            <Map
                                floor={floorOne}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        ) : (
                            <MapDefault
                                floor={floorOne}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        )}
                    </TabPanel>
                    <TabPanel value='2'>
                        {checked ? (
                            <Map
                                floor={floorSecond}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        ) : (
                            <MapDefault
                                floor={floorSecond}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        )}
                    </TabPanel>
                    <TabPanel value='3'>
                        {checked ? (
                            <Map
                                floor={floorThird}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        ) : (
                            <MapDefault
                                floor={floorThird}
                                searchAuditorium={search}
                                auditorium={auditorium}
                            />
                        )}
                    </TabPanel>
                </TabContext>
                {/* <IndoorMap /> */}
            </Card>
        </div>
    );
}
