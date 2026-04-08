import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#151515] border border-[#1A1A1A] shadow-none",
            headerTitle: "text-white",
            headerSubtitle: "text-[#888888]",
            socialButtonsBlockButton: "bg-[#0F0F0F] border-[#1A1A1A] text-white",
            formButtonPrimary: "bg-[#7BC8D8] text-[#050505] hover:bg-[#6ab8c8]",
            formFieldInput: "bg-[#0F0F0F] border-[#1A1A1A] text-white",
            footerActionLink: "text-[#7BC8D8]",
          },
        }}
        forceRedirectUrl="/projects"
        signUpUrl="/sign-in"
      />
    </div>
  );
}
