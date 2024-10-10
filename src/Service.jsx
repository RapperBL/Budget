import axios from 'axios';

const BASE_URL = 'http://172.16.13.14:4000/api';

export const loginApi = async (item) => {
  const response = await axios.post(`${BASE_URL}/Login`, item);
  return response.data;
};
export const DisplayUser = async () => {
  const response = await axios.get(`${BASE_URL}/DisplayUser`);
  return response.data;
};
export const getViewRp = async (selectedYear) => {
  const response = await axios.get(`${BASE_URL}/GeneralReport`, {
    params: {
      selectedYear: selectedYear,
    },
  });
  return response.data;
};
export const getViewSparepartRp = async (selectedYear) => {
  const response = await axios.get(`${BASE_URL}/SparepartReport`, {
    params: {
      selectedYear: selectedYear,
    },
  });
  return response.data;
};
export const getViewInventoryRp = async (selectedYear) => {
  const response = await axios.get(`${BASE_URL}/InventoryReport`, {
    params: {
      selectedYear: selectedYear,
    },
  });
  return response.data;
};
export const getViewInvestmentRp = async (selectedYear) => {
  const response = await axios.get(`${BASE_URL}/InvestmentReport`, {
    params: {
      selectedYear: selectedYear,
    },
  });
  return response.data;
};
export const updateUserProfile = async (Login_No, newUsername, newFullName) => {
  if (!Login_No) {
    throw new Error('Login_No is not defined');
  }

  const response = await axios.patch(`${BASE_URL}/UpdateProfile/${Login_No}`, {
    Login_User: newUsername,
    LoginFullName: newFullName
  });

  return response.data; // Return response data if needed
};
export const changeUserPassword = async (Login_No, oldPassword, newPassword, confirmPassword) => {
  if (!Login_No) {
    throw new Error('Login_No is not defined');
  }

  const response = await axios.patch(`${BASE_URL}/ChangePassword/${Login_No}`, {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword
  });

  return response.data; // Return the response if needed
};
export const ComboboxYear = async () => {
  const response = await axios.get(`${BASE_URL}/ComboboxYear`);
  return response.data;
};

export const fetchDepartments = async (reportType) => {
  const response = await axios.get(`${BASE_URL}/ComboboxDepartment?selectedGroup=${reportType}`);
  return response.data;
};

// Fetch year data
export const fetchYears = async () => {
  const response = await axios.get(`${BASE_URL}/ComboboxYearDepartment`);
  return response.data;
};

// Fetch BigGroup (unit) data
export const fetchBigGroups = async () => {
  const response = await axios.get(`${BASE_URL}/ComboboxBigGroup`);
  return response.data;
};

// Fetch report data based on filters
export const fetchReportData = async (reportType, year, unit, category) => {
  const response = await axios.get(
    `${BASE_URL}/ReportDepartment?SelectedGroup=${reportType}&Year=${year}&BigGroup=${unit}&divisionNames=${category}`
  );
  return response.data.result;
};
export const fetchReportDataAll = async (reportType, year, category) => {
  const response = await axios.get(
    `${BASE_URL}/ReportDepartmentAll?SelectedGroup=${reportType}&Year=${year}&divisionNames=${category}`
  );
  return response.data.result;
};