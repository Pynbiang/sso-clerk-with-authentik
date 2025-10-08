import { SignIn } from "@clerk/clerk-react";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Sign in to your account</h2>
          <p>Welcome back! Please sign in to continue</p>
        </div>
        <div className="card">
          <div className="card-content">
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/profile"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0",
                  headerTitle: "text-xl font-semibold text-gray-900",
                  headerSubtitle: "text-sm text-gray-600",
                  socialButtonsBlockButton:
                    "btn btn-outline btn-md w-full mb-2",
                  socialButtonsBlockButtonText: "text-sm font-medium",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-xs text-gray-500",
                  formFieldInput: "input",
                  formButtonPrimary: "btn btn-primary btn-md w-full",
                  formFieldLabel: "text-sm font-medium text-gray-700",
                  footerActionLink:
                    "text-primary-600 hover:text-primary-700 text-sm font-medium",
                  identityPreviewText: "text-sm text-gray-600",
                  formFieldInputShowPasswordButton:
                    "text-gray-400 hover:text-gray-600",
                  formResendCodeLink:
                    "text-primary-600 hover:text-primary-700 text-sm",
                  otpCodeFieldInput:
                    "input text-center text-lg tracking-widest",
                },
              }}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <a href="/sign-up" className={styles.footerLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
