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

export default function CreateTentor({ errors, session, mapels, sesis }) {
    const [mapelsId, setMapelsId] = useState("");
    const [sesiId, setSesiId] = useState("");
    const [tentorsName, setTentorsName] = useState("");
    const [tentorsEmail, setTentorsEmail] = useState("");
    const [tentorsPhoneNumber, setTentorsPhoneNumber] = useState("");
    const [validation, setValidation] = useState([]);
    const [options, setOptions] = useState([""]);
    const [sesiOptions, setSesiOptions] = useState([""]);

    useEffect(() => {
        const getData = () => {
            const arr = [];
            const arr2 = [];
            mapels.map((mapel, index) => {
                return arr.push({ value: mapel.id, label: mapel.mapels_name });
            });

            sesis.map((sesi, index) => {
                return arr2.push({ value: sesi.id, label: sesi.sesi_name });
            });

            setOptions(arr);

            setSesiOptions(arr2);
        };
        getData();
        console.log(options);
    }, []);

    const handleMapelChange = (selectedOption) => {
        setMapelsId(selectedOption.value);
    };

    const handleSesiChange = (selectedOption) => {
        setSesiId(selectedOption.value);
    };

    // const MySwal = withReactContent(Swal)

    const submitTentor = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append("mapels_id", mapelsId);
        formData.append("sesi_id", sesiId);
        formData.append("tentors_name", tentorsName);
        formData.append("tentors_email", tentorsEmail);
        formData.append("tentors_phone_number", tentorsPhoneNumber);

        await axios
            .post("/tentors", formData)

            .then((res) => {
                // console.log(res)
                // localStorage.setItem('token', res.data.token)
                Inertia.get("/tentors");
                swal({
                    title: "SUCCESS!",
                    text: "Data Tentor Berhasil Ditambahkan!",
                    icon: "success",
                    buttons: false,
                });
            })

            .catch((errors) => {
                setValidation(errors.response.data);
                console.log(errors.response.data);
                console.log("--------", errors.response.data);
            });
    };

    return (
        <SidebarNew>
            <div className=" w-full  rounded-lg shadow-xl pb-4 ">
                <div className="header mb-3 bg-[#E1F4FF] px-3 border border-1 py-3 font-normal text-xl text-gray-600  shadow-none rounded-t-lg drop-shadow-none ">
                    TAMBAH TENTOR
                </div>
                <form onSubmit={submitTentor}>
                    <div className="grid grid-cols-4 gap-x-6 px-6">
                        <div className="col-span-2 my-4">
                            <label
                                htmlFor="nama_tentor"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Nama Tentor
                            </label>
                            <input
                                type="text"
                                id="nama_tentor"
                                onChange={(e) => setTentorsName(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nama Tentor..."
                            />
                            {validation.tentors_name && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tentors_name[0]}
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
                        <div className="col-span-2 my-4">
                            <label
                                htmlFor="email_tentor"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Email Tentor
                            </label>
                            <input
                                type="email"
                                id="email_tentor"
                                onChange={(e) =>
                                    setTentorsEmail(e.target.value)
                                }
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email Tentor..."
                            />
                            {validation.tentors_email && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tentors_email[0]}
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
                        <div className="col-span-2 my-4">
                            <label
                                htmlFor="no_hp"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                No. HP / No. Telp
                            </label>
                            <input
                                type="number"
                                id="no_hp"
                                onChange={(e) =>
                                    setTentorsPhoneNumber(e.target.value)
                                }
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="No. HP / No. Telp..."
                            />
                            {validation.tentors_phone_number && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tentors_phone_number[0]}
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
                                htmlFor="mapel"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Mapel
                            </label>
                            <Select
                                onChange={handleMapelChange}
                                id="mapel"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={options}
                            />
                            {validation.mapels_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.mapels_id[0]}
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
                                htmlFor="sesi"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Sesi
                            </label>
                            <Select
                                onChange={handleSesiChange}
                                id="sesi"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={sesiOptions}
                            />
                            {validation.sesi_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.sesi_id[0]}
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
                            className="h-10 mt-10 bg-[#1597E5] col-span-2 col-start-3 text-gray-200 rounded-lg shadow-lg font-semibold"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </SidebarNew>
    );
}
