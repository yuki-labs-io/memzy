"use client";

import { useSession, signOut } from "next-auth/react";
import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {session?.user?.name || "User"}!
            </h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> {session?.user?.email}
              </p>
              <p className="text-gray-600">
                <strong>Role:</strong>{" "}
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {session?.user?.role}
                </span>
              </p>
              {session?.user?.permissions && (
                <div>
                  <p className="text-gray-600">
                    <strong>Permissions:</strong>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {session.user.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            <p className="mt-2 text-gray-600">
              Explore the available features in your dashboard.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/flashcards"
                className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 transition-all hover:border-blue-400 hover:bg-blue-100"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">AI Flashcard Generator</h4>
                <p className="text-sm text-gray-600">
                  Generate educational flashcards from text, files, or images using AI.
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Protected Content</h3>
            <p className="mt-2 text-gray-600">
              This page is only accessible to authenticated users. The middleware
              ensures that unauthenticated users are redirected to the login page.
            </p>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
