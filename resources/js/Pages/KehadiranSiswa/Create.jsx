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

export default function CreateKehadiran({
    errors,
    session,
    siswas,
    jadwal_bimbels,
}) {
    const [siswaId, setSiswaId] = useState("");
    const [jadwalBimbelId, setJadwalBimbelId] = useState("");
    const [absensiStatus, setAbsensiStatus] = useState("");
    const [validation, setValidation] = useState([]);
    const [siswaOptions, setSiswaOptions] = useState([""]);
    const [jadwalBimbelOptions, setJadwalBimbelOptions] = useState([""]);
    const [absensiOptions, setAbsensiOptions] = useState([""]);

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
            siswas.map((siswa, index) => {
                return arr.push({ value: siswa.id, label: siswa.siswa_name });
            });

            jadwal_bimbels.map((jadwal) => {
                return arr2.push({
                    value: jadwal.id,
                    label: `${jadwal.siswa.siswa_name} - ${jadwal.programs_x_kelas.program.program_name} - ${jadwal.programs_x_kelas.kelas.kelas_name} - ${jadwal.tentor.mapel.mapels_name} - ${jadwal.sesi.sesi_name}`,
                });
            });

            setSiswaOptions(arr);

            setJadwalBimbelOptions(arr2);

            setAbsensiOptions(arr3);
        };
        getData();
        console.log(siswaOptions);
    }, []);

    const handleSiswaChange = (selectedOption) => {
        setSiswaId(selectedOption.value);
    };

    const handleJadwalChange = (selectedOption) => {
        setJadwalBimbelId(selectedOption.value);
    };

    const handleAbsensiChange = (selectedOption) => {
        setAbsensiStatus(selectedOption.value);
    };

    // const MySwal = withReactContent(Swal)

    const submitKehadiran = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append("siswa_id", siswaId);
        formData.append("jadwal_bimbel_id", jadwalBimbelId);
        formData.append("absensi_status", absensiStatus);

        await axios
            .post("/kehadiransiswa", formData)

            .then((res) => {
                // console.log(res)
                // localStorage.setItem('token', res.data.token)
                Inertia.get("/kehadiransiswa");
                swal({
                    title: "SUCCESS!",
                    text: "Data Kehadiran Berhasil Ditambahkan!",
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
                    TAMBAH KEHADIRAN
                </div>
                <form onSubmit={submitKehadiran}>
                    <div className="grid grid-cols-4 gap-x-4 px-5">
                        <div className="col-span-2 my-2">
                            <label
                                htmlFor="nama_siswa"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Pilih Siswa
                            </label>
                            <Select
                                onChange={handleSiswaChange}
                                id="nama_siswa"
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={siswaOptions}
                            />
                            {validation.siswa_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.siswa_id[0]}
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
                                onChange={handleJadwalChange}
                                id="nama_jadwal"
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={jadwalBimbelOptions}
                            />
                            {validation.jadwal_bimbel_id && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div
                                        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
                                        role="alert"
                                    >
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                            Warning
                                        </span>
                                        <span className="font-normal mr-2 text-left flex-auto">
                                            {validation.jadwal_bimbel_id[0]}
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
                                onChange={handleAbsensiChange}
                                id="status_absensi"
                                className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
