"use client";

import { useSession, signOut } from "next-auth/react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Image from "next/image";

function DashboardContent() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Memzy Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {session?.user && (
                <div className="flex items-center gap-3">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.user.email}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {session.user.role}
                  </span>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to your Dashboard
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Session Information
              </h3>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session?.user?.name || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session?.user?.email || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session?.user?.role || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session?.user?.id || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-start">
                <svg
                  className="mr-3 h-5 w-5 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Successfully Authenticated
                  </h3>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    You are now signed in with Google OAuth. This is a protected
                    route.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth>
      <DashboardContent />
    </AuthGuard>
  );
}
