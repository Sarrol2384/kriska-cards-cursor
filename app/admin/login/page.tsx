import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#080808] px-4">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold tracking-widest text-primary uppercase">
          Eyethu Property Group
        </p>
        <h1 className="font-heading mt-2 text-2xl font-semibold">Admin sign in</h1>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
