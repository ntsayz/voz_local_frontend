// src/lib/api/index.ts
import { browser } from '$app/environment';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null,
  token: string | null = null
) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'Something went wrong',
    }));
    throw new Error(errorData.message || 'Unknown error occurred');
  }

  return response.json();
}

export default apiRequest;
