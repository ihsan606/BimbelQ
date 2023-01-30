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

export default function EditKehadiran({
    errors,
    session,
    tentors,
    jadwal_bimbels,
    kehadirans,
}) {
    const [tentorsId, setTentorsId] = useState(kehadirans.tentor.id);
    const [jadwalBimbelId, setJadwalBimbelId] = useState(
        kehadirans.jadwal_bimbel.id
    );
    const [absensiStatus, setAbsensiStatus] = useState(
        kehadirans.absensi_status
    );
    const [validation, setValidation] = useState([]);
    const [tentorOptions, setTentorOptions] = useState([""]);
    const [jadwalBimbelOptions, setJadwalBimbelOptions] = useState([""]);
    const [absensiOptions, setAbsensiOptions] = useState([""]);

    const [tentorDefault, setTentorDefault] = useState({
        value: kehadirans.tentor.id,
        label: kehadirans.tentor.tentors_name,
    });
    const [jadwalBimbelDefault, setJadwalBimbelDefault] = useState({
        value: kehadirans.jadwal_bimbel.id,
        label: `${kehadirans.jadwal_bimbel.tentor.tentors_name} - ${kehadirans.jadwal_bimbel.programs_x_kelas.program.program_name} - ${kehadirans.jadwal_bimbel.programs_x_kelas.kelas.kelas_name} - ${kehadirans.jadwal_bimbel.tentor.mapel.mapels_name} - ${kehadirans.jadwal_bimbel.sesi.sesi_name}`,
    });
    const [absensiDefault, setAbsensiDefault] = useState({
        value: kehadirans.absensi_status,
        label: kehadirans.absensi_status == 0 ? "Tidak Hadir" : "Hadir",
    });

    useEffect(() => {
        const getData = () => {
            const arr = [];
            const arr2 = [];
            const arr3 = [
                {
                    value: 0,
                    label: "Tidak Hadir",
                },
                {
                    value: 1,
                    label: "Hadir",
                },
            ];
            tentors.map((tentor, index) => {
                return arr.push({
                    value: tentor.id,
                    label: tentor.tentors_name,
                });
            });

            jadwal_bimbels.map((jadwal) => {
                return arr2.push({
                    value: jadwal.id,
                    label: `${jadwal.tentor.tentors_name} - ${jadwal.programs_x_kelas.program.program_name} - ${jadwal.programs_x_kelas.kelas.kelas_name} - ${jadwal.tentor.mapel.mapels_name} - ${jadwal.sesi.sesi_name}`,
                });
            });

            setTentorOptions(arr);

            setJadwalBimbelOptions(arr2);

            setAbsensiOptions(arr3);
        };
        getData();
        console.log(tentorOptions);
    }, []);

    const handleTentorChange = (selectedOption) => {
        setTentorsId(selectedOption.value);
    };

    const handleJadwalChange = (selectedOption) => {
        setJadwalBimbelId(selectedOption.value);
    };

    const handleAbsensiChange = (selectedOption) => {
        setAbsensiStatus(selectedOption.value);
    };

    // const MySwal = withReactContent(Swal)

    const submitKehadiran = (e) => {
        e.preventDefault();

        const formData = new FormData();

        //append data to formData

        Inertia.put(`/kehadirantentor/${kehadirans.id}`, {
            tentors_id: tentorsId,
            jadwal_bimbels_id: jadwalBimbelId,
            absensi_status: absensiStatus,
        });

        // Inertia.get('/tarifs')
        swal({
            title: "SUCCESS!",
            text: "Data Kehadiran Berhasil Diupdate!",
            icon: "success",
            buttons: false,
        });
    };

    return (
        <SidebarNew>
            <div className=" w-full  rounded-lg shadow-xl pb-4 ">
                <div className="header mb-3 bg-[#E1F4FF] px-3 border border-1 py-3 font-normal text-xl text-gray-600  shadow-none rounded-t-lg drop-shadow-none ">
                    EDIT KEHADIRAN
                </div>
                <form onSubmit={submitKehadiran}>
                    <div className="grid grid-cols-4 gap-x-4 px-5">
                        <div className="col-span-2 my-2">
                            <label
                                htmlFor="nama_tentor"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Tentor
                            </label>
                            <Select
                                defaultValue={tentorDefault}
                                onChange={handleTentorChange}
                                id="nama_tentor"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={tentorOptions}
                            />
                            {validation.tentors_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.tentors_id[0]}
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
                                htmlFor="nama_jadwal"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Jadwal
                            </label>
                            <Select
                                defaultValue={jadwalBimbelDefault}
                                onChange={handleJadwalChange}
                                id="nama_jadwal"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={jadwalBimbelOptions}
                            />
                            {validation.jadwal_bimbels_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.jadwal_bimbels_id[0]}
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
                                htmlFor="status_absensi"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Status
                            </label>
                            <Select
                                defaultValue={absensiDefault}
                                onChange={handleAbsensiChange}
                                id="status_absensi"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={absensiOptions}
                            />
                            {validation.status_absensi && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.status_absensi[0]}
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
                            className="h-10 mt-11 bg-[#1597E5] col-span-2 col-start-3 text-gray-200 rounded-lg shadow-lg font-semibold"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </SidebarNew>
    );
}
