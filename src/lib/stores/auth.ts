import { writable } from 'svelte/store';

export type AuthState = {
  token: string | null;
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
};


// Function to safely access localStorage only on the client
function getInitialAuth(): AuthState {
  if (typeof localStorage !== 'undefined') {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  }
  return { token: null, user: null };
}

// Initialize the store with the data from localStorage (if available)
export const auth = writable<AuthState>(getInitialAuth());

// Subscribe to changes and persist them to localStorage (only on the client)
if (typeof localStorage !== 'undefined') {
  auth.subscribe((value) => {
    localStorage.setItem('auth', JSON.stringify(value));
  });
}

