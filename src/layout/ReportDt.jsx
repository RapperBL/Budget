import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav/Nav';
import { useNavigate } from 'react-router-dom';
import { getViewInventoryRp, getViewInvestmentRp, getViewRp, getViewSparepartRp, ComboboxYear } from '../Service';

const DirectorReport = () => {
  const navigateDRT = useNavigate();

  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem('selectedYear') ? parseInt(localStorage.getItem('selectedYear'), 10) : 2024;
  });
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const [sumPlanBG, setSumPlanBG] = useState(0);
  const [sumPlanBG1, setSumPlanBG1] = useState(0);
  const [sumPlanBG2, setSumPlanBG2] = useState(0);
  const [sumPlanBG3, setSumPlanBG3] = useState(0);
  const [sumBG, setSumBG] = useState(0);
  const [sumBG1, setSumBG1] = useState(0);
  const [sumBG2, setSumBG2] = useState(0);
  const [sumBG3, setSumBG3] = useState(0);

  // Fetch years from the API
  const fetchYears = async () => {
    try {
      const fetchedYears = await ComboboxYear();
      setYears(fetchedYears);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  // Fetch report data
  const fetchReportData = async () => {
    try {
      const reportData = await getViewRp(selectedYear);
      setData(reportData);
      const totalPlanBG = reportData.reduce((total, row) => total + parseInt(row.PlanBG || 0, 10), 0);
      const totalBG = reportData.reduce((total, row) => total + (row.TotalBG || 0), 0);
      setSumPlanBG(totalPlanBG);
      setSumBG(totalBG);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchReportData1 = async () => {
    try {
      const reportData = await getViewSparepartRp(selectedYear);
      setData(reportData);
      const totalPlanBG1 = reportData.reduce((total, row) => total + parseInt(row.DepPlan || 0, 10), 0);
      const totalBG1 = reportData.reduce((total, row) => total + (row.DepBG || 0), 0);
      setSumPlanBG1(totalPlanBG1);
      setSumBG1(totalBG1);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchReportData2 = async () => {
    try {
      const reportData = await getViewInventoryRp(selectedYear);
      setData(reportData);
      const totalPlanBG2 = reportData.reduce((total, row) => total + parseInt(row.DepPlan || 0, 10), 0);
      const totalBG2 = reportData.reduce((total, row) => total + (row.DepBG || 0), 0);
      setSumPlanBG2(totalPlanBG2);
      setSumBG2(totalBG2);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchReportData3 = async () => {
    try {
      const reportData = await getViewInvestmentRp(selectedYear);
      setData(reportData);
      const totalPlanBG3 = reportData.reduce((total, row) => total + parseInt(row.DepPlan || 0, 10), 0);
      const totalBG3 = reportData.reduce((total, row) => total + (row.DepBG || 0), 0);
      setSumPlanBG3(totalPlanBG3);
      setSumBG3(totalBG3);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  // Fetch years when component mounts
  useEffect(() => {
    fetchYears();
  }, []);

  // Fetch report data whenever selectedYear changes
  useEffect(() => {
    localStorage.setItem('selectedYear', selectedYear);
    fetchReportData();
    fetchReportData1();
    fetchReportData2();
    fetchReportData3();
  }, [selectedYear]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full bg-orange-500 py-6 shadow-md mt-16">
          <h1 className="text-4xl font-bold text-center text-white">Director Report</h1>
        </div>

        {/* Navigation Section */}
        <div className="text-3xl mt-6 flex justify-center items-center">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            {years.length > 0 ? (
              years.map((year) => (
                <option key={year.Year_id} value={parseInt(year.Year_Name.trim())}>
                  {year.Year_Name.trim()}
                </option>
              ))
            ) : (
              <option disabled>Loading years...</option>
            )}
          </select>
        </div>

        {/* Data Boxes Section */}
        <div className="bg mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-10/12">
          {/* First Box */}
          <div className="bg-blue-100 text-2xl p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-5xl font-bold text-gray-700 mb-4">ງົບປະມານທົ່ວໄປ</h2>
            <p className="text-gray-600">ແຜນການ: <span className="font-bold">{sumPlanBG.toLocaleString()} LAK</span></p>
            <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">{sumBG.toLocaleString()} LAK</span></p>
            <button onClick={() => navigateDRT('/ReportDt/ViewRp', { state: { selectedYear } })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
              ຜົນການດຳເນີນ
            </button>
          </div>

          {/* Second Box */}
          <div className="bg-blue-100 text-2xl p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-5xl font-bold text-gray-700 mb-4">ງົບປະມານສະແດງແຜນການ (OPEX)</h2>
            <p className="text-gray-600">ແຜນການ: <span className="font-bold">{sumPlanBG1.toLocaleString()} LAK</span></p>
            <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">{sumBG1.toLocaleString()} LAK</span></p>
            <button onClick={() => navigateDRT('/ReportDt/ViewSpareRp', { state: { selectedYear } })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
              ຜົນການດຳເນີນ
            </button>
          </div>

          {/* Third Box */}
          <div className="bg-green-100 text-2xl p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-5xl font-bold text-gray-700 mb-4">ງົບປະມານສິນທອນໃສງານ</h2>
            <p className="text-gray-600">ແຜນການ: <span className="font-bold">{sumPlanBG2.toLocaleString()} LAK</span></p>
            <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">{sumBG2.toLocaleString()} LAK</span></p>
            <button onClick={() => navigateDRT('/ReportDt/ViewInventoryRp', { state: { selectedYear } })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
              ຜົນການດຳເນີນ
            </button>
          </div>

          {/* Fourth Box */}
          <div className="bg-green-100 text-2xl p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-5xl font-bold text-gray-700 mb-4">ໂຄງການລົງທຶນ (CAPEX)</h2>
            <p className="text-gray-600">ແຜນການ: <span className="font-bold">{sumPlanBG3.toLocaleString()} LAK</span></p>
            <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">{sumBG3.toLocaleString()} LAK</span></p>
            <button onClick={() => navigateDRT('/ReportDt/ViewInvestmentRp', { state: { selectedYear } })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
              ຜົນການດຳເນີນ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectorReport;
