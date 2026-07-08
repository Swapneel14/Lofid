import { useUser, useClerk, useAuth } from "@clerk/react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthGuard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const admin = import.meta.env.VITE_ADMIN_EMAIL;

  useEffect(() => {
    const checkUser = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      const email =
        user.primaryEmailAddress?.emailAddress || "";

      // Allow only college email or admin email
      if (
        !email.endsWith("@students.iiests.ac.in") &&
        email !== admin
      ) {
        sessionStorage.setItem("auth_error", "Only @students.iiests.ac.in accounts are allowed");
        await signOut();
        return;
      }

      // Check if user is banned
      // try {
      //   const token = await getToken();

      //   const res = await axios.get(
      //     "http://localhost:6769/api/auth/check-ban",
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   if (res.data.banned) {
      //     sessionStorage.setItem("auth_error", res.data.message);
      //     await signOut();
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
    };

    checkUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
}