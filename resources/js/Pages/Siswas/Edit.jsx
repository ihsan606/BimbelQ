//import React
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Select from "react-select";
import AsyncSelect from "react-select/async";

//import Link
import { Link } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Default";
import SidebarNew from "../../Layouts/SidebarNew";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

export default function EditTentor({ errors, session, siswa }) {
    const [siswaName, setSiswaName] = useState(siswa.siswa_name);
    const [siswaEmail, setSiswaEmail] = useState(siswa.siswa_email);
    const [siswaPhoneNumber, setSiswaPhoneNumber] = useState(
        siswa.siswa_phone_number
    );
    const [validation, setValidation] = useState([]);

    const submitSiswa = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        //append data to formData

        Inertia.put(`/siswas/${siswa.id}`, {
            siswa_name: siswaName,
            siswa_email: siswaEmail,
            siswa_phone_number: siswaPhoneNumber,
        });

        // Inertia.get('/tarifs')
        swal({
            title: "SUCCESS!",
            text: "Data Siswa Berhasil Diupdate!",
            icon: "success",
            buttons: false,
        });
    };

    return (
        <SidebarNew>
            <div className=" w-full  rounded-lg shadow-xl pb-4 ">
                <div className="header mb-3 bg-[#E1F4FF] px-3 border border-1 py-3 font-normal text-xl text-gray-600  shadow-none rounded-t-lg drop-shadow-none ">
                    EDIT SISWA
                </div>
                <form onSubmit={submitSiswa}>
                    <div className="grid grid-cols-6 gap-x-5 px-5">
                        <div className="col-span-2 my-2">
                            <label
                                htmlFor="nama_siswa"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Nama Siswa
                            </label>
                            <input
                                type="text"
                                id="nama_siswa"
                                value={siswaName}
                                onChange={(e) => setSiswaName(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nama Siswa..."
                            />
                            {validation.siswa_name && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.siswa_name[0]}
                                        </span>
                                        <svg
                                            className="fill-current opacity-75 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-2 my-2">
                            <label
                                htmlFor="email_siswa"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Email Siswa
                            </label>
                            <input
                                type="email"
                                id="email_siswa"
                                value={siswaEmail}
                                onChange={(e) => setSiswaEmail(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email Siswa..."
                            />
                            {validation.siswa_email && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.siswa_email[0]}
                                        </span>
                                        <svg
                                            className="fill-current opacity-75 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-2 my-2">
                            <label
                                htmlFor="no_hp"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                No. HP/ No. Telp
                            </label>
                            <input
                                type="number"
                                id="no_hp"
                                value={siswaPhoneNumber}
                                onChange={(e) =>
                                    setSiswaPhoneNumber(e.target.value)
                                }
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="No. HP/ No. Telp..."
                            />
                            {validation.siswa_phone_number && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.siswa_phone_number[0]}
                                        </span>
                                        <svg
                                            className="fill-current opacity-75 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="h-10 mt-8 bg-[#1597E5] col-span-2 col-start-5 text-gray-200 rounded-lg shadow-lg font-semibold"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </SidebarNew>
    );
}
