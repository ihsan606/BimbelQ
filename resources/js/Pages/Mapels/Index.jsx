//import React
import React from 'react';

//import Link
import { Link } from '@inertiajs/inertia-react';
import Layout from "../../Layouts/Default";

export default function ClassIndex({ mapels, session }) {

    return (
        <Layout>
            <div style={{ marginTop: '100px' }}>

                <Link href="/mapels/create" className="btn text-white gap-x-2 btn-success btn-md mb-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 9H15V11H11V15H9V11H5V9H9V5H11V9ZM10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z" fill="white"/>
                    </svg>

                    TAMBAH MAPEL
                </Link>

                {session.success && (
                    <div className="alert alert-success border-0 shadow-sm rounded-3">
                        {session.success}
                    </div>
                )}

                <div className="card border-0 rounded shadow-sm">
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { mapels.map((mapel, index) => (
                                <tr key={ index }>
                                    <td>{ mapel.mapels_name }</td>
                                    <td className="text-center">

                                    </td>
                                </tr>
                            )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
