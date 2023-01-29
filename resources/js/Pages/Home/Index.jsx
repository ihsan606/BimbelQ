//import React
import React, {useEffect, useState} from 'react';

import axios from "axios";
import SidebarNew from "../../Layouts/SidebarNew";

export default function Home({ tentors, siswas }) {
    //token
    const token = localStorage.getItem("token");

    //state user
    const [user, setUser] = useState({});

    //function "fetchData"
    const fetchData = async () => {

         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('/user')
            .then((response) => {

                //set response user to state
                setUser(response.data);
            }).catch((err)=>{
                // if(err.response.data.message == 'Unauthenticated.'){
                //     window.location.replace('/login')
                // }
            })
    }

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('/auth/logout')
            .then(() => {

                //remove token from localStorage
                localStorage.removeItem("token");

                //redirect halaman login
                window.location.replace('/login')
            });
    };

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            window.location.replace('/login')

        }

        //call function "fetchData"
        fetchData();
    }, []);



    return (
        <SidebarNew>


            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4 h-full">

                <div className="w-full">
                    <div
                        className="bg-gradient-to-b from-green-200 w-full to-green-100 border-b-4 border-green-500 rounded-lg shadow-xl p-3">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full px-4 py-4 bg-green-600">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_963_6)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5 6.5C5 6.36739 5.05268 6.24021 5.14645 6.14645C5.24021 6.05268 5.36739 6 5.5 6H16C16.2652 6 16.5196 5.89464 16.7071 5.70711C16.8946 5.51957 17 5.26522 17 5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H5.5C4.83696 4 4.20107 4.26339 3.73223 4.73223C3.26339 5.20107 3 5.83696 3 6.5V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V9C21 8.46957 20.7893 7.96086 20.4142 7.58579C20.0391 7.21071 19.5304 7 19 7H5.5C5.36739 7 5.24021 6.94732 5.14645 6.85355C5.05268 6.75979 5 6.63261 5 6.5ZM15.5 15C15.8978 15 16.2794 14.842 16.5607 14.5607C16.842 14.2794 17 13.8978 17 13.5C17 13.1022 16.842 12.7206 16.5607 12.4393C16.2794 12.158 15.8978 12 15.5 12C15.1022 12 14.7206 12.158 14.4393 12.4393C14.158 12.7206 14 13.1022 14 13.5C14 13.8978 14.158 14.2794 14.4393 14.5607C14.7206 14.842 15.1022 15 15.5 15Z" fill="#FAFAFA"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_963_6">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>


                                </div>
                            </div>
                            <div className="flex-1 text-right">
                                <h2 className="font-normal text-sm uppercase text-gray-600">Penghasilan</h2>
                                <p className="font-normal text-xl">1,000,000 <span className="text-pink-500"><i
                                    className="fas fa-exchange-alt"></i></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div
                        className="bg-gradient-to-b from-pink-200 w-full to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-3">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full px-4 py-4 bg-pink-600">
                                    <svg width="30" height="30" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6C12 8.21 10.21 10 8 10C5.79 10 4 8.21 4 6L4.11 5.06L1 3.5L8 0L15 3.5V8.5H14V4L11.89 5.06L12 6ZM8 12C12.42 12 16 13.79 16 16V18H0V16C0 13.79 3.58 12 8 12Z" fill="#FAFAFA"/>
                                    </svg>

                                </div>
                            </div>
                            <div className="flex-1 text-right">
                                <h2 className="font-normal text-sm uppercase text-gray-600">Siswa</h2>
                                <p className="font-normal text-xl">{siswas.length}<span className="text-pink-500"><i
                                    className="fas fa-exchange-alt"></i></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div
                        className="bg-gradient-to-b from-blue-200 w-full to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-3">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full px-4 py-4 bg-blue-600">
                                    <svg width="30" height="30" viewBox="0 0 352 282" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_961_2)">
                                            <path d="M114.4 193.875C113.085 193.875 111.771 194.068 110.517 194.475C103.389 196.794 95.8924 198.281 87.9999 198.281C80.1074 198.281 72.6109 196.794 65.4774 194.475C64.2234 194.068 62.9144 193.875 61.5999 193.875C27.4669 193.875 -0.181588 221.678 -8.80492e-05 255.904C0.076912 270.367 11.9514 282 26.3999 282H149.6C164.048 282 175.923 270.367 176 255.904C176.181 221.678 148.533 193.875 114.4 193.875ZM87.9999 176.25C117.161 176.25 140.8 152.577 140.8 123.375C140.8 94.1726 117.161 70.5 87.9999 70.5C58.8389 70.5 35.1999 94.1726 35.1999 123.375C35.1999 152.577 58.8389 176.25 87.9999 176.25ZM325.6 0H114.4C99.8414 0 87.9999 12.2549 87.9999 27.3132V52.875C100.881 52.875 112.805 56.6093 123.2 62.6789V35.25H316.8V193.875H281.6V158.625H211.2V193.875H169.268C179.773 203.068 187.484 215.207 191.097 229.125H325.6C340.158 229.125 352 216.87 352 201.812V27.3132C352 12.2549 340.158 0 325.6 0Z" fill="#FAFAFA"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_961_2">
                                                <rect width="352" height="282" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>


                                </div>
                            </div>
                            <div className="flex-1 text-right ">
                                <h2 className="font-normal text-sm uppercase text-gray-600">Mentor</h2>
                                <p className="font-normal text-xl">{tentors.length}<span className="text-blue-500"><i
                                    className="fas fa-exchange-alt"></i></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div
                        className="bg-gradient-to-b from-yellow-200 w-full to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-3">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full px-4 py-4 bg-yellow-600">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.0002 16.9999C21.7169 16.9999 21.4795 16.9039 21.2882 16.7119C21.0962 16.5206 21.0002 16.2832 21.0002 15.9999V10.0999L12.9752 14.4749C12.8252 14.5582 12.6709 14.6206 12.5122 14.6619C12.3542 14.7039 12.1835 14.7249 12.0002 14.7249C11.8169 14.7249 11.6462 14.7039 11.4882 14.6619C11.3295 14.6206 11.1752 14.5582 11.0252 14.4749L2.6002 9.8749C2.43353 9.79157 2.30453 9.67057 2.2132 9.5119C2.1212 9.3539 2.0752 9.18324 2.0752 8.9999C2.0752 8.81657 2.1212 8.6459 2.2132 8.4879C2.30453 8.32924 2.43353 8.20824 2.6002 8.1249L11.0502 3.5249C11.2002 3.44157 11.3542 3.3789 11.5122 3.3369C11.6709 3.29557 11.8335 3.2749 12.0002 3.2749C12.1669 3.2749 12.3295 3.29557 12.4882 3.3369C12.6462 3.3789 12.8002 3.44157 12.9502 3.5249L22.4752 8.7249C22.6419 8.80824 22.7712 8.9289 22.8632 9.0869C22.9545 9.24557 23.0002 9.41657 23.0002 9.5999V15.9999C23.0002 16.2832 22.9042 16.5206 22.7122 16.7119C22.5209 16.9039 22.2835 16.9999 22.0002 16.9999ZM12.0002 20.7249C11.8335 20.7249 11.6709 20.7042 11.5122 20.6629C11.3542 20.6209 11.2002 20.5582 11.0502 20.4749L6.0502 17.7749C5.71686 17.5916 5.45853 17.3459 5.2752 17.0379C5.09186 16.7292 5.0002 16.3832 5.0002 15.9999V12.1999L10.6752 15.2749C10.8919 15.3916 11.1085 15.4956 11.3252 15.5869C11.5419 15.6789 11.7669 15.7249 12.0002 15.7249C12.2335 15.7249 12.4629 15.6749 12.6882 15.5749C12.9129 15.4749 13.1335 15.3666 13.3502 15.2499L19.0002 12.1999V15.9999C19.0002 16.3832 18.9085 16.7292 18.7252 17.0379C18.5419 17.3459 18.2835 17.5916 17.9502 17.7749L12.9502 20.4749C12.8002 20.5582 12.6462 20.6209 12.4882 20.6629C12.3295 20.7042 12.1669 20.7249 12.0002 20.7249Z" fill="#FAFAFA"/>
                                    </svg>


                                </div>
                            </div>
                            <div className="flex-1 text-right">
                                <h2 className="font-normal text-sm uppercase text-gray-600">GAJI Mentor</h2>
                                <p className="font-normal text-xl">500,000 <span className="text-pink-500"><i
                                    className="fas fa-exchange-alt"></i></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </SidebarNew>
    )
}
