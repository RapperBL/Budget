import React from 'react';
import Navbar from '../components/nav/Nav';

const BudgetReport = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-10">

        {/* Filters Section */}
        <div className="bg-gray-100 p-10 rounded-lg shadow-lg mb-12">
          <h1 className="text-6xl font-bold text-center text-gray-800 mb-12">Budget Report</h1>
          <h2 className="text-4xl font-semibold text-gray-700 mb-6">ລາຍງານງົບປະມານ</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <label className="block text-gray-600 text-3xl mb-6">ເລືອກລາຍງານ</label>
              <select className="text-xl w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                <option>ລາຍງານບັດ</option>
                <option>ລາຍງານຂອງອື່ນໆ</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-3xl mb-6">ເລືອກປະເພດ</label>
              <select className="text-xl w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                <option>ປະເພດ A</option>
                <option>ປະເພດ B</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-3xl mb-6">ເລືອກປີ</label>
              <select className="text-xl w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-3xl mb-6">ເລືອກຫົວໜ່ວຍ</label>
              <select className="text-xl w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500">
                <option>ຫົວໜ່ວຍ A</option>
                <option>ຫົວໜ່ວຍ B</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex space-x-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
              ສະແດງລາຍງານ
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300">
              ຄົ້ນຫາ
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-green-100 p-10 rounded-lg shadow-lg mb-12">
          <p className="text-gray-700 text-2xl text-center">
            ງົບປະມານປີ 2022, ພະແນກວາງແຜນປະຕິບັດ: <strong>48,313,364,180 LAK</strong>, ຍອດເງິນໃຊ້ວຽກ: <strong>7,126,723,274 LAK</strong>.
          </p>
        </div>

        {/* Table Section */}
        <div className="mb-12">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 mb-6 rounded-lg shadow-lg transition duration-300">
            Export
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-5 px-6 text-left text-lg">ລໍາດັບ</th>
                  <th className="py-5 px-6 text-left text-lg">ທຸມລາຍການລາຍຈ່າຍ</th>
                  <th className="py-5 px-6 text-left text-lg">ເລກລາຍການ</th>
                  <th className="py-5 px-6 text-left text-lg">Desc</th>
                  <th className="py-5 px-6 text-left text-lg">ປີ</th>
                  <th className="py-5 px-6 text-left text-lg">ແຜນການ</th>
                  <th className="py-5 px-6 text-left text-lg">ວິທີດໍາເນີນ</th>
                  <th className="py-5 px-6 text-left text-lg">ການກວດເສັດ %</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Rows */}
                <tr className="border-b">
                  <td className="py-4 px-6 text-left">1</td>
                  <td className="py-4 px-6 text-left">ທຸມລາຍການ</td>
                  <td className="py-4 px-6 text-left">6070.201</td>
                  <td className="py-4 px-6 text-left">ອຸປະກອນ SIM GSM</td>
                  <td className="py-4 px-6 text-left">2022</td>
                  <td className="py-4 px-6 text-left text-green-600 font-bold">51,981,302</td>
                  <td className="py-4 px-6 text-left">0</td>
                  <td className="py-4 px-6 text-left text-green-600 font-bold">100%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 text-left">2</td>
                  <td className="py-4 px-6 text-left">ລາຍການ 2</td>
                  <td className="py-4 px-6 text-left">6130.101</td>
                  <td className="py-4 px-6 text-left">ປະກອນ VOIP</td>
                  <td className="py-4 px-6 text-left">2022</td>
                  <td className="py-4 px-6 text-left text-green-600 font-bold">33,991,241,884</td>
                  <td className="py-4 px-6 text-left">2,719,053,534</td>
                  <td className="py-4 px-6 text-left text-green-600 font-bold">92%</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetReport;
