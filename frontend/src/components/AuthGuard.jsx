import { useUser, useClerk } from "@clerk/react";
import { useEffect } from "react";

export default function AuthGuard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const admin = import.meta.env.VITE_ADMIN_EMAIL;

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const email =
        user.primaryEmailAddress?.emailAddress || "";

      if (!email.endsWith("@students.iiests.ac.in")&&(email != admin)) {
        alert(
          "Only @students.iiests.ac.in accounts are allowed."
        );

        signOut();
      }
    }
  }, [isLoaded, isSignedIn, user, signOut]);

  return null;
}