//import React
import React, {useEffect} from 'react';

//import Link
import { Link } from '@inertiajs/inertia-react';
import Layout from "../../Layouts/Default";
import SidebarNew from "../../Layouts/SidebarNew";
import {Inertia} from "@inertiajs/inertia";
import swal from "sweetalert";

export default function JadwalIndex({ jadwal_bimbels, session }) {

    const deleteJadwal = async (id)=>{
        Inertia.delete(`/jadwal-bimbels/${id}`)

        await swal({
            title: "SUCCESS!",
            text: "Data Kelas Berhasil Dihapus!",
            icon: "success",
            buttons: false

        });
    }

    const sum = (data)=>{
        let result = 0;
        data.map((jadwal, idx)=>{
            if(jadwal.jadwal_bimbels.length == 0){
                result +=1
            }
            result += jadwal.jadwal_bimbels.length
        })

        console.log(result)

        return result

    }

    useEffect(()=>{
        console.log(jadwal_bimbels)

    })

    return (
        <SidebarNew>
            <div >

                <Link href="/jadwal-bimbels/create" className="btn text-white gap-x-2 shadow-lg btn-success btn-md ml-8">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 9H15V11H11V15H9V11H5V9H9V5H11V9ZM10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z" fill="white"/>
                    </svg>

                    TAMBAH JADWAL BIMBEL
                </Link>



                <div className=" border-0 rounded shadow-sm">
                    <div className="card-body">
                        <table className="table table-auto bg-white shadow-lg rounded-lg">
                            <thead className="bg-[#E1F4FF]">
                            <tr>
                                <th className="bg-[#E1F4FF] font-medium text-[#1597E5] w-28" scope="col">SESI</th>
                                <th className="bg-[#E1F4FF] font-medium text-[#1597E5]" scope="col">MENTOR</th>
                                <th className="bg-[#E1F4FF] font-medium text-[#1597E5]" scope="col">SISWA</th>
                                <th className="bg-[#E1F4FF] font-medium text-[#1597E5]" scope="col">PROGRAM / KELAS</th>
                                <th className="bg-[#E1F4FF] font-medium text-[#1597E5] text-center w-32" scope="col">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>

                            {/*{jadwal_bimbels.map((sesi, index) => (*/}

                            {/*        <>*/}
                            {/*            {sesi.tentors.length > 1 && (*/}

                            {/*                <>*/}
                            {/*                    {sesi.tentors.map((tentor, idx) => (*/}
                            {/*                        <>*/}

                            {/*                            {tentor.jadwal_bimbels.length > 1 && (*/}
                            {/*                                <>*/}
                            {/*                                    <tr>*/}
                            {/*                                        <td>{sesi.sesi_name} </td>*/}
                            {/*                                        <td>{tentor.jadwal_bimbels.length} </td>*/}
                            {/*                                    </tr>*/}
                            {/*                                    /!*<tr key={`${sesi.sesi_name}-${tentor.tentors_name}-${index}-${idx}-'id'`}>*!/*/}
                            {/*                                    /!*    <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name} </td>*!/*/}
                            {/*                                    /!*</tr>*!/*/}
                            {/*                                </>*/}
                            {/*                            )}*/}

                            {/*                            {*/}
                            {/*                                tentor.jadwal_bimbels.length == 1 && (*/}
                            {/*                                    <>*/}
                            {/*                                        <tr>*/}
                            {/*                                            <td>{sesi.sesi_name} </td>*/}
                            {/*                                            <td>{tentor.jadwal_bimbels.length} </td>*/}
                            {/*                                        </tr>*/}
                            {/*                                    </>*/}
                            {/*                                )*/}
                            {/*                            }*/}
                            {/*                        </>*/}
                            {/*                    ))}*/}
                            {/*                </>*/}
                            {/*            ) }*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*)}*/}

                            {
                                jadwal_bimbels.map((sesi, index) =>(
                                    <>
                                        {sesi.tentors.length>1 && (
                                            <>
                                                {sesi.tentors.map((tentor, idx) => (
                                                    <>
                                                        {tentor.jadwal_bimbels.length > 1 && (
                                                            <>
                                                                <tr key={index}>
                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name} </td>
                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sesi.tentors[index].jadwal_bimbels.length}> {tentor.tentors_name} </td>
                                                                    <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].siswa.siswa_name}</td>
                                                                    <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].programs_x_kelas.program.program_name} / {tentor.jadwal_bimbels[0].programs_x_kelas.kelas.kelas_name}  </td>
                                                                    <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">
                                                                        <Link
                                                                            href={`/jadwal-bimbels/${tentor.jadwal_bimbels[0].id}/edit`}
                                                                        >
                                                                            <svg
                                                                                width="32"
                                                                                height="32"
                                                                                viewBox="0 0 32 32"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="32"
                                                                                    height="32"
                                                                                    rx="3"
                                                                                    fill="#6EC889"
                                                                                />
                                                                                <path
                                                                                    d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"
                                                                                    fill="white"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteJadwal(tentor.jadwal_bimbels[0].id)
                                                                            }
                                                                        >
                                                                            <svg
                                                                                width="32"
                                                                                height="32"
                                                                                viewBox="0 0 32 32"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="32"
                                                                                    height="32"
                                                                                    rx="3"
                                                                                    fill="#CA2E43"
                                                                                />
                                                                                <path
                                                                                    d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"
                                                                                    fill="white"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                                {
                                                                    tentor.jadwal_bimbels.map((jadwal, id) => (
                                                                        <>
                                                                            {jadwal.siswa.id != tentor.jadwal_bimbels[0].siswa.id && (
                                                                                <>
                                                                                    <tr >
                                                                                        <td className="border border-1 bg-white border-gray-200">
                                                                                            {jadwal.siswa.siswa_name}
                                                                                        </td>
                                                                                        <td className="border border-1 bg-white border-gray-200">{jadwal.programs_x_kelas.program.program_name} / {jadwal.programs_x_kelas.kelas.kelas_name}  </td>

                                                                                        <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">
                                                                                            <Link
                                                                                                href={`/jadwal-bimbels/${jadwal.id}/edit`}
                                                                                            >
                                                                                                <svg
                                                                                                    width="32"
                                                                                                    height="32"
                                                                                                    viewBox="0 0 32 32"
                                                                                                    fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    <rect
                                                                                                        width="32"
                                                                                                        height="32"
                                                                                                        rx="3"
                                                                                                        fill="#6EC889"
                                                                                                    />
                                                                                                    <path
                                                                                                        d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                    <path
                                                                                                        d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </svg>
                                                                                            </Link>
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    deleteJadwal(jadwal.id)
                                                                                                }
                                                                                            >
                                                                                                <svg
                                                                                                    width="32"
                                                                                                    height="32"
                                                                                                    viewBox="0 0 32 32"
                                                                                                    fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    <rect
                                                                                                        width="32"
                                                                                                        height="32"
                                                                                                        rx="3"
                                                                                                        fill="#CA2E43"
                                                                                                    />
                                                                                                    <path
                                                                                                        d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </svg>
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            ) }
                                                                        </>
                                                                    ))
                                                                }
                                                            </>
                                                        )}
                                                        {
                                                            tentor.jadwal_bimbels.length == 0 && (
                                                                <>
                                                                    {sesi.id == jadwal_bimbels[0].id && (
                                                                        <>
                                                                            {sesi.tentors[0].id == tentor.id  && (
                                                                                <tr>
                                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name}   </td>


                                                                                    <td className="border border-1 bg-white border-gray-200">

                                                                                        {tentor.tentors_name}
                                                                                    </td>
                                                                                    <td colSpan={3} className="bg-yellow-200">Tidak Ada Jadwal</td>
                                                                                </tr>
                                                                            )}

                                                                            {
                                                                                sesi.tentors[0].id != tentor.id && (
                                                                                    <tr>
                                                                                        <td className="border border-1 bg-white border-gray-200" > {tentor.tentors_name}  </td>

                                                                                        <td colSpan={3} className="bg-yellow-200">Tidak Ada Jadwal</td>


                                                                                    </tr>
                                                                                )
                                                                            }


                                                                        </>
                                                                    )}
                                                                    {sesi.id != jadwal_bimbels[0].id && (
                                                                        <>
                                                                            {sesi.tentors[0].id == tentor.id && (
                                                                                <tr>

                                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name} </td>
                                                                                    <td className="border border-1 bg-white border-gray-200" > {tentor.tentors_name} </td>
                                                                                    <td colSpan={3} className="bg-yellow-200">Tidak Ada Jadwal</td>


                                                                                </tr>
                                                                            )}

                                                                            {
                                                                                sesi.tentors[0].id != tentor.id && (
                                                                                    <tr>
                                                                                        <td className="border border-1 bg-white border-gray-200" > {tentor.tentors_name}  </td>

                                                                                        <td colSpan={3} className="bg-yellow-200">Tidak Ada Jadwal</td>


                                                                                    </tr>
                                                                                )
                                                                            }



                                                                        </>
                                                                    )}









                                                                </>
                                                            )
                                                        }

                                                        {
                                                            tentor.jadwal_bimbels.length == 1 && (
                                                                <>
                                                                    {sesi.tentors[0].id == tentor.id && (
                                                                        <>
                                                                            <tr key={index}>
                                                                                <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name} </td>
                                                                                <td className="border border-1 bg-white border-gray-200" rowSpan={sesi.tentors[0].jadwal_bimbels.length}> {tentor.tentors_name}f </td>
                                                                                <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].siswa.siswa_name}</td>
                                                                                <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].programs_x_kelas.program.program_name} / {tentor.jadwal_bimbels[0].programs_x_kelas.kelas.kelas_name}  </td>
                                                                                <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">
                                                                                    <Link
                                                                                        href={`/jadwal-bimbels/${tentor.jadwal_bimbels[0].id}/edit`}
                                                                                    >
                                                                                        <svg
                                                                                            width="32"
                                                                                            height="32"
                                                                                            viewBox="0 0 32 32"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <rect
                                                                                                width="32"
                                                                                                height="32"
                                                                                                rx="3"
                                                                                                fill="#6EC889"
                                                                                            />
                                                                                            <path
                                                                                                d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"
                                                                                                fill="white"
                                                                                            />
                                                                                            <path
                                                                                                d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"
                                                                                                fill="white"
                                                                                            />
                                                                                        </svg>
                                                                                    </Link>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            deleteJadwal(tentor.jadwal_bimbels[0].id)
                                                                                        }
                                                                                    >
                                                                                        <svg
                                                                                            width="32"
                                                                                            height="32"
                                                                                            viewBox="0 0 32 32"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <rect
                                                                                                width="32"
                                                                                                height="32"
                                                                                                rx="3"
                                                                                                fill="#CA2E43"
                                                                                            />
                                                                                            <path
                                                                                                d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"
                                                                                                fill="white"
                                                                                            />
                                                                                        </svg>
                                                                                    </button>
                                                                                </td>
                                                                            </tr>

                                                                        </>
                                                                    )}

                                                                    {sesi.tentors[0].id != tentor.id && (
                                                                        <>
                                                                            <tr key={index}>
                                                                                <td className="border border-1 bg-white border-gray-200" rowSpan={tentor.jadwal_bimbels.length}> {tentor.tentors_name} </td>
                                                                                <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].siswa.siswa_name}</td>
                                                                                <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].programs_x_kelas.program.program_name} / {tentor.jadwal_bimbels[0].programs_x_kelas.kelas.kelas_name}  </td>
                                                                                <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">
                                                                                    <Link
                                                                                        href={`/jadwal-bimbels/${tentor.jadwal_bimbels[0].id}/edit`}
                                                                                    >
                                                                                        <svg
                                                                                            width="32"
                                                                                            height="32"
                                                                                            viewBox="0 0 32 32"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <rect
                                                                                                width="32"
                                                                                                height="32"
                                                                                                rx="3"
                                                                                                fill="#6EC889"
                                                                                            />
                                                                                            <path
                                                                                                d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"
                                                                                                fill="white"
                                                                                            />
                                                                                            <path
                                                                                                d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"
                                                                                                fill="white"
                                                                                            />
                                                                                        </svg>
                                                                                    </Link>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            deleteJadwal(tentor.jadwal_bimbels[0].id)
                                                                                        }
                                                                                    >
                                                                                        <svg
                                                                                            width="32"
                                                                                            height="32"
                                                                                            viewBox="0 0 32 32"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <rect
                                                                                                width="32"
                                                                                                height="32"
                                                                                                rx="3"
                                                                                                fill="#CA2E43"
                                                                                            />
                                                                                            <path
                                                                                                d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"
                                                                                                fill="white"
                                                                                            />
                                                                                        </svg>
                                                                                    </button>
                                                                                </td>
                                                                            </tr>

                                                                        </>
                                                                    )}



                                                                </>
                                                            )
                                                        }

                                                        {/*{tentor.id != sesi.tentors[0].id && (*/}
                                                        {/*    <tr>*/}
                                                        {/*        <td className="border border-1 bg-white border-gray-200">{tentor.tentors_name} </td>*/}
                                                        {/*        <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].siswa.siswa_name} </td>*/}
                                                        {/*        <td className="border border-1 bg-white border-gray-200">{tentor.jadwal_bimbels[0].programs_x_kelas.program.program_name} / {tentor.jadwal_bimbels[0].programs_x_kelas.kelas.kelas_name}  </td>*/}

                                                        {/*        <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">*/}
                                                        {/*            <Link*/}
                                                        {/*                href={`/jadwal-bimbels/${tentor.jadwal_bimbels[0].id}/edit`}*/}
                                                        {/*            >*/}
                                                        {/*                <svg*/}
                                                        {/*                    width="32"*/}
                                                        {/*                    height="32"*/}
                                                        {/*                    viewBox="0 0 32 32"*/}
                                                        {/*                    fill="none"*/}
                                                        {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                                                        {/*                >*/}
                                                        {/*                    <rect*/}
                                                        {/*                        width="32"*/}
                                                        {/*                        height="32"*/}
                                                        {/*                        rx="3"*/}
                                                        {/*                        fill="#6EC889"*/}
                                                        {/*                    />*/}
                                                        {/*                    <path*/}
                                                        {/*                        d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"*/}
                                                        {/*                        fill="white"*/}
                                                        {/*                    />*/}
                                                        {/*                    <path*/}
                                                        {/*                        d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"*/}
                                                        {/*                        fill="white"*/}
                                                        {/*                    />*/}
                                                        {/*                </svg>*/}
                                                        {/*            </Link>*/}
                                                        {/*            <button*/}
                                                        {/*                onClick={() =>*/}
                                                        {/*                    deleteJadwal(tentor.jadwal_bimbels[0].id)*/}
                                                        {/*                }*/}
                                                        {/*            >*/}
                                                        {/*                <svg*/}
                                                        {/*                    width="32"*/}
                                                        {/*                    height="32"*/}
                                                        {/*                    viewBox="0 0 32 32"*/}
                                                        {/*                    fill="none"*/}
                                                        {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                                                        {/*                >*/}
                                                        {/*                    <rect*/}
                                                        {/*                        width="32"*/}
                                                        {/*                        height="32"*/}
                                                        {/*                        rx="3"*/}
                                                        {/*                        fill="#CA2E43"*/}
                                                        {/*                    />*/}
                                                        {/*                    <path*/}
                                                        {/*                        d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"*/}
                                                        {/*                        fill="white"*/}
                                                        {/*                    />*/}
                                                        {/*                </svg>*/}
                                                        {/*            </button>*/}
                                                        {/*        </td>*/}
                                                        {/*    </tr>*/}
                                                        {/*)}*/}



                                                    </>
                                                ))}


                                            </>


                                        )}

                                        {
                                            sesi.tentors.length ==1 &&(
                                                <>
                                                    {
                                                        sesi.tentors[0].jadwal_bimbels.length > 0 && (
                                                            <>
                                                                <tr>
                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sesi.tentors[0].jadwal_bimbels.length}>{sesi.sesi_name} </td>
                                                                    <td className="border border-1 bg-white border-gray-200" rowSpan={sesi.tentors[0].jadwal_bimbels.length}>{sesi.tentors[0].tentors_name} </td>
                                                                    <td className="border border-1 bg-white border-gray-200">{sesi.tentors[0].jadwal_bimbels[0].siswa.siswa_name} </td>
                                                                    <td className="border border-1 bg-white border-gray-200">{sesi.tentors[0].jadwal_bimbels[0].programs_x_kelas.program.program_name} / {sesi.tentors[0].jadwal_bimbels[0].programs_x_kelas.kelas.kelas_name}  </td>


                                                                    <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">
                                                                        <Link
                                                                            href={`/jadwal-bimbels/${sesi.tentors[0].jadwal_bimbels[0].id}/edit`}
                                                                        >
                                                                            <svg
                                                                                width="32"
                                                                                height="32"
                                                                                viewBox="0 0 32 32"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="32"
                                                                                    height="32"
                                                                                    rx="3"
                                                                                    fill="#6EC889"
                                                                                />
                                                                                <path
                                                                                    d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"
                                                                                    fill="white"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteJadwal(sesi.tentors[0].jadwal_bimbels[0].id)
                                                                            }
                                                                        >
                                                                            <svg
                                                                                width="32"
                                                                                height="32"
                                                                                viewBox="0 0 32 32"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="32"
                                                                                    height="32"
                                                                                    rx="3"
                                                                                    fill="#CA2E43"
                                                                                />
                                                                                <path
                                                                                    d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"
                                                                                    fill="white"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                {/*{*/}
                                                                {/*    sesi.tentors[0].jadwal_bimbels.map((siswa, d)=> (*/}
                                                                {/*        <>*/}
                                                                {/*            {*/}
                                                                {/*                siswa.siswa.id !== sesi.tentors[0].jadwal_bimbels[0].siswa.id && (*/}
                                                                {/*                    <tr>*/}
                                                                {/*                        <td className="border border-1 bg-white border-gray-200">{siswa.siswa.siswa_name} </td>*/}
                                                                {/*                        <td className="border border-1 bg-white border-gray-200">{siswa.programs_x_kelas.program.program_name} / {siswa.programs_x_kelas.kelas.kelas_name}  </td>*/}

                                                                {/*                        <td className="text-center grid grid-cols-2 border border-1 bg-white border-gray-200">*/}
                                                                {/*                            <Link*/}
                                                                {/*                                href={`/jadwal-bimbels/${siswa.id}/edit`}*/}
                                                                {/*                            >*/}
                                                                {/*                                <svg*/}
                                                                {/*                                    width="32"*/}
                                                                {/*                                    height="32"*/}
                                                                {/*                                    viewBox="0 0 32 32"*/}
                                                                {/*                                    fill="none"*/}
                                                                {/*                                    xmlns="http://www.w3.org/2000/svg"*/}
                                                                {/*                                >*/}
                                                                {/*                                    <rect*/}
                                                                {/*                                        width="32"*/}
                                                                {/*                                        height="32"*/}
                                                                {/*                                        rx="3"*/}
                                                                {/*                                        fill="#6EC889"*/}
                                                                {/*                                    />*/}
                                                                {/*                                    <path*/}
                                                                {/*                                        d="M6.99854 21.4613V24.5013C6.99854 24.7813 7.21854 25.0013 7.49854 25.0013H10.5385C10.6685 25.0013 10.7985 24.9513 10.8885 24.8513L21.8085 13.9413L18.0585 10.1913L7.14854 21.1013C7.04854 21.2013 6.99854 21.3213 6.99854 21.4613Z"*/}
                                                                {/*                                        fill="white"*/}
                                                                {/*                                    />*/}
                                                                {/*                                    <path*/}
                                                                {/*                                        d="M24.7085 9.63128L22.3685 7.29128C21.9785 6.90128 21.3485 6.90128 20.9585 7.29128L19.1285 9.12128L22.8785 12.8713L24.7085 11.0413C25.0985 10.6513 25.0985 10.0213 24.7085 9.63128Z"*/}
                                                                {/*                                        fill="white"*/}
                                                                {/*                                    />*/}
                                                                {/*                                </svg>*/}
                                                                {/*                            </Link>*/}
                                                                {/*                            <button*/}
                                                                {/*                                onClick={() =>*/}
                                                                {/*                                    deleteJadwal(siswa.id)*/}
                                                                {/*                                }*/}
                                                                {/*                            >*/}
                                                                {/*                                <svg*/}
                                                                {/*                                    width="32"*/}
                                                                {/*                                    height="32"*/}
                                                                {/*                                    viewBox="0 0 32 32"*/}
                                                                {/*                                    fill="none"*/}
                                                                {/*                                    xmlns="http://www.w3.org/2000/svg"*/}
                                                                {/*                                >*/}
                                                                {/*                                    <rect*/}
                                                                {/*                                        width="32"*/}
                                                                {/*                                        height="32"*/}
                                                                {/*                                        rx="3"*/}
                                                                {/*                                        fill="#CA2E43"*/}
                                                                {/*                                    />*/}
                                                                {/*                                    <path*/}
                                                                {/*                                        d="M19.3807 10.6667V9.45833C19.3807 8.6625 18.804 8 18.0085 8H13.9875C13.196 8 12.6193 8.6625 12.6193 9.45833V10.6667H9V12H9.36591C9.36591 12 9.58068 12.025 9.69205 12.1417C9.80341 12.2583 9.84716 12.5167 9.84716 12.5167L10.6028 22.5875C10.6625 23.8125 10.6625 24 12.0347 24H19.9653C21.3375 24 21.3375 23.8167 21.3972 22.5917L22.1528 12.525C22.1528 12.525 22.1966 12.2625 22.308 12.1458C22.4193 12.0292 22.6341 12.0042 22.6341 12.0042H23V10.6708H19.3807V10.6667ZM13.4545 9.45833C13.4545 9.05833 13.7648 8.83333 14.1585 8.83333H17.8057C18.1994 8.83333 18.5455 9.0625 18.5455 9.45833V10.6667H13.4545V9.45833ZM13.1165 21.3333L12.7068 13.3333H13.5142L13.9318 21.3333H13.1165ZM16.4415 21.3333H15.5665V13.3333H16.4415V21.3333ZM18.8915 21.3333H18.0801L18.4977 13.3333H19.3051L18.8915 21.3333Z"*/}
                                                                {/*                                        fill="white"*/}
                                                                {/*                                    />*/}
                                                                {/*                                </svg>*/}
                                                                {/*                            </button>*/}
                                                                {/*                        </td>*/}
                                                                {/*                    </tr>*/}
                                                                {/*                )*/}
                                                                {/*            }*/}

                                                                {/*        </>*/}

                                                                {/*    ))*/}
                                                                {/*}*/}

                                                            </>


                                                        )
                                                    }

                                                    {
                                                        sesi.tentors[0].jadwal_bimbels.length == 0 && (
                                                            <tr>
                                                                <td className="border border-1 bg-white border-gray-200" rowSpan={sum(sesi.tentors)}> {sesi.sesi_name} </td>
                                                                <td className="border border-1 bg-white border-gray-200" rowSpan={sesi.tentors[0].jadwal_bimbels.length > 0 ? sesi.tentors[0].jadwal_bimbels.length: 1}> {sesi.tentors[0].tentors_name} </td>
                                                                <td colSpan={3} className="bg-yellow-200">Tidak Ada Jadwal</td>

                                                            </tr>
                                                        )
                                                    }

                                                </>

                                            )
                                        }



                                    </>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarNew>
    )
}
