import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const DEFAULT_SUPABASE_URL = 'https://krijukvjgooipltccsgt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyaWp1a3ZqZ29vaXBsdGNjc2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNDY5NDIsImV4cCI6MjEwMzkyMjk0Mn0.R2ZcprcwDz1mDVuH9hOr1u5KbyjQUeMwMJK52xwVWo8';

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
