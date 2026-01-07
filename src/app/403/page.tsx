"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
        <div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            403
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            Access Denied
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            You do not have permission to access this resource. Please contact
            your administrator if you believe this is an error.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-full rounded-lg bg-gray-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go Back
          </button>
          <Link
            href="/dashboard"
            className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
