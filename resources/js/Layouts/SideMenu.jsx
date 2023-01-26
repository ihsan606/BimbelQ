import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function SideMenu ({ children }) {
    return (
        <section>
            <nav>
                <p>Owner</p>
                <span></span>
                <li>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <a href="">Jadwal Bimbingan</a>
                </li>
                <li>
                    <a href="">Daftar Siswa</a>
                </li>
                <li>
                    <a href="">Daftar Tentor</a>
                </li>
            </nav>
            <main>
                { children }
            </main>
        </section>
    )
}