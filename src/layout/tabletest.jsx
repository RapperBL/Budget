import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportComponent = () => {
    const [selectedYear, setSelectedYear] = useState(2024); // Default value
    const [reportData, setReportData] = useState([]);

    const fetchReportData = async () => {
        try {
            const response = await axios.get('http://172.16.13.13:4000/api/ReportDirectorPro', {
                params: {
                    selectedYear: selectedYear // Send selectedYear as query parameter
                }
            });
            setReportData(response.data); // Set the data to state
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    useEffect(() => {
        fetchReportData(); // Fetch data when component mounts or when selectedYear changes
    }, [selectedYear]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Report for Year {selectedYear}</h1>

            {/* Dropdown to select a different year */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                    <option value={2021}>2021</option>
                </select>
            </div>

            {/* Display Report Data */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="text-left p-4">Test</th>
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
                                    <td className="p-4 border-b">{row.Test}</td>
                                    <td className="p-4 border-b">{row.BigGroup_Name}</td>
                                    <td className="p-4 border-b">{row.PlanBG}</td>
                                    <td className="p-4 border-b">{row.TotalBG}</td>
                                    <td className="p-4 border-b">{row.Still}</td>
                                    <td className="p-4 border-b">{row.DepPer}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportComponent;
