import apiRequest from './index';

// Reporting API
export const createReport = async (data: Record<string, any>, token: string) => {
  return apiRequest('/report', 'POST', data, token);
};

export const getReports = async (token: string) => {
  return apiRequest('/report', 'GET', null, token);
};

export async function getReportsPerProvince(): Promise<{ [key: string]: { count: number; details: string[] } }> {
  return {
      MZL: { count: 0, details: ["No reports in this region."] },
      MZP: { count: 1, details: ["Report 1: Infrastructure issue."] },
      MZA: { count: 3, details: ["Report 1: Security issue.", "Report 2: Water scarcity.", "Report 3: Power outage."] },
      MZT: { count: 7, details: ["Report 1: Education concern.", "Report 2: Healthcare issue.", "Report 3: Deforestation."] },
      MZB: { count: 2, details: ["Report 1: Flooding.", "Report 2: Road repair needed."] },
      MZG: { count: 9, details: ["Various environmental and infrastructure issues."] },
      MZQ: { count: 4, details: ["Report 1: Housing concern.", "Report 2: Employment issues."] },
      MZMPM: { count: 1, details: ["Report 1: Urban safety issue."] },
      MZI: { count: 6, details: ["Report 1: Economic challenge.", "Report 2: Transport inefficiencies."] },
      MZS: { count: 8, details: ["Report 1: Food supply concern.", "Report 2: Resource allocation."] },
      MZN: { count: 10, details: ["Numerous minor reports."] }
  };
}

