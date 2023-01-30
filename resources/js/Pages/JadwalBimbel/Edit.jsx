//import React
import React, {useEffect, useState} from 'react';
import swal from 'sweetalert';




import SidebarNew from "../../Layouts/SidebarNew";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import Select from "react-select";

export default function EditJadwal({ errors, session, siswas, sesis, program_x_kelases, tentors, jadwal}) {

    const [siswaId, setSiswaId] = useState(jadwal.siswa.id);
    const [sesiId, setSesiId] = useState(jadwal.sesi.id);
    const [programXkelasId, setProgramXkelasId] = useState(jadwal.programs_x_kelas.id);
    const [tentorId, setTentorId] = useState(jadwal.tentor.id);
    const [validation, setValidation] = useState([]);
    const [siswaOptions, setSiswaOptions] = useState([""])
    const [sesiOptions, setSesiOptions] = useState([""])
    const [programXKelasesOptions, setProgramXKelasesOptions] = useState([""])
    const [tentorOptions, setTentorOptions] = useState([""])


    const [siswaDefault, setSiswaDefault] = useState({
        value: jadwal.siswa.id,
        label: jadwal.siswa.siswa_name
    })

    const [sesiDefault, setSesiDefault] = useState({
        value: jadwal.sesi.id,
        label: jadwal.sesi.sesi_name
    })

    const [programXkelasDefault, setprogramXkelasDefault] = useState({
        value: jadwal.programs_x_kelas.id, label: `${jadwal.programs_x_kelas.program.program_name} - ${jadwal.programs_x_kelas.kelas.kelas_name}`
    })

    const [tentorDefault, setTentorDefault] = useState(
        {value: jadwal.tentor.id, label: `${jadwal.tentor.tentors_name} (mentor) - ${jadwal.tentor.mapel.mapels_name}`}
    )


    const handleSiswaChange = (selectedOption) => {
        setSiswaId(selectedOption.value);
    };

    const handleSesiChange = (selectedOption) => {
        setSesiId(selectedOption.value);
    };

    const handleProgramChange = (selectedOption) => {
        setProgramXkelasId(selectedOption.value);
    };

    const handelTentorChange = (selectedOption) => {
        setTentorId(selectedOption.value);
    };

    useEffect(()=>{

        const getData = async ()=> {
            const arrSiswa = []
            const arrSesi = []
            const arrProgram = []
            const arrTentor = []

            siswas.map((siswa, index) => {
                return arrSiswa.push({value: siswa.id, label: siswa.siswa_name})
            })

            sesis.map((sesi)=>{
                return arrSesi.push({value: sesi.id, label: sesi.sesi_name})
            })

            program_x_kelases.map((prog)=>{
                return arrProgram.push({value: prog.id, label: `${prog.program.program_name} - ${prog.kelas.kelas_name}`})
            })

            await axios.get(`/tentor-by-sesi?id=${sesiId}`).then((res)=>{
                let result = res.data
                result.map((tentor)=>{
                    arrTentor.push({value: tentor.id, label: `${tentor.tentors_name} (mentor) - ${tentor.mapel.mapels_name}`})
                })
            })

            setTentorOptions(arrTentor)
            setProgramXKelasesOptions(arrProgram)
            setSiswaOptions(arrSiswa)
            setSesiOptions(arrSesi)
            console.log("sesi change")

        }
        getData()

    },[sesiId])



    const submitKelas = async (e)=>{
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append('siswa_id', siswaId);
        formData.append('sesi_id', sesiId);
        formData.append('programs_x_kelas_id', programXkelasId);
        formData.append('tentor_id', tentorId);

        Inertia.put(`/jadwal-bimbels/${jadwal.id}`, {
            siswa_id: siswaId,
            sesi_id: sesiId,
            programs_x_kelas_id: programXkelasId,
            tentor_id: tentorId
        })


                // Inertia.get('/jadwal-bimbels')
                swal({
                    title: "SUCCESS!",
                    text: "Data Jadwal Berhasil Ditambahkan!",
                    icon: "success",
                    buttons: false

                });



    }



    return (
        <SidebarNew>
            <div className=" w-full  rounded-lg shadow-xl pb-4 ">
                <div className="header mb-3 bg-[#E1F4FF] px-3 border border-1 py-3 font-normal text-2xl text-gray-600  shadow-none rounded-t-lg drop-shadow-none ">
                    EDIT JADWAL BIMBEL
                </div>
                <form onSubmit={submitKelas}>
                    <div className="grid grid-cols-4 gap-x-4 px-5">

                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="siswa"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Siswa
                            </label>
                            <Select
                                defaultValue={siswaDefault}
                                onChange={handleSiswaChange}
                                id="siswa"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={siswaOptions}
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
                                htmlFor="sesi"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Sesi
                            </label>
                            <Select
                                defaultValue={sesiDefault}
                                onChange={handleSesiChange}
                                id="sesi"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={sesiOptions}
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

                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="program"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Program / Kelas
                            </label>
                            <Select
                                defaultValue={programXkelasDefault}
                                onChange={handleProgramChange}
                                id="program"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={programXKelasesOptions}
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

                        <div className="col-span-2 mt-2">
                            <label
                                htmlFor="tentor"
                                className="block text-sm mb-1 font-normal text-gray-500 dark:text-white"
                            >
                                Tentor / Mapel
                            </label>
                            <Select
                                defaultValue={tentorDefault}
                                isDisabled={sesiId==""}
                                onChange={handelTentorChange}
                                id="tentor"
                                className="bg-gray-50 w-full dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={tentorOptions}
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
    )
}
