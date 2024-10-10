import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Login from './layout/Login';
import BudgetReport from './layout/BudgetRp';
import BudgetManagement from './layout/BudgetManage';
import Setting from './layout/Setting';
import PrivateRoute from './layout/PrivateRoute';
import DirectorReport from './layout/ReportDt';
import ViewReport from './layout/ViewRp';
import ViewSpareReport from './layout/ViewSpareRp';
import ViewInventoryReport from './layout/ViewInventoryRp';
import ViewInvestmentReport from './layout/ViewInvestmentRp';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Home" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/BudgetReport" element={<PrivateRoute element={BudgetReport} />} />
        <Route path="/ReportDt" element={<PrivateRoute element={DirectorReport} />} />
        <Route path="/ReportDt/ViewRp" element={<PrivateRoute element={ViewReport} />} />
        <Route path="/ReportDt/ViewSpareRp" element={<PrivateRoute element={ViewSpareReport} />} />
        <Route path="/ReportDt/ViewInventoryRp" element={<PrivateRoute element={ViewInventoryReport} />} />
        <Route path="/ReportDt/ViewInvestmentRp" element={<PrivateRoute element={ViewInvestmentReport} />} />
        <Route path="/BudgetManagement" element={<PrivateRoute element={BudgetManagement} />} />
        <Route path="/Setting" element={<PrivateRoute element={Setting} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
