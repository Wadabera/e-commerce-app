import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminUser");

    if (adminToken && adminUser) {
      try {
        const user = JSON.parse(adminUser);
        if (user.role === "admin") {
          navigate("/admin", { replace: true });
        }
      } catch {
        // Invalid stored data, continue to login
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/admin-login`, {
        email,
        password,
      });

      if (response.data.status === "success") {
        const { user, token } = response.data.data;

        // Store admin session
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));

        toast.success(`Welcome, ${user.name}!`);

        // Force a small delay to ensure localStorage is written
        await new Promise(resolve => setTimeout(resolve, 100));

        // Redirect to admin dashboard with state to force re-render
        window.location.href = "/admin";
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "Invalid admin credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-base">
            Enter your admin credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="waadaaabarraa@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Admin Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In as Admin"}
            </Button>

            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Not an admin?{" "}
                <a
                  href="/"
                  className="font-medium text-primary hover:underline"
                >
                  Go to Customer Site
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
