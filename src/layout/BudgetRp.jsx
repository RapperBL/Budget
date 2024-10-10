import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../components/nav/Nav';

const BudgetReport = () => {
  const [filters, setFilters] = useState({
    reportType: '1', // Default to 'ສູນໃຫຍ່ນະຄອນຫຼວງ'
    category: '88', // Default divisionNames
    year: '2024', // Default to 2024
    unit: '9' // Default BigGroup
  });
  const [departments, setDepartments] = useState([]); // To store fetched department options
  const [years, setYears] = useState([]); // To store fetched year options
  const [bigGroups, setBigGroups] = useState([]); // To store BigGroup options (unit)
  const [reportData, setReportData] = useState([]); // To store report data

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => ({ ...prevState, [name]: value }));
  };

  // Fetch departments when reportType (selectedGroup) changes
  useEffect(() => {
    if (filters.reportType) {
      axios
        .get(`http://172.16.13.30:4000/api/ComboboxDepartment?selectedGroup=${filters.reportType}`)
        .then((response) => {
          setDepartments(response.data);
          // Set default category to "ພະແນກການເງິນ" if available
          const defaultDepartment = response.data.find(dept => dept.Division_Name === "ພະແນກການເງິນ");
          if (defaultDepartment) {
            setFilters(prevState => ({ ...prevState, category: defaultDepartment.Division_No }));
          }
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to fetch department data', 'error');
        });
    } else {
      setDepartments([]); // Clear departments if no reportType is selected
    }
  }, [filters.reportType]);

  // Fetch year data when component mounts
  useEffect(() => {
    axios
      .get('http://172.16.13.30:4000/api/ComboboxYearDepartment')
      .then((response) => {
        setYears(response.data); // Set the year options
      })
      .catch((error) => {
        Swal.fire('Error', 'Failed to fetch year data', 'error');
      });
  }, []);

  // Fetch BigGroup (unit) data when component mounts
  useEffect(() => {
    axios
      .get('http://172.16.13.30:4000/api/ComboboxBigGroup')
      .then((response) => {
        setBigGroups(response.data); // Set the BigGroup options
      })
      .catch((error) => {
        Swal.fire('Error', 'Failed to fetch BigGroup data', 'error');
      });
  }, []);

  // Function to fetch report data based on filters
  const fetchReportData = () => {
    const { reportType, year, unit, category } = filters;
    axios
      .get(`http://172.16.13.30:4000/api/ReportDepartment?SelectedGroup=${reportType}&Year=${year}&BigGroup=${unit}&divisionNames=${category}`)
      .then((response) => {
        setReportData(response.data.result); // Set the report data
      })
      .catch((error) => {
        Swal.fire('Error', 'Failed to fetch report data', 'error');
      });
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-center mt-16">
          <h1 className="text-4xl font-bold">Budget Report</h1>
        </div>

        <div className="bg-red-100 p-4 rounded-md mt-6">
          <h2 className="text-2xl mb-4">Filter Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">ເລືອກສາຂາ:</label>
              <select
                className="w-full p-2 border rounded-md"
                name="reportType"
                value={filters.reportType}
                onChange={handleFilterChange}
              >
                <option value="1">ສູນໃຫຍ່ນະຄອນຫຼວງ</option>
                <option value="2">ສາຂາແຂວງ</option>
                <option value="3">ຫ້ອງການ</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">ເລືອກພະແນກ:</label>
              <select
                className="w-full p-2 border rounded-md"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept.Division_No} value={dept.Division_No}>
                      {dept.Division_Name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No departments available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">ເລືອກປີ:</label>
              <select
                className="w-full p-2 border rounded-md"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                {years.length > 0 ? (
                  years.map((yearOption) => (
                    <option key={yearOption.Year_Name} value={yearOption.year}>
                      {yearOption.Year_Name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No years available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">ເລືອກໝວດ:</label>
              <select
                className="w-full p-2 border rounded-md"
                name="unit"
                value={filters.unit}
                onChange={handleFilterChange}
              >
                {bigGroups.length > 0 ? (
                  bigGroups.map((group) => (
                    <option key={group.BigGroup_No} value={group.BigGroup_No}>
                      {group.BigGroup_Name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No units available</option>
                )}
              </select>
            </div>
          </div>
          <div className="flex gap-5 mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">ສະແດງທັງໝົດ</button>
            <button className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={fetchReportData}>ຄົ້ນຫາ</button>
          </div>
        </div>

        {/* Display fetched report data */}
        {reportData.length > 0 && (
          <div className="bg-white p-4 rounded-md mt-6">
            <h2 className="text-2xl mb-4">Report Results</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">RS No</th>
                  <th className="py-2 px-4 border">Group Name</th>
                  <th className="py-2 px-4 border">Code Full</th>
                  <th className="py-2 px-4 border">Code Name</th>
                  <th className="py-2 px-4 border">Year</th>
                  <th className="py-2 px-4 border">Plan</th>
                  <th className="py-2 px-4 border">Total Result</th>
                  <th className="py-2 px-4 border">Amount Still</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row) => (
                  <tr key={row.RS_No}>
                    <td className="py-2 px-4 border">{row.RS_No}</td>
                    <td className="py-2 px-4 border">{row.Group_Name}</td>
                    <td className="py-2 px-4 border">{row.Code_Full}</td>
                    <td className="py-2 px-4 border">{row.Code_Name}</td>
                    <td className="py-2 px-4 border">{row.RS_Year}</td>
                    <td className="py-2 px-4 border">{row.RS_Plan.toLocaleString()}</td>
                    <td className="py-2 px-4 border">{row.TotalResultDetail.toLocaleString()}</td>
                    <td className="py-2 px-4 border">{row.AmountStill.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetReport;
