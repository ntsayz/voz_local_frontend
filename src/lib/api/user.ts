import apiRequest from './index';

// User API
export const getUser = async (token: string) => {
  return apiRequest('/user/me', 'GET', null, token);
};
