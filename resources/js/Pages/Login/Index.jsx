//import React
import React, {useState} from 'react';

//import Link
import { Link } from '@inertiajs/inertia-react';
import Layout from "../../Layouts/Default";
import {Inertia} from "@inertiajs/inertia";

export default function Login({ errors }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (e)=>{
        e.preventDefault();
        Inertia.post('/auth/login',{
            email: email,
            password: password
        })
    }

    return (
        <div>
ini halaman login
        </div>
    )
}
