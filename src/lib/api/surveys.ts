// src/lib/api/surveys.ts
import { mockSurveys } from '$lib/data/mock/surveys';
import apiRequest from './index';

// Function to fetch all surveys
export const getSurveys = async (): Promise<typeof mockSurveys> => {
  // Replace with API call later
  return mockSurveys;
};

// Function to fetch a single survey by ID
export const getSurveyById = async (id: string) => {
  // Replace with API call later
  const survey = mockSurveys.find((s) => s.id === id);
  if (!survey) {
    throw new Error('Survey not found');
  }
  return survey;
};

// Function to create a new survey
export const createSurvey = async (data: Record<string, any>, token: string) => {
  // Replace with API call later
  console.log('Creating survey (mock):', data);
  return {
    id: Date.now().toString(), // Mock ID generation
    ...data,
    status: 'active', // Default status
  };
};

// Function to delete a survey
export const deleteSurvey = async (id: string, token: string) => {
  // Replace with API call later
  console.log(`Deleting survey with ID ${id} (mock)`);
  return { success: true };
};