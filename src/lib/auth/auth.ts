import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { UserRole, Permission, hasRole, hasPermission } from "./roles";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (!hasRole(user.role, role)) {
    throw new Error("Forbidden: Insufficient role");
  }
  return user;
}

export async function requirePermission(permission: Permission) {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    throw new Error("Forbidden: Missing permission");
  }
  return user;
}

export { authOptions };
