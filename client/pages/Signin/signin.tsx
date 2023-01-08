import React, { useState, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardHeader, IconButton } from '@mui/material';
import { Message, PhotoCamera } from '@mui/icons-material';
import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { type } from 'os';
import { stringify } from 'querystring';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { PERMANENT_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';

// type initialFormData = {
//     // using `interface` is also ok
//     email: string;
//     password: string;
// };

export default function BasicTextFields() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const initialFormData = {
        email: '',
        password: '',
        name: '',
        lname: '',
        mobile: '',
    };

    // type initialFormData = {
    //     // using `interface` is also ok
    //     email: string;
    //     password: string;
    //     fname:string;
    //     lname:string;
    //     mobile:number;
    // };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState<any>({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormErrors(validate());
        // setIsSubmit(true);
        submitForm();
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            submitForm();
        }
    }, [formErrors]);

    const submitForm = async () => {
        try {
            // await axios.post(
            //     'http://localhost:8080/automate/ops/api/v1/dashboard/user/signup',
            //     JSON.stringify({
            //         formData,
            //     })
            // );
            await axios({
                method: 'post',
                url: 'http://localhost:8080/automate/ops/api/v1/dashboard/user/signup',
                data: formData,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validate = () => {
        const errors: any = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!formData.email) {
            errors.email = 'Email is required!';
        } else if (!regex.test(formData.email)) {
            errors.email = 'This is not a valid email format!';
        }
        if (!formData.name) {
            errors.name = 'First Name is required';
        }
        if (!formData.lname) {
            errors.lname = 'Last Name is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length <= 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (formData.password.length >= 15) {
            errors.password = 'Password cannot exceed more than 10 characters';
        }
        if (!formData.mobile) {
            errors.mobile = 'Phone is required!';
        } else if (formData.mobile.length <= 10) {
            errors.mobile = 'This is not a valid mobile number format!';
        }

        return errors;
    };

    return (
        <Card>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 7, width: '25ch' },
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
                {/* <Stack>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>{' '}
                    <br />
                </Stack> */}
                <TextField
                    required
                    name="name"
                    id="outlined-name"
                    label="First Name "
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                />
                <p className="registerpage__paragraph">{formErrors.name}</p>
                <TextField
                    required
                    name="lname"
                    id="outlined-lname"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.lname}
                />
                <p className="registerpage__paragraph">{formErrors.lname}</p>
                <TextField
                    required
                    name="email"
                    id="outlined-email"
                    label="Email id"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.email}
                />{' '}
                <p className="registerpage__paragraph">{formErrors.email}</p>
                <TextField
                    required
                    name="mobile"
                    id="outlined-mobile"
                    label="Phone Number"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.mobile}
                />{' '}
                <p className="registerpage__paragraph">{formErrors.mobile}</p>
                {/* <TextField
                    required
                    name="password"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                    value={formData.password}
                /> */}
                <FormControl
                    sx={{ m: 1, width: '25ch' }}
                    variant="outlined"
                    required
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        name="password"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        value={formData.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <p className="registerpage__paragraph">
                    {formErrors.passsword}
                </p>
                <ul>
                    <Button variant="contained" onClick={handleSubmit}>
                        SIgn In
                    </Button>
                    <Button>Forgot passsword</Button>
                </ul>{' '}
                <Typography>
                    Already have an account?<Button>login</Button>{' '}
                </Typography>
                {/* </Grid> */}
            </Box>
        </Card>
    );
}
