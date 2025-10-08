import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  clerk_user_id: string;
  username: string | null;
  bio: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileInsert = Omit<Profile, "id" | "created_at" | "updated_at">;
export type ProfileUpdate = Partial<
  Omit<Profile, "id" | "clerk_user_id" | "created_at" | "updated_at">
>;
