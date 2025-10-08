import { SignUp } from "@clerk/clerk-react";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Create your account</h2>
          <p>Join us today! Create your account to get started</p>
        </div>
        <div className="card">
          <div className="card-content">
            <SignUp
              routing="path"
              path="/sign-up"
              afterSignOutUrl="/dashboard"
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
                  formFieldSuccessText: "text-green-600 text-sm",
                  formFieldErrorText: "text-red-600 text-sm",
                  formFieldWarningText: "text-yellow-600 text-sm",
                },
              }}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className={styles.footerLink}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
