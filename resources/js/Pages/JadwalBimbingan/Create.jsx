import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Layout from '../../Layouts/SideMenu';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Wrapper = styled.section`
  padding: 4em;
`;

const divider = styled.span`
    width: 100%;
    height: 3px;
    display: block;
    background-color: black;
    content: '';
`;

export default function Create() {
    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Layout>
            <Wrapper>
                <form action="">
                    <Stack spacing={3} direction="column">
                        <h2>Form Tambah Bimbingan Belajar</h2>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Siswa</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Lee Haechan</MenuItem>
                                <MenuItem value={20}>Jung Jaehyun</MenuItem>
                                <MenuItem value={30}>Lee Mark</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sesi</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>13.30 - 15.00</MenuItem>
                                <MenuItem value={20}>15.30 - 17.00</MenuItem>
                                <MenuItem value={30}>18.30 - 20.00</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Program</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Privat</MenuItem>
                                <MenuItem value={20}>Reguler</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Mata Pelajaran</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Matematika</MenuItem>
                                <MenuItem value={20}>Bahasa Indonesia</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tentor</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Lee Haechan</MenuItem>
                                <MenuItem value={20}>Lee Mark</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/DD/YYYY"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Button variant="contained" type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Wrapper>
        </Layout>
    )
}