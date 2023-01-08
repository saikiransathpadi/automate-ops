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
                <Typography variant="h4">Login page</Typography>
                {/* </CardHeader> */}
                <TextField
                    required
                    id="outlined-basic"
                    label="Email_id / Phone "
                    variant="outlined"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <ul>
                    <Button variant="contained"> Login</Button>
                    <Button>Forgot passsword</Button>
                </ul>{' '}
                <Typography>
                    Didn't have an account?<Button>Sign In</Button>{' '}
                </Typography>
                {/* </Grid> */}
            </Box>
        </Card>
    );
}
