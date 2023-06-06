import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import '../style.css';
import { getAuditorium } from '../../store/AuditoriumSlice';
import DialogChoice from '../dialogs/DialogChoice';

const Map = ({ floor, searchAuditorium }) => {
    const dispatch = useDispatch();
    const auditorium = useSelector(
        (state) => state.auditorium.auditorium.auditoriums
    );

    const [rooms, setRooms] = useState(floor);
    const [open, setOpen] = useState(false);
    const [auditoriumID, setAuditoriumID] = useState(null);
    const [auditoriumName, setAuditoriumName] = useState('');
    const [selectedPolyline, setSelectedPolyline] = useState(null);

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
    function handlePolylineClick(polyline, id, name) {
        setSelectedPolyline(polyline);
        if (polyline.type !== 'noAction') {
            setAuditoriumID(id);
            setAuditoriumName(name);
            setOpen(true);
        } else setOpen(false);
    }
    return (
        <div className='IndoorMap'>
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
                                        ? matchedAuditorium?.is_available &&
                                          matchedAuditorium?.is_allowed
                                            ? '#4fa24c'
                                            : matchedAuditorium?.is_available
                                            ? '#F3625D'
                                            : '#A5C5EB'
                                        : matchedAuditorium?.is_available &&
                                          matchedAuditorium?.is_allowed
                                        ? '#B1F8A3'
                                        : matchedAuditorium?.is_available
                                        ? '#FFC8C6'
                                        : '#E1F1FF'
                                }
                                stroke={'#7E8480'}
                                onMouseEnter={() => handleMouseEnter(room.id)}
                                onMouseLeave={() => handleMouseLeave(room.id)}
                                onClick={() =>
                                    handlePolylineClick(
                                        room,
                                        matchedAuditorium?.auditorium_id,
                                        matchedAuditorium?.auditorium_name
                                    )
                                }
                            />
                        </Tooltip>
                    );
                })}
            </svg>
            <DialogChoice
                openDialog={open}
                dialogState={setOpen}
                auditoriumID={auditoriumID}
                auditoriumName={auditoriumName}
            />
        </div>
    );
};
export default Map;
