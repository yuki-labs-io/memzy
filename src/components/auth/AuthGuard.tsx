"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { UserRole, Permission, hasRole, hasAnyPermission } from "@/lib/auth/roles";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireRole?: UserRole;
  requirePermissions?: Permission[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireRole,
  requirePermissions,
  fallback,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (requireAuth && status === "unauthenticated") {
      const url = `${redirectTo}?next=${encodeURIComponent(pathname)}`;
      router.push(url);
      return;
    }

    if (status === "authenticated" && session?.user) {
      const userRole = session.user.role;

      if (requireRole && !hasRole(userRole, requireRole)) {
        router.push("/403");
        return;
      }

      if (
        requirePermissions &&
        requirePermissions.length > 0 &&
        !hasAnyPermission(userRole, requirePermissions)
      ) {
        router.push("/403");
        return;
      }
    }
  }, [
    status,
    session,
    requireAuth,
    requireRole,
    requirePermissions,
    router,
    redirectTo,
    pathname,
  ]);

  if (status === "loading") {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      )
    );
  }

  if (requireAuth && status === "unauthenticated") {
    return null;
  }

  if (status === "authenticated" && session?.user) {
    const userRole = session.user.role;

    if (requireRole && !hasRole(userRole, requireRole)) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">
              You do not have permission to access this resource.
            </p>
          </div>
        </div>
      );
    }

    if (
      requirePermissions &&
      requirePermissions.length > 0 &&
      !hasAnyPermission(userRole, requirePermissions)
    ) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">
              You do not have the required permissions.
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
