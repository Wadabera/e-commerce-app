import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../admin/common/sidebar";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/sign-in", { replace: true });
  };

  const adminUser = localStorage.getItem("adminUser");
  const userName = adminUser ? JSON.parse(adminUser).name : "Admin";

  return (
    <div className="min-h-screen bg-secondary/45">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 backdrop-blur lg:px-6">
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{userName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
