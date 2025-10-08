import { useClerk } from "@clerk/clerk-react";
import styles from "./SignOutButton.module.css";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className={styles.signOutButton}
    >
      Sign Out
    </button>
  );
};
