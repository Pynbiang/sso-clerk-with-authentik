import { useEffect, useMemo, useState } from "react";
import { UserProfile, useUser } from "@clerk/clerk-react";
import {
  Profile,
  getProfileByClerkId,
  updateProfileFields,
} from "../lib/profileService";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { isSignedIn, user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clerkId = useMemo(() => (user ? user.id : null), [user]);

  useEffect(() => {
    let isMounted = true;
    async function ensureProfile() {
      if (!isSignedIn || !user) return;
      setLoading(true);
      setError(null);
      try {
        const existing = await getProfileByClerkId(user.id);
        console.log("existing", existing);
        if (isMounted) setProfile(existing);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load profile");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    ensureProfile();
    return () => {
      isMounted = false;
    };
  }, [isSignedIn, user]);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    setUsername(profile?.username ?? "");
    setBio(profile?.bio ?? "");
  }, [profile]);

  async function handleSave() {
    if (!clerkId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProfileFields(clerkId, { username, bio });
      setProfile(updated);
    } catch (e: any) {
      setError(e?.message ?? "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1>Profile</h1>
        <p>Manage your account settings and profile information</p>
      </div>

      <div className={styles.grid}>
        {/* Account Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Account Settings</h2>
            <p className="card-description">
              Manage your authentication and account preferences
            </p>
          </div>
          <div className="card-content">
            <UserProfile
              routing="path"
              path="/profile"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0",
                  navbar: "hidden",
                  navbarMobileMenuButton: "hidden",
                  headerTitle: "text-lg font-semibold",
                  headerSubtitle: "text-sm text-gray-600",
                  profileSectionTitle: "text-base font-medium",
                  profileSectionContent: "space-y-4",
                  formField: "space-y-2",
                  formFieldLabel: "text-sm font-medium text-gray-700",
                  formFieldInput: "input",
                  formButtonPrimary: "btn btn-primary",
                  formButtonReset: "btn btn-secondary",
                  identityPreview: "border border-gray-200 rounded-lg p-3",
                  identityPreviewText: "text-sm text-gray-600",
                  identityPreviewEditButton: "btn btn-outline btn-sm",
                },
              }}
            />
          </div>
        </div>

        {/* App Profile Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">App Profile</h2>
            <p className="card-description">
              Customize your profile for this application
            </p>
          </div>
          <div className="card-content">
            {error && (
              <div className={styles.errorAlert}>
                <p className={styles.errorText}>{error}</p>
              </div>
            )}

            {loading && (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <span className={styles.loadingText}>Loading...</span>
              </div>
            )}

            {profile && (
              <div className={styles.profileForm}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="input"
                  />
                  <p className={styles.fieldHelp}>
                    Choose a unique username for your profile
                  </p>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="input"
                    style={{ resize: "none" }}
                  />
                  <p className={styles.fieldHelp}>
                    A brief description about yourself
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-primary btn-md"
                  style={{ width: "100%" }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div
                        className="spinner"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          border: "2px solid white",
                          borderTop: "2px solid transparent",
                          marginRight: "0.5rem",
                        }}
                      ></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}

            {!profile && !loading && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className={styles.emptyTitle}>No Profile Found</h3>
                <p className={styles.emptyDescription}>
                  Your profile will be created automatically when you sign in.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
