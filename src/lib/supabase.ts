import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

export function getSupabase() {
  if (typeof window === 'undefined') {
    return null; // Server-side, retorna null
  }

  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Missing Supabase credentials');
      return null;
    }

    supabase = createClient(url, key);
  }

  return supabase;
}

export const supabase = {
  auth: {
    signUp: async (email: string, password: string, options: any) => {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not initialized');
      return client.auth.signUp({ email, password, options });
    },
    signInWithPassword: async (email: string, password: string) => {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not initialized');
      return client.auth.signInWithPassword({ email, password });
    },
    signOut: async () => {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not initialized');
      return client.auth.signOut();
    },
    getUser: async () => {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not initialized');
      return client.auth.getUser();
    },
    getSession: async () => {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not initialized');
      return client.auth.getSession();
    },
  },
  from: (table: string) => {
    const client = getSupabase();
    if (!client) throw new Error('Supabase not initialized');
    return client.from(table);
  },
};
