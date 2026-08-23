import { SignIn } from "@clerk/react";

export function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            formFieldInput: "rounded-md",
            footerActionLink: "text-primary hover:text-primary/90",
            card: "shadow-xl",
          },
        }}
        fallbackRedirectUrl="/"
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
