import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function AdminGuard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem("adminToken");
      const adminUser = localStorage.getItem("adminUser");

      if (adminToken && adminUser) {
        try {
          const user = JSON.parse(adminUser);
          if (user && user.role === "admin") {
            setIsAdmin(true);
            return;
          }
        } catch (error) {
          console.error("Error parsing admin user:", error);
          // Clear invalid data
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
        }
      }
      setIsAdmin(false);
    };

    checkAdminAuth();
  }, [location.pathname]); // Re-check when location changes

  if (isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
