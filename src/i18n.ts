// src/lib/i18n.ts
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('$lib/locales/en.json'));
register('pt', () => import('$lib/locales/pt.json'));

await init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
});
