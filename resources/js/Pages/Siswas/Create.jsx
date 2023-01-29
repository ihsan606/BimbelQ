//import React
import React, {useState} from 'react';
import swal from 'sweetalert';


//import Link
import SidebarNew from "../../Layouts/SidebarNew";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

export default function CreateClass({ errors, session }) {

    const [siswaName, setSiswaName] = useState("");
    const [siswaEmail, setSiswaEmail] = useState("");
    const [validation, setValidation] = useState([]);
    // const MySwal = withReactContent(Swal)

    const submitSiswa = async (e)=>{
        e.preventDefault();

        const formData = new FormData();

        //append data to formData
        formData.append('siswa_name', siswaName);
        formData.append('siswa_email', siswaEmail);

        await axios.post('/siswas', formData)

            .then((res)=>{
                Inertia.get('/siswas')
                swal({
                    title: "SUCCESS!",
                    text: "Data Siswa Berhasil Ditambahkan!",
                    icon: "success",
                    buttons: false

                });



            })

            .catch((errors)=>{
                setValidation(errors.response.data)
                console.log(errors.response.data)
                console.log("--------", errors.response.data)
            })


    }



    return (
        <SidebarNew>
            <div className=" w-full  rounded-lg shadow-xl pb-4 ">
                <div className="header mb-3 bg-[#E1F4FF] px-3 border border-1 py-3 font-medium text-2xl text-gray-600  shadow-none rounded-t-lg drop-shadow-none ">
                    TAMBAH SISWA
                </div>
                <form onSubmit={submitSiswa}>
                    <div className="grid grid-cols-4">
                        <div className="col-span-3 ml-5 mt-2">
                            <label htmlFor="siswa_name"
                                   className="block text-sm mb-1 font-semibold text-gray-500 dark:text-white">Nama Siswa</label>
                            <input type="text" id="siswa_name"
                                   onChange={(e) => setSiswaName(e.target.value)}
                                   className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Nama..."/>
                            <label htmlFor="siswa_email"
                                   className="block text-sm mb-1 mt-2 font-semibold text-gray-500 dark:text-white">Email Siswa</label>
                            <input type="text" id="siswa_email"
                                   onChange={(e) => setSiswaEmail(e.target.value)}
                                   className="bg-gray-50 dark:bg-gray-50 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Email..."/>
                            {validation.siswa_name && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                                        <span className="font-semibold mr-2 text-left flex-auto">{validation.siswa_name[0]}</span>
                                        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                    </div>
                                </div>
                            )}
                            {validation.siswa_email && (
                                <div className="bg-white text-center py-1 lg:px-4">
                                    <div className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                                        <span className="font-semibold mr-2 text-left flex-auto">{validation.siswa_email[0]}</span>
                                        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="h-10 mt-8 bg-[#1597E5] text-gray-200 mx-4 rounded-lg shadow-lg font-semibold">
                            SUBMIT
                        </button>
                    </div>

                </form>

            </div>
        </SidebarNew>
    )
}
