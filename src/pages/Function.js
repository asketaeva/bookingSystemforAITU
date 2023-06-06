import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

export default function Function() {
    const [data, setData] = useState([]);
    const [svg, setSvg] = useState('');

    const onChangeSvg = (e) => {
        setSvg(e.target.value);
    };

    const handleClick = () => {
        parseSvgData();
        // Perform other actions or operations with the submitted SVG data
    };

    const parseSvgData = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const pathElements = doc.querySelectorAll('path');
        const newData = Array.from(pathElements).map(
            (pathElement, index = 312) => {
                const dAttributeValue = pathElement.getAttribute('d');
                index++;
                return `{id: ${index}, d: '${dAttributeValue}',highlighted: false, type: 'action'}`;
            }
        );
        setData(newData);
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(data)
            .then(() => {
                alert('Copied');
            })
            .catch((error) => {
                alert('Failed to copy SVG data to clipboard:', error);
            });
    };
    console.log('data', data);

    return (
        <div>
            <div
                style={{
                    margin: '50px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id='outlined-required'
                            value={svg}
                            onChange={onChangeSvg}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={handleClick}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>

            <div
                style={{
                    margin: '50px',
                    padding: '10px',
                }}
            >
                <Button variant='contained' onClick={copyToClipboard}>
                    copy
                </Button>{' '}
                <div style={{ border: '1px solid', marginTop: '10px' }}>
                    {data}
                </div>
            </div>
        </div>
    );
}
