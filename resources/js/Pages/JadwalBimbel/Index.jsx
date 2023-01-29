//import React
import React, { useEffect } from "react";

//import Link
import { Link } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Default";
import SidebarNew from "../../Layouts/SidebarNew";
import { Inertia } from "@inertiajs/inertia";
import swal from "sweetalert";

export default function ClassIndex({ jadwal_bimbels, session }) {
    const deleteJadwal = async (id) => {
        Inertia.delete(`/class/${id}`);

        await swal({
            title: "SUCCESS!",
            text: "Data Kelas Berhasil Dihapus!",
            icon: "success",
            buttons: false,
        });
    };

    useEffect(() => {
        console.log(jadwal_bimbels);
    });

    return (
        <SidebarNew>
            <div>
                <Link
                    href="/class/create"
                    className="btn text-white gap-x-2 shadow-lg btn-success btn-md ml-8"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 9H15V11H11V15H9V11H5V9H9V5H11V9ZM10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z"
                            fill="white"
                        />
                    </svg>
                    TAMBAH KELAS
                </Link>

                <div className=" border-0 rounded shadow-sm">
                    <div className="card-body">
                        <table className="table table-auto bg-white shadow-lg rounded-lg">
                            <thead className="bg-[#E1F4FF]">
                                <tr>
                                    <th
                                        className="bg-[#E1F4FF] font-medium text-[#1597E5] w-28"
                                        scope="col"
                                    >
                                        SESI
                                    </th>
                                    <th
                                        className="bg-[#E1F4FF] font-medium text-[#1597E5]"
                                        scope="col"
                                    >
                                        MENTOR
                                    </th>
                                    <th
                                        className="bg-[#E1F4FF] font-medium text-[#1597E5]"
                                        scope="col"
                                    >
                                        SISWA
                                    </th>
                                    <th
                                        className="bg-[#E1F4FF] font-medium text-[#1597E5] text-center w-32"
                                        scope="col"
                                    >
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jadwal_bimbels.map((sesi, index) => (
                                    <>
                                        {sesi.tentors.length > 1 && (
                                            <>
                                                <tr key={index}>
                                                    <td
                                                        rowSpan={
                                                            sesi.tentors.length
                                                        }
                                                    >
                                                        {" "}
                                                        {sesi.sesi_name}{" "}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        {
                                                            sesi.tentors[index]
                                                                .tentors_name
                                                        }{" "}
                                                    </td>
                                                    <td className="text-center grid grid-cols-2">
                                                        edit
                                                    </td>
                                                </tr>
                                                {sesi.tentors.map(
                                                    (tentor, i) => (
                                                        <>
                                                            {sesi.tentors[index]
                                                                .id !=
                                                                tentor.id && (
                                                                <tr>
                                                                    <td>
                                                                        {" "}
                                                                        {
                                                                            tentor.tentors_name
                                                                        }{" "}
                                                                    </td>
                                                                    <td className="text-center grid grid-cols-2">
                                                                        edit
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </>
                                                    )
                                                )}
                                                <tr></tr>
                                            </>
                                        )}

                                        {sesi.tentors.length == 1 && (
                                            <>
                                                {sesi.tentors[0].jadwal_bimbels
                                                    .length > 1 && (
                                                    <>
                                                        <tr>
                                                            <td
                                                                rowSpan={
                                                                    sesi
                                                                        .tentors[0]
                                                                        .jadwal_bimbels
                                                                        .length
                                                                }
                                                            >
                                                                {sesi.sesi_name}{" "}
                                                            </td>
                                                            <td
                                                                rowSpan={
                                                                    sesi
                                                                        .tentors[0]
                                                                        .jadwal_bimbels
                                                                        .length
                                                                }
                                                            >
                                                                {
                                                                    sesi
                                                                        .tentors[0]
                                                                        .tentors_name
                                                                }{" "}
                                                            </td>
                                                            <td>
                                                                {
                                                                    sesi
                                                                        .tentors[0]
                                                                        .jadwal_bimbels[0]
                                                                        .siswa
                                                                        .siswa_name
                                                                }{" "}
                                                            </td>
                                                            <td className="text-center grid grid-cols-2">
                                                                edit{" "}
                                                                {
                                                                    sesi
                                                                        .tentors[0]
                                                                        .jadwal_bimbels
                                                                        .length
                                                                }
                                                            </td>
                                                        </tr>
                                                        {sesi.tentors[0].jadwal_bimbels.map(
                                                            (siswa, d) => (
                                                                <>
                                                                    {siswa.siswa
                                                                        .id !==
                                                                        sesi
                                                                            .tentors[0]
                                                                            .jadwal_bimbels[0]
                                                                            .siswa
                                                                            .id && (
                                                                        <tr>
                                                                            <td>
                                                                                {
                                                                                    siswa
                                                                                        .siswa
                                                                                        .siswa_name
                                                                                }{" "}
                                                                            </td>
                                                                            <td className="text-center grid grid-cols-2">
                                                                                edit{" "}
                                                                                {
                                                                                    sesi
                                                                                        .tentors[0]
                                                                                        .jadwal_bimbels
                                                                                        .length
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                ))}
                                {/*<tr>*/}
                                {/*    <td rowSpan="5">SENIN</td>*/}
                                {/*    <td rowSpan="3">mentor 1</td>*/}
                                {/*    <td>siswa 1</td>*/}
                                {/*    <td>Edit</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>siswa 2</td>*/}
                                {/*    <td>Edit</td>*/}
                                {/*</tr>*/}

                                {/*<tr>*/}
                                {/*    <td>siswa 3</td>*/}
                                {/*    <td>Edit</td>*/}
                                {/*</tr>*/}

                                {/*<tr>*/}
                                {/*    <td rowSpan={2}>mentor 2</td>*/}
                                {/*    <td>siswa 2</td>*/}
                                {/*    <td>Edit</td>*/}

                                {/*</tr>*/}

                                {/*<tr>*/}
                                {/*    <td>siswa 4</td>*/}
                                {/*    <td>Edit</td>*/}
                                {/*</tr>*/}

                                {/*<tr>*/}
                                {/*    <td>SELASA</td>*/}
                                {/*    <td>mentor 2</td>*/}
                                {/*    <td>siswa 2</td>*/}
                                {/*    <td>Edit</td>*/}

                                {/*</tr>*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarNew>
    );
}
