import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import '../style.css';
import { getAuditorium } from '../../store/AuditoriumSlice';

const MapDefault = ({ floor, searchAuditorium }) => {
    const auditorium = useSelector(
        (state) => state.auditorium.auditorium.auditoriums
    );
    const dispatch = useDispatch();

    const [rooms, setRooms] = useState(floor);
    useEffect(() => {
        dispatch(getAuditorium());
    }, []);

    function findAuditorium(id) {
        if (auditorium) {
            return auditorium.find((item) => item.auditorium_id === id);
        }
        return null;
    }
    function handleMouseEnter(id) {
        setRooms((prevPolylines) =>
            prevPolylines.map((p) =>
                p.id === id && p.type !== 'noAction'
                    ? { ...p, highlighted: true }
                    : { ...p, highlighted: false }
            )
        );
    }
    function handleMouseLeave() {
        setRooms((prevPolylines) =>
            prevPolylines.map((p) => ({ ...p, highlighted: false }))
        );
    }
    return (
        <div
            className='IndoorMap'
            style={{
                height: '100%',
                width: '100%',
                overflow: 'auto',
                marginTop: '40px',
                marginLeft: '60px',
            }}
        >
            <svg
                width='1044'
                height='435'
                viewBox='0 0 1044 435'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                {rooms.map((room) => {
                    const matchedAuditorium = findAuditorium(room.id);
                    return (
                        <Tooltip
                            title={
                                matchedAuditorium?.auditorium_name || room.id
                            }
                            key={matchedAuditorium?.auditorium_id || room.id}
                            placement='right-end'
                        >
                            <path
                                d={room.d}
                                fill={
                                    searchAuditorium ===
                                    matchedAuditorium?.auditorium_name
                                        ? '#F8F4DE'
                                        : room.highlighted
                                        ? '#A5C5EB'
                                        : '#E1F1FF'
                                }
                                stroke={'#7E8480'}
                                onMouseEnter={() => handleMouseEnter(room.id)}
                                onMouseLeave={() => handleMouseLeave(room.id)}
                            />
                        </Tooltip>
                    );
                })}
            </svg>
        </div>
    );
};

export default MapDefault;
