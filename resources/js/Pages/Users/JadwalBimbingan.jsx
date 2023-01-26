import Layout from '../../Layouts/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function JadwalBimbingan() {
    return (
        <Layout>
            <header>
                <button>sorting</button>
                <button>Tambah Jadwal</button>
            </header>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <th>Sesi</th>
                        <th>Tanggal</th>
                        <th>Program</th>
                        <th>Mapel</th>
                        <th>Tentor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                            <td>13.30 - 15.00</td>
                            <td>13 Januari 2023</td>
                            <td>Privat</td>
                            <td>Matematika</td>
                            <td>Lee Haechan</td>
                        <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                            <td>13.30 - 15.00</td>
                            <td>13 Januari 2023</td>
                            <td>Privat</td>
                            <td>Matematika</td>
                            <td>Lee Haechan</td>
                        <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}