import React, { useState, useEffect } from 'react';
import { getViewRp } from '../Service';
import Navbar from '../components/nav/Nav';
import { useLocation } from 'react-router-dom';
import { FaMoneyBill, FaChartBar, FaListUl, FaCheckCircle } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ViewReport = () => {
    const [reportData, setReportData] = useState([]);
    const location = useLocation();
    const { selectedYear } = location.state || { selectedYear: 2024 };
    const [sumPlanBG, setSumPlanBG] = useState(0);
    const [sumBG, setSumBG] = useState(0);
    const [sumStill, setSumStill] = useState(0);

    const fetchReportData = async () => {
        try {
            const reportData = await getViewRp(selectedYear); // Call the service function
            setReportData(reportData); // Set the data to state

            const totalPlanBG = reportData.reduce((total, row) => total + parseInt(row.PlanBG || 0, 10), 0);
            setSumPlanBG(totalPlanBG); 
            const totalBG = reportData.reduce((total, row) => total + parseInt(row.TotalBG || 0, 10), 0);
            setSumBG(totalBG); 
            const totalStill = reportData.reduce((total, row) => total + parseInt(row.Still || 0, 10), 0);
            setSumStill(totalStill); 

        } catch (error) {
            console.error('Error fetching report data:', error); // Handle the error if any
        }
    };

    useEffect(() => {
        fetchReportData(); // Fetch data when component mounts or when selectedYear changes
    }, [selectedYear]);

    // Export to Excel function using exceljs
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`Report_${selectedYear}`);

        // Add header row
        worksheet.columns = [
            { header: 'No', key: 'no', width: 10 },
            { header: 'BigGroup Name', key: 'BigGroup_Name', width: 30 },
            { header: 'PlanBG', key: 'PlanBG', width: 15 },
            { header: 'TotalBG', key: 'TotalBG', width: 15 },
            { header: 'Still', key: 'Still', width: 15 },
            { header: 'DepPer', key: 'DepPer', width: 15 }
        ];

        // Add rows
        reportData.forEach((row, index) => {
            worksheet.addRow({
                no: index + 1,
                BigGroup_Name: row.BigGroup_Name,
                PlanBG: parseInt(row.PlanBG).toLocaleString(),
                TotalBG: parseInt(row.TotalBG).toLocaleString(),
                Still: parseInt(row.Still).toLocaleString(),
                DepPer: row.DepPer
            });
        });

        // Create the Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        
        // Save the Excel file
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Report_${selectedYear}.xlsx`);
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
                            <p className="text-red-700 text-2xl font-semibold">{((sumStill * 100) / sumPlanBG).toFixed(2)} %</p>
                        </div>
                    </div>
                </div>

                {/* Export to Excel Button */}
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
                                        <td className="p-4 border-b">{index + 1}</td>
                                        <td className="p-4 border-b">{row.BigGroup_Name}</td>
                                        <td className="p-4 border-b">{parseInt(row.PlanBG).toLocaleString()}</td>
                                        <td className="p-4 border-b">{parseInt(row.TotalBG).toLocaleString()}</td>
                                        <td className="p-4 border-b">{parseInt(row.Still).toLocaleString()}</td>
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

export default ViewReport;
