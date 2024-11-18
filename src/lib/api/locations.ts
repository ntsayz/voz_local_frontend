import apiRequest from './index';

// User API
export const getLocations = async () => {
  return apiRequest('/locations/locations_file', 'GET');
};
