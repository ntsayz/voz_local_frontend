import { writable } from 'svelte/store';

export type AuthState = {
    token: string | null;
    user: {
      username: string;
    } | null;
  };
  
  export const auth = writable<AuthState>({
    token: null,
    user: null,
  });

  