//import React
import React from 'react';

//import layout
import Layout from '../../Layouts/Default';

//import Link
import { Link } from '@inertiajs/inertia-react';

export default function UserIndex({ users, session }) {

    return (
        <Layout>
            <div style={{ marginTop: '100px' }}>

                <Link href="/users/create" className="btn btn-success btn-md mb-3">TAMBAH USER</Link>

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
                                <th scope="col">EMAIL</th>
                                <th scope="col">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { users.map((user, index) => (
                                <tr key={ index }>
                                    <td>{ user.name }</td>
                                    <td>{ user.email }</td>
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
