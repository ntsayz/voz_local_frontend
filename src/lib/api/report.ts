import apiRequest from './index';

// Reporting API
export const createReport = async (data: Record<string, any>, token: string) => {
  return apiRequest('/report', 'POST', data, token);
};

export const getReports = async (token: string) => {
  return apiRequest('/report', 'GET', null, token);
};
