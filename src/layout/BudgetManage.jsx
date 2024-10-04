import React, { useState, useEffect } from 'react';
import { DisplayUser } from '../Service';
import Navbar from '../components/nav/Nav';

const BudgetManagement = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [checkNameOptions, setCheckNameOptions] = useState([]);
    const [checkNameOptions1, setCheckNameOptions1] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchData = async () => {
            const allUser = await DisplayUser();
            setBudgetData(allUser);

            // Extract unique Check_Name values
            const uniqueCheckNames = [...new Set(allUser.map(item => item.Check_Name))];
            setCheckNameOptions(uniqueCheckNames);
            const uniqueCheckNames1 = [...new Set(allUser.map(item => item.Division_Name))];
            setCheckNameOptions1(uniqueCheckNames1);
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-10">
                {/* Filters Section */}
                <div className="bg-gray-100 p-10 rounded-lg shadow-lg mb-8">
                    <h1 className="text-6xl font-bold text-center text-gray-800 mb-12">Budget Management</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-gray-600 text-3xl mb-6">ເລືອກສາຂາ:</label>
                            <select className="w-full text-xl border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                                {checkNameOptions.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600 text-3xl mb-6">ເລືອກພະແນກວາງແຜນ:</label>
                            <select className="w-full text-xl border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                                {checkNameOptions1.sort((a, b) => a.localeCompare(b)).map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-8 flex space-x-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
                            Show Data
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start space-x-6 mb-6">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
                        + Add
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
                        Delete
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
                        Refresh
                    </button>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-5 px-6 text-left text-xl">ເລກລະຫັດ</th>
                                <th className="py-5 px-6 text-left text-xl">ຊື່ຜູ້ໃຊ້</th>
                                <th className="py-5 px-6 text-left text-xl">ສະຖານະ</th>
                                <th className="py-5 px-6 text-left text-xl">ຊື່ເຕັມ</th>
                                <th className="py-5 px-6 text-left text-xl">ເບີໂທລະສັບ</th>
                                <th className="py-5 px-6 text-left text-xl">ພະແນກ</th>
                                <th className="py-5 px-6 text-left text-xl">ສູນ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapping over the fetched data */}
                            {budgetData.map((item, index) => (
                                <tr className="border-b" key={index}>
                                    <td className="py-4 px-6 text-left">{item.Login_No}</td>
                                    <td className="py-4 px-6 text-left">{item.Login_User}</td>
                                    <td className="py-4 px-6 text-left">{item.LoginStatus}</td>
                                    <td className="py-4 px-6 text-left">{item.LoginFullName}</td>
                                    <td className="py-4 px-6 text-left">{item.LoginPhone}</td>
                                    <td className="py-4 px-6 text-left">{item.Division_Name}</td>
                                    <td className="py-4 px-6 text-left">{item.Check_Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BudgetManagement;
