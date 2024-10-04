import React from 'react';
import Navbar from '../components/nav/Nav';

const DirectorReport = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-orange-500 py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-white">Director Report</h1>
      </div>

      {/* Navigation Section */}
      <div className="mt-6 flex justify-center items-center">
        <select className="ml-4 border border-gray-300 text-lg py-4 px-6 rounded shadow focus:outline-none focus:border-blue-500">
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          {/* Add more years here */}
        </select>
      </div>

      {/* Data Boxes Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-10/12">
        {/* First Box */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4">ງົບປະມານທົ່ວໄປ</h2>
          <p className="text-gray-600">ແຜນການ: <span className="font-bold">950,833,961,953 LAK</span></p>
          <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">326,802,441,572 LAK</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
            ຜົນການດຳເນີນ
          </button>
        </div>

        {/* Second Box */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4">ງົບປະມານສະແດງແຜນການ (OPEX)</h2>
          <p className="text-gray-600">ແຜນການ: <span className="font-bold">138,119,358,815 LAK</span></p>
          <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">97,982,235,481 LAK</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
            ຜົນການດຳເນີນ
          </button>
        </div>

        {/* Third Box */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4">ງົບປະມານສິນທອນໃສງານ</h2>
          <p className="text-gray-600">ແຜນການ: <span className="font-bold">24,738,987,545 LAK</span></p>
          <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">61,061,009,033 LAK</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
            ຜົນການດຳເນີນ
          </button>
        </div>

        {/* Fourth Box */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4">ໂຄງການລົງທຶນ (CAPEX)</h2>
          <p className="text-gray-600">ແຜນການ: <span className="font-bold">307,670,000,033 LAK</span></p>
          <p className="text-gray-600">ດຳເນີນ: <span className="font-bold">296,647,242,579 LAK</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded shadow transition duration-300">
            ຜົນການດຳເນີນ
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DirectorReport;
