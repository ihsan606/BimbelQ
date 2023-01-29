import Layout from '../../Layouts/SideMenu';
import Table from './Table';
import * as React from 'react';

export default function Index({ siswas }) {
    return(
        <Layout>
            <Table siswas={siswas}/>
        </Layout>
    )
}