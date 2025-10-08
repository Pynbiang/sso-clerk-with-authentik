import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthSync from "./components/AuthSync";
import styles from "./App.module.css";
import { SignOutButton } from "./components/SignOutButton";

export default function App() {
  return (
    <div className={styles.app}>
      <AuthSync />
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarContent}>
            <div className={styles.navbarBrand}>
              <Link to="/dashboard" className={styles.logo}>
                AuthApp
              </Link>
              <div className={styles.navLinks}>
                <Link to="/dashboard" className={styles.navLink}>
                  Dashboard
                </Link>
                <Link to="/profile" className={styles.navLink}>
                  Profile
                </Link>
              </div>
            </div>
            <div className={styles.navActions}>
              <SignedOut>
                <Link to="/sign-in" className={styles.navLink}>
                  Sign In
                </Link>
                <Link to="/sign-up" className={styles.navLink}>
                  Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
