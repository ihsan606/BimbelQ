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

export default function CreateTarif({ errors, session, programs, clases }) {
    const [programId, setProgramId] = useState("");
    const [kelasId, setKelasId] = useState("");
    const [tarifBelajar, setTarifBelajar] = useState("");
    const [tarifMentor, setTarifMentor] = useState("");
    const [validation, setValidation] = useState([]);
    const [options, setOptions] = useState([""]);
    const [kelasOptions, setKelasOptions] = useState([""]);

    useEffect(() => {
        const getData = () => {
            const arr = [];
            const arr2 = [];
            programs.map((prog, index) => {
                return arr.push({ value: prog.id, label: prog.program_name });
            });

            clases.map((kelas) => {
                return arr2.push({ value: kelas.id, label: kelas.kelas_name });
            });

            setKelasOptions(arr2);

            setOptions(arr);
        };
        getData();
        console.log(options);
    }, []);

    const handleKelasChange = (selectedOption) => {
        setKelasId(selectedOption.value);
    };

    const handleProgramChange = (selectedOption) => {
        setProgramId(selectedOption.value);
    };

    // const MySwal = withReactContent(Swal)

    const submitTarif = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append("program_id", programId);
        formData.append("kelas_id", kelasId);
        formData.append("tarif_belajar", tarifBelajar);
        formData.append("tarif_tentor", tarifMentor);

        await axios
            .post("/tarifs", formData)

            .then((res) => {
                // console.log(res)
                // localStorage.setItem('token', res.data.token)
                Inertia.get("/tarifs");
                swal({
                    title: "SUCCESS!",
                    text: "Data Kelas Berhasil Ditambahkan!",
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
                    TAMBAH TARIF
                </div>
                <form onSubmit={submitTarif}>
                    <div className="grid grid-cols-4 gap-x-4 px-5">
                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="tarif_belajar"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Tarif Belajar
                            </label>
                            <input
                                type="number"
                                id="tarif_belajar"
                                onChange={(e) =>
                                    setTarifBelajar(e.target.value)
                                }
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Rp..."
                            />
                            {validation.tarif_belajar && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tarif_belajar[0]}
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
                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="tarif_mentor"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Tarif Mentor
                            </label>
                            <input
                                type="number"
                                id="tarif_mentor"
                                onChange={(e) => setTarifMentor(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Rp..."
                            />
                            {validation.tarif_tentor && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tarif_tentor[0]}
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
                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="kelas"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Kelas
                            </label>
                            <Select
                                onChange={handleKelasChange}
                                id="kelas"
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={kelasOptions}
                            />
                            {validation.kelas_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.kelas_id[0]}
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
                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="program"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Program
                            </label>
                            <Select
                                onChange={handleProgramChange}
                                id="program"
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={options}
                            />
                            {validation.program_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.program_id[0]}
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
                            className="h-10 mt-8 bg-[#1597E5] col-span-1 col-start-4 text-gray-200 rounded-lg shadow-lg font-semibold"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </SidebarNew>
    );
}
