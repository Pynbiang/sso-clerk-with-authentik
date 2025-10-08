import type { UserResource } from "@clerk/types";
import { supabase, Profile, ProfileInsert, ProfileUpdate } from "./supabase";

export { type Profile } from "./supabase";

export function deriveUsername(user: UserResource): string {
  return (
    user.username ||
    user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    user.id
  );
}

/**
 * Get profile by Clerk user ID
 */
export async function getProfileByClerkId(
  clerkUserId: string
): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_user_id", clerkUserId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No row found
        return null;
      }
      throw error;
    }

    return data;
  } catch (err: any) {
    console.error("Error fetching profile by clerk_id:", err);
    return null;
  }
}

/**
 * Insert a new profile into Supabase
 */
export async function insertProfile(
  profileData: ProfileInsert
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profileData])
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to insert profile: ${error.message}`);
  }

  return data;
}

/**
 * Update an existing profile
 */
export async function updateProfile(
  clerkUserId: string,
  updates: ProfileUpdate
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("clerk_user_id", clerkUserId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data;
}

/**
 * Update specific profile fields
 */
export async function updateProfileFields(
  clerkUserId: string,
  fields: { username?: string; bio?: string }
): Promise<Profile> {
  return updateProfile(clerkUserId, fields);
}

/**
 * Upsert profile from Clerk user data (insert or update)
 */
export async function upsertProfileFromClerk(
  user: UserResource
): Promise<Profile> {
  const username = deriveUsername(user);
  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress;

  const first_name = user.firstName || null;
  const last_name = user.lastName || null;

  const profileData: ProfileInsert = {
    clerk_user_id: user.id,
    username,
    email,
    first_name,
    last_name,
    bio: "New here!", // Will be set later if needed
  };

  try {
    // First, try to get existing profile
    const existingProfile = await getProfileByClerkId(user.id);

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await updateProfile(user.id, {
        username,
        email,
        first_name,
        last_name,
      });
      console.log("✅ Profile updated:", updatedProfile);
      return updatedProfile;
    } else {
      // Insert new profile
      const newProfile = await insertProfile(profileData);
      console.log("✅ Profile created:", newProfile);
      return newProfile;
    }
  } catch (error: any) {
    console.error("❌ Error syncing profile:", error.message);
    throw error;
  }
}
