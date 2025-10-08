import { UserButton, useUser } from "@clerk/clerk-react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard</h1>
          <p>
            Welcome back
            {user
              ? `, ${
                  user.firstName ??
                  user.username ??
                  user.primaryEmailAddress?.emailAddress ??
                  "friend"
                }`
              : ""}
            !
          </p>
        </div>
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "shadow-lg border border-gray-200",
              userButtonPopoverActions: "p-2",
              userButtonPopoverActionButton:
                "hover:bg-gray-50 rounded-md p-2 text-sm",
            },
          }}
        />
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className="card">
          <div className="card-content">
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Profile Status</p>
                <p className={styles.statValue}>Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Email Status</p>
                <p className={styles.statValue}>Verified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Security</p>
                <p className={styles.statValue}>Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Last Login</p>
                <p className={styles.statValue}>Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-description">
            Manage your account and profile settings
          </p>
        </div>
        <div className="card-content">
          <div className={styles.quickActions}>
            <a href="/profile" className={styles.actionItem}>
              <div
                className={`${styles.actionIcon} ${styles.actionIconPrimary}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className={styles.actionContent}>
                <h4>Edit Profile</h4>
                <p>Update your personal information</p>
              </div>
            </a>

            <div className={styles.actionItem}>
              <div className={`${styles.actionIcon} ${styles.actionIconGreen}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className={styles.actionContent}>
                <h4>Security Settings</h4>
                <p>Manage your security preferences</p>
              </div>
            </div>

            <div className={styles.actionItem}>
              <div className={`${styles.actionIcon} ${styles.actionIconBlue}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className={styles.actionContent}>
                <h4>Help & Support</h4>
                <p>Get help and contact support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
