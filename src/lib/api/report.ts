import apiRequest from './index';

// Reporting API
export const createReport = async (data: Record<string, any>, token: string) => {
  return apiRequest('/report', 'POST', data, token);
};

export const getReports = async (token: string) => {
  return apiRequest('/report', 'GET', null, token);
};

export async function getReportsPerProvince(): Promise<{ [key: string]: number }> {
  // Replace the URL with your actual API endpoint
  return {
    'MZL': 0,
    'MZP': 1,
    'MZA': 3,
    'MZT': 7,
    'MZB': 2,
    'MZG': 9,
    'MZQ': 4,
    'MZMPM': 1,
    'MZI': 6,
    'MZS': 8,
    'MZN': 10
  };
};
