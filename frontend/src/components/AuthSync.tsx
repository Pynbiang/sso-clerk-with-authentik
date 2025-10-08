import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { upsertProfileFromClerk } from "../lib/profileService";

export default function AuthSync() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    upsertProfileFromClerk(user);
  }, [isSignedIn, user]);

  return null;
}
