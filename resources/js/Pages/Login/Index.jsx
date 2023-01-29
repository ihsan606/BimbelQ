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
        <div className='relative flex flex-col justify-center min-h-screen overflow-hidden '>
                <div className='w-full p-6 m-auto bg-gray rounded-3xl lg:max-w-xl shadow-2xl'>
                        <h1 className='text-5xl font-semibold text-center text-cyan-900'>
                            Sign in
                        </h1>

                        <form className='mt-6' onSubmit={submitLogin}>
                            <div className='mb-2'>
                                <label className='block text-sm font-semibold text-gray-800'>
                                    Email
                                </label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='block w-full px-4 py-2 mt-2 text-white bg-cyan-900 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' name="" id="" />
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
                            <div className=''>
                                <label htmlFor="" className='block text-sm font-semibold text-gray-800'>
                                    Password
                                    </label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='block w-full px-4 py-2 mt-2 text-white bg-cyan-900 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' name="" id="" />
                                {validation.password && (
                                    <div className="bg-white text-center py-1 lg:px-4">
                                        <div className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                            <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                                            <span className="font-semibold mr-2 text-left flex-auto">{validation.password[0]}</span>
                                            <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <a href="#" className='ext-xs text-emerald-600 hover:underline'>
                                Forget Password?
                            </a>
                            <div className='mt-6'>
                                <button type="submit" className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-500 rounded-md hover:bg-emerald-900 focus:outline-none focus:bg-emerald-900-'>
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className='mt-8 text-xs font-light text-center text-gray-700'>
                            {" "}
                            dont have an account?{" "}
                            <a href="#" className='font-medium text-emerald-600 hover:underline'>
                            Sign up
                            </a>
                        </p>
                </div>
        </div>
    );
}
