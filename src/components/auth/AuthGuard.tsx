"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { UserRole, Permission, hasRole, hasPermissions } from "@/lib/auth/roles";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireRole?: UserRole;
  requirePermissions?: Permission[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
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
      if (requireRole && !hasRole(session.user.role, requireRole)) {
        router.push("/403");
        return;
      }

      if (
        requirePermissions &&
        requirePermissions.length > 0 &&
        !hasPermissions(session.user.role, requirePermissions)
      ) {
        router.push("/403");
        return;
      }
    }
  }, [status, session, requireAuth, requireRole, requirePermissions, router, pathname, redirectTo]);

  if (status === "loading") {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      )
    );
  }

  if (requireAuth && status === "unauthenticated") {
    return null;
  }

  if (status === "authenticated" && session?.user) {
    if (requireRole && !hasRole(session.user.role, requireRole)) {
      return null;
    }

    if (
      requirePermissions &&
      requirePermissions.length > 0 &&
      !hasPermissions(session.user.role, requirePermissions)
    ) {
      return null;
    }
  }

  return <>{children}</>;
}
