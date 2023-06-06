import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const RefuseModal = ({ open, modalState, onModalText, bookingRequestId }) => {
    const [textValue, setTextValue] = useState('');

    const handleSubscribe = () => {
        onModalText(bookingRequestId, 'refuse', textValue); // Pass the refuseReason as the text value
        modalState(false);
        onModalText(textValue);
    };

    const handleChange = (event) => {
        setTextValue(event.target.value);
    };

    function handleCloseModal() {
        modalState(false);
    }

    return (
        <div>
            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Email Address'
                        type='email'
                        fullWidth
                        variant='standard'
                        value={textValue}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSubscribe}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RefuseModal;
