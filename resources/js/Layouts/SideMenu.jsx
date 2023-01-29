import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faListUl } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SideMenu ({ children }) {
    return (
        <section className='grid grid-rows-1 h-screen' 
            style={{ gridTemplateColumns: '1fr 3fr'}}> 
            <nav 
                className='flex flex-col justify-start align-center p-4 mt-16'
            >
                <Stack spacing={3}>
                    {/* <p>Owner</p>
                    <span></span> */}
                    <Button variant="text" href="/jadwalbimbingan">
                        Jadwal Bimbingan
                    </Button>
                    <Button variant="text" href="/siswas">
                        Siswa
                    </Button>
                    <Button variant="text" href="#outlined-buttons">
                        Tentor
                    </Button>
                </Stack>
            </nav>
            <main className='p-3'>
                { children }
            </main>
        </section>
    )
}