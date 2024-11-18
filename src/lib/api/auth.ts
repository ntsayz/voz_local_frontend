import apiRequest from './index';

// Authentication API
export const login = async (username: string, password: string) => {
  return apiRequest('/auth/login', 'POST', { username, password });
};

export const register = async (username: string, password: string, role: string) => {
  return apiRequest('/auth/register', 'POST', { username, password, role });
};
