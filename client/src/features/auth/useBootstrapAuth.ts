import { useAuth } from "@clerk/react";
import { useAuthStore } from "./store";
import { useEffect } from "react";
import { getMe, syncUser } from "./api";
import { setApiTokenGetter } from "@/lib/api";

export function useBootstrapAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { setLoading, setUser, clearAuth, setError } = useAuthStore();

  useEffect(() => {
    setApiTokenGetter(async () => {
      const token = await getToken();
      return token ?? null;
    });
  }, [getToken]);

  useEffect(() => {
    async function run() {
      // Check if we're on admin pages by reading window.location
      const isAdminArea = window.location.pathname.startsWith("/admin");
      
      // Skip Clerk auth for admin pages (they use hardcoded admin login)
      if (isAdminArea) {
        return;
      }

      if (!isLoaded) return;

      if (!isSignedIn) {
        clearAuth();
        return;
      }

      try {
        setLoading();

        await syncUser();
        const me = await getMe();

        setUser(me?.user);
      } catch (error) {
        const errMessage =
          error instanceof Error ? error.message : "Failed to load user";
        setError(errMessage);
      }
    }

    void run();
  }, [isLoaded, isSignedIn, clearAuth, setError, setLoading, setUser]);
}
