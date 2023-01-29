import React, { useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";



export default function Registration() {

    const {error} = usePage().props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const storeRegister = async(e) => {
        e.preventDefault();

        Inertia.post('/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-white">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-2xl sm:max-w-md rounded-3xl">
                <div className="text-center">
                    <a href="/">
                        <h3 className="text-4xl font-bold text-cyan-900">
                            BimbelQ
                        </h3>
                    </a>
                </div>
                <br />
                    <form onSubmit={storeRegister}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e)=> setName(e.target.value)}
                                    placeholder="Full Name"
                                    className="bg-cyan-900 block w-full px-4 py-2 mt-2 text-white border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="bg-cyan-900 block w-full px-4 py-2 mt-2 text-white border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="block w-full px-4 py-2 mt-2 bg-cyan-900 text-white border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    onChange={(e)=>setPassword_confirmation(e.target.value)}
                                    placeholder="Password Confirmation"
                                    className="block w-full px-4 py-2 mt-2 text-white bg-cyan-900 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="/login"
                            >
                                Already registered?
                            </a>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-emerald-500 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}