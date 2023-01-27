//import React
import React, {useEffect, useState} from 'react';
import {router} from '@inertiajs/react';


import Layout from "../../Layouts/Default";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Inertia} from "@inertiajs/inertia";

export default function Login({ errors, user, token }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //define state validation
    const [validation, setValidation] = useState([]);

    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {

            console.log(localStorage.getItem('token'))
            window.location.replace('/home');

        }
    }, []);


    const submitLogin = async (e)=>{
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append('email', email);
        formData.append('password', password);

        await axios.post('/auth/login', formData)

            .then((res)=>{
                // console.log(res)
                localStorage.setItem('token', res.data.token)
                Inertia.get('/home')



            })

            .catch((errors)=>{
                setValidation(errors.response.data)
                console.log(errors.response.data)
                console.log("--------", errors.response.data)
            })






    }

    return (
        <Layout>
            <div className="row" style={{ marginTop: '100px' }}>
                <div className=" w-full px-64">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header">
                            <span className="font-weight-bold">Login</span>
                            {validation.message && (
                                <div>
                                    <p>{validation.message}</p>
                                    <p>{token}</p>
                                </div>

                            )}

                        </div>
                        <div className="card-body">
                            <form onSubmit={submitLogin}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Email" />
                                </div>
                                {validation.email && (
                                    <div className="bg-white text-center py-1 lg:px-4">
                                    <div className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                    <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                                    <span className="font-semibold mr-2 text-left flex-auto">{validation.email[0]}</span>
                                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                    </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                </div>
                                {validation.password && (
                                    <div className="bg-white text-center py-1 lg:px-4">
                                        <div className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                            <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                                            <span className="font-semibold mr-2 text-left flex-auto">{validation.password[0]}</span>
                                            <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> SAVE</button>
                                    <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> RESET</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
