import { Suspense } from "react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your dashboard and manage your account
          </p>
        </div>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            }
          >
            <GoogleSignInButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
