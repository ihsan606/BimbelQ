import * as React from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Layout from '../../Layouts/SideMenu';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from 'react'
import { router } from '@inertiajs/react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Wrapper = styled.section`
  padding: 4em;
`;

export default function Create() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = useState({
        siswa_nama: "",
        siswa_email: "",
        siswa_password: "",
        siswa_password_confirmation: ""
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }
    
      function handleSubmit(e) {
        e.preventDefault()
        router.post('/siswas', values)
      }

    return (
        <Layout>
            <Wrapper>
                <form onSubmit={handleSubmit}>
                {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                > 
                            
                </Box> */}
                    <Stack spacing={3} direction="column">
                        <h2>Form Tambah Siswa</h2>

                        <TextField 
                            id="siswa_nama" 
                            label="Nama" 
                            variant="outlined" 
                            required 
                            value={values.nama}
                            onChange={handleChange}
                        />

                        <TextField 
                            id="siswa_email" 
                            label="Email" 
                            variant="outlined" 
                            required 
                            value={values.email}
                            onChange={handleChange}
                        />

                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="siswa_password">Password</InputLabel>
                            <OutlinedInput
                                id="siswa_password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={values.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="siswa_password_confirmation">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="siswa_password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={values.confirmPassword}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>

                        <Button variant="contained" type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Wrapper>
        </Layout>
    )
}