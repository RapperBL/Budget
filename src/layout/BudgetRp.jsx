import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/nav/Nav';
import { fetchDepartments, fetchYears, fetchBigGroups, fetchReportData as fetchReport, fetchReportDataAll as fetchAllReports } from '../Service';

const BudgetReport = () => {
  const [filters, setFilters] = useState({
    reportType: '1', 
    category: '88', 
    year: '2024', 
    unit: '9'
  });
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [bigGroups, setBigGroups] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (filters.reportType) {
      fetchDepartments(filters.reportType)
        .then((data) => {
          setDepartments(data);
          const defaultDepartment = data.find(dept => dept.Division_Name === 'ພະແນກການເງິນ' || dept.Division_Name === 'ແຂວງໄຊຍະບູລີ'|| dept.Division_Name === 'ຫົວໜ້າຝ່າຍ');
          if (defaultDepartment) {
            setFilters(prevState => ({
              ...prevState,
              category: defaultDepartment.Division_No,
            }));
          }
        })
        .catch(() => {
          Swal.fire('Error', 'Failed to fetch department data', 'error');
        });
    } else {
      setDepartments([]);
    }
  }, [filters.reportType]);

  useEffect(() => {
    fetchYears()
      .then((data) => {
        setYears(data);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch year data', 'error');
      });
  }, []);

  useEffect(() => {
    fetchBigGroups()
      .then((data) => {
        setBigGroups(data);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch BigGroup data', 'error');
      });
  }, []);

  // Fetch report data when the component mounts
  useEffect(() => {
    handleFetchReportDataAll();
  }, []);

  const handleFetchReportData = () => {
    const { reportType, year, unit, category } = filters;
    fetchReport(reportType, year, unit, category)
      .then((data) => {
        setReportData(data);
        setCurrentPage(1); // Reset to the first page
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch report data', 'error');
      });
  };

  const handleFetchReportDataAll = () => {
    const { reportType, year, category } = filters;
    fetchAllReports(reportType, year, category)
      .then((data) => {
        setReportData(data);
        setCurrentPage(1); // Reset to the first page
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch report data', 'error');
      });
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reportData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(reportData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleFetchReportDataAll}>ສະແດງທັງໝົດ</button>
            <button className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleFetchReportData}>ຄົ້ນຫາ</button>
          </div>
        </div>

        <div className=" bg-green-100 border border-green-300 text-gray-800 rounded-lg p-6 shadow-md mx-auto mt-5">
          <h3 className="text-2xl font-semibold mb-4">
            ປະຈໍາປີ: 2022, ແຜນງານການໃຊ້ຈ່າຍ
          </h3>
          <p className="text-lg">
            ວົງເງິນທີ່ຈັດສັນ: 48,313,364,180 LAK, ໃຊ້ໄປແລ້ວ: 7,126,723,274 LAK
          </p>
          <p className="text-lg">
            ຍອດທີ່ເຫຼືອ: 41,186,640,906 LAK, ອັດຕາການໃຊ້ງານ: 85.25%
          </p>
        </div>


        {/* Display fetched report data */}
        {reportData.length > 0 ? (
          <div className="bg-white p-4 rounded-md mt-6">
            <h2 className="text-2xl mb-4">Report Results</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Group Name</th>
                  <th className="py-2 px-4 border">Code Full</th>
                  <th className="py-2 px-4 border">Code Name</th>
                  <th className="py-2 px-4 border">Year</th>
                  <th className="py-2 px-4 border">Plan</th>
                  <th className="py-2 px-4 border">Total Result</th>
                  <th className="py-2 px-4 border">Amount Still</th>
                  <th className="py-2 px-4 border">Percent %</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{indexOfFirstRow + index + 1}</td>
                    <td className="py-2 px-4 border">{row.Group_Name}</td>
                    <td className="py-2 px-4 border">{row.Code_Full}</td>
                    <td className="py-2 px-4 border">{row.Code_Name}</td>
                    <td className="py-2 px-4 border">{row.RS_Year}</td>
                    <td className="py-2 px-4 border">{row.RS_Plan.toLocaleString()}</td>
                    <td className="py-2 px-4 border">{row.TotalResultDetail.toLocaleString()}</td>
                    <td className="py-2 px-4 border">{row.AmountStill.toLocaleString()}</td>
                    <td className="py-2 px-4 border">{row.Percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md mt-6">
            <h2 className="text-2xl mb-4">No Data Available</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetReport;
