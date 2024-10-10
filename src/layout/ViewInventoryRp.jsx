import React, { useState, useEffect } from 'react';
import { getViewInventoryRp } from '../Service';
import Navbar from '../components/nav/Nav';
import { useLocation } from 'react-router-dom';
import { FaMoneyBill, FaChartBar, FaListUl, FaCheckCircle } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ViewInventoryReport = () => {
    const [reportData, setReportData] = useState([]);
    const location = useLocation();
    const { selectedYear } = location.state || { selectedYear: 2024 };
    const [sumPlanBG, setSumPlanBG] = useState(0);
    const [sumBG, setSumBG] = useState(0);
    const [sumStill, setSumStill] = useState(0);

    const fetchReportData = async () => {
        try {
            const reportData = await getViewInventoryRp(selectedYear); // Call the service function
            setReportData(reportData); // Set the data to state

            const totalPlanBG = reportData.reduce((total, row) => total + parseInt(row.DepPlan || 0, 10), 0);
            setSumPlanBG(totalPlanBG); 
            const totalBG = reportData.reduce((total, row) => total + parseInt(row.DepBG || 0, 10), 0);
            setSumBG(totalBG); 
            const totalStill = reportData.reduce((total, row) => total + parseInt(row.DepStill || 0, 10), 0);
            setSumStill(totalStill); 


        } catch (error) {
            console.error('Error fetching report data:', error); // Handle the error if any
        }
    };

    useEffect(() => {
        fetchReportData(); // Fetch data when component mounts or when selectedYear changes
    }, [selectedYear]);

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report');

        // Adding the header
        worksheet.columns = [
            { header: 'No', key: 'No', width: 10 },
            { header: 'BigGroup Name', key: 'BigGroup_Name', width: 30 },
            { header: 'PlanBG', key: 'DepPlan', width: 15 },
            { header: 'TotalBG', key: 'DepBG', width: 15 },
            { header: 'Still', key: 'DepStill', width: 15 },
            { header: 'DepPer', key: 'DepPer', width: 15 }
        ];

        // Adding the data
        reportData.forEach((row, index) => {
            worksheet.addRow({
                No: index + 1,
                BigGroup_Name: row.BigGroup_Name,
                DepPlan: parseInt(row.DepPlan).toLocaleString(),
                DepBG: parseInt(row.DepBG).toLocaleString(),
                DepStill: parseInt(row.DepStill).toLocaleString(),
                DepPer: row.DepPer
            });
        });

        // Generating the file and saving it
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `Report_${selectedYear}.xlsx`);
        });
    };


    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center mt-16">Report for Year {selectedYear}</h1>

                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* First Box */}
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center justify-between w-full">
                        {/* Icon Section */}
                        <div className="text-blue-700 flex items-center">
                            <FaMoneyBill size={70} />
                        </div>
                        {/* Text Section */}
                        <div className="text-right">
                            <h2 className="text-blue-700 text-4xl font-bold mb-4">ແຜນການ</h2>
                            <p className="text-blue-700 text-2xl font-semibold">{sumPlanBG.toLocaleString()} LAK</p>
                        </div>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg shadow-lg flex items-center justify-between w-full">
                        {/* Icon Section */}
                        <div className="text-red-700 flex items-center">
                            <FaChartBar size={70} />
                        </div>
                        {/* Text Section */}
                        <div className="text-right">
                            <h2 className="text-red-700 text-4xl font-bold mb-4">ຍັງເຫຼືອ</h2>
                            <p className="text-red-700 text-2xl font-semibold">{sumStill.toLocaleString()} LAK</p>
                        </div>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center justify-between w-full">
                        {/* Icon Section */}
                        <div className="text-blue-700 flex items-center">
                            <FaListUl size={70} />
                        </div>
                        {/* Text Section */}
                        <div className="text-right">
                            <h2 className="text-blue-700 text-4xl font-bold mb-4">ນຳໃຊ້</h2>
                            <p className="text-blue-700 text-2xl font-semibold">{sumBG.toLocaleString()} LAK</p>
                        </div>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg shadow-lg flex items-center justify-between w-full">
                        {/* Icon Section */}
                        <div className="text-red-700 flex items-center">
                            <FaCheckCircle size={70} />
                        </div>
                        {/* Text Section */}
                        <div className="text-right">
                            <h2 className="text-red-700 text-4xl font-bold mb-4">ເປີເຊັນ</h2>
                            <p className="text-red-700 text-2xl font-semibold">{((sumStill *100)/sumPlanBG).toFixed(2)} %</p>
                        </div>
                    </div>
                </div>

                <div className="text-right mb-6">
                    <button
                        onClick={exportToExcel}
                        className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
                    >
                        Export to Excel
                    </button>
                </div>

                {/* Display Report Data */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-2xl rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="text-left p-4">No</th>
                                <th className="text-left p-4">BigGroup Name</th>
                                <th className="text-left p-4">PlanBG</th>
                                <th className="text-left p-4">TotalBG</th>
                                <th className="text-left p-4">Still</th>
                                <th className="text-left p-4">DepPer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                reportData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-4 border-b">{row.No}</td>
                                        <td className="p-4 border-b">{row.BigGroup_Name}</td>
                                        <td className="p-4 border-b">{parseInt(row.DepPlan).toLocaleString()}</td>
                                        <td className="p-4 border-b">{parseInt(row.DepBG).toLocaleString()}</td>
                                        <td className="p-4 border-b">{parseInt(row.DepStill).toLocaleString()}</td>
                                        <td className="p-4 border-b">{row.DepPer}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ViewInventoryReport;
