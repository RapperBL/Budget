import React, { useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/nav/Nav';

const Dashboard = () => {
    const navigateDRT = useNavigate();

    return (
        <>
            <Navbar />
            <div className='min-h-screen  flex flex-col items-center p-4 pt-20'>
                <div className="max-w-full w-full rounded-t-3xl px-6 py-2 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* First Row */}
                        <div onClick={() => navigateDRT('/ReportDt')} className='bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-between p-4 rounded-xl h-28 shadow-lg duration-300 cursor-pointer'>
                            <FaChartBar className='w-16 h-16 text-white' />
                            <div className="text-right text-white">
                                <div className="font-bold text-xl">Director</div>
                                <p className='font-semibold text-sm'>ລາຍງານອຳນວຍການ</p>
                            </div>
                        </div>

                        <div onClick={() => navigateDRT('/BudgetReport')} className='bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-between p-4 rounded-xl h-28 shadow-lg duration-300 cursor-pointer'>
                            <FaChartBar className='w-16 h-16 text-white' />
                            <div className="text-right text-white">
                                <div className="font-bold text-xl">Department</div>
                                <a href="#" className='font-semibold text-sm'>ລາຍງານພະແນກ</a>
                            </div>
                        </div>

                        <div onClick={() => navigateDRT('/BudgetManagement')} className='bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-between p-4 rounded-xl h-28 shadow-lg duration-300 cursor-pointer'>
                            <FaChartBar className='w-16 h-16 text-white' />
                            <div className="text-right text-white">
                                <div className="font-bold text-xl">User</div>
                                <p className='font-semibold text-sm'>ຈັດການຜູ້ໃຊ້</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 w-full rounded-b-3xl grid-cols-1 md:grid-cols-3 px-5">
                    {/* First Box */}
                    <div className="shadow-lg rounded-3xl bg-white w-full min-h-64 flex flex-col py-2 px-4">
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                    </div>

                    {/* Second Box */}
                    <div className="shadow-lg rounded-3xl bg-white w-full min-h-64 flex flex-col py-2 px-4">
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                    </div>

                    {/* Third Box with more content */}
                    <div className="shadow-lg rounded-3xl bg-white w-full min-h-64 flex flex-col py-2 px-4">
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                        <div className="bg-gray-400 rounded-lg mt-2 p-2 overflow-y-auto max-h-40 duration-300 hover:scale-105">
                            asdasd
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
