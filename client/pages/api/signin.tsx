import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardHeader, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function BasicTextFields() {
    return (
        <Card>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 7, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {/* <CardHeader> */}{' '}
                <Typography variant="h4">Sign In page</Typography>
                {/* </CardHeader> */}
                {/* <Grid
                    container
                    spacing={{ xs: 5, md: 12 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                > */}{' '}
                <Stack>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>{' '}
                    <br />
                </Stack>
                <TextField
                    id="outlined-basic"
                    label="First Name "
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Email id"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                />{' '}
                <TextField
                    id="outlined-multiline-static"
                    label="Address"
                    multiline
                    rows={4}
                    defaultValue="Enter your address"
                />
                <ul>
                    <Button variant="contained">SIgn In</Button>
                    <Button>Forgot passsword</Button>
                </ul>
                {/* </Grid> */}
            </Box>
        </Card>
    );
}
