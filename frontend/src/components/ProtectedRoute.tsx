import { PropsWithChildren } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import styles from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className={styles.container}>
          <div className={`card ${styles.card}`}>
            <div className="card-content">
              <div className="mb-6">
                <div className={styles.icon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className={styles.title}>Authentication Required</h2>
                <p className={styles.description}>
                  You must be signed in to view this page. Please sign in to
                  continue.
                </p>
              </div>
              <SignInButton mode="modal">
                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                >
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
