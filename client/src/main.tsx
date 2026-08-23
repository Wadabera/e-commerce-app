import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "./components/ui/sonner.tsx";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function MissingClerkConfig() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <section className="max-w-xl space-y-4 border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold">Clerk is not configured</h1>
        <p className="text-sm text-muted-foreground">
          Add VITE_CLERK_PUBLISHABLE_KEY in client/.env to run the full
          frontend sign-in and account flows.
        </p>
      </section>
    </main>
  );
}

// Add error boundary
try {
  createRoot(document.getElementById("root")!).render(
    clerkPublishableKey ? (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
        <Toaster />
      </ClerkProvider>
    ) : (
      <MissingClerkConfig />
    ),
  );
} catch (error) {
  console.error("Failed to render app:", error);
  document.getElementById("root")!.innerHTML = `
    <div style="padding: 50px; text-align: center; color: red;">
      <h1>Error Loading Application</h1>
      <p>Check browser console (F12) for details</p>
      <pre style="text-align: left; background: #f5f5f5; padding: 20px; margin-top: 20px;">
        ${error instanceof Error ? error.message : String(error)}
      </pre>
    </div>
  `;
}
