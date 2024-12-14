// src/lib/i18n.ts
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

// Import translations for each namespace manually
import enCommon from '$lib/locales/en/common.json';
import enAuth from '$lib/locales/en/auth.json';
import enHome from '$lib/locales/en/home.json';
import enReports from '$lib/locales/en/reports.json';
import enSurveys from '$lib/locales/en/surveys.json';

import ptCommon from '$lib/locales/pt/common.json';
import ptAuth from '$lib/locales/pt/auth.json';
import ptHome from '$lib/locales/pt/home.json';
import ptReports from '$lib/locales/pt/reports.json';
import ptSurveys from '$lib/locales/pt/surveys.json';

// Combine namespaces for each locale
const en = {
  common: enCommon,
  auth: enAuth,
  home: enHome,
  reports: enReports,
  surveys: enSurveys
};

const pt = {
  common: ptCommon,
  auth: ptAuth,
  home: ptHome,
  reports: ptReports,
  surveys: ptSurveys
};

// Register locales with svelte-i18n
register('en', () => Promise.resolve(en));
register('pt', () => Promise.resolve(pt));

// Set a default locale synchronously to avoid issues
locale.set('pt'); // Fallback locale

// Initialize asynchronously
export const initializeI18n = async () => {
  await init({
    fallbackLocale: 'pt',
    initialLocale: getLocaleFromNavigator(),
  });
};