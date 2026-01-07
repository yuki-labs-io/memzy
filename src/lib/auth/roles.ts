export type UserRole = "admin" | "member" | "viewer";

export type Permission =
  | "dashboard:read"
  | "users:manage"
  | "settings:read"
  | "settings:write";

export const roleHierarchy: Record<UserRole, number> = {
  admin: 3,
  member: 2,
  viewer: 1,
};

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "dashboard:read",
    "users:manage",
    "settings:read",
    "settings:write",
  ],
  member: ["dashboard:read", "settings:read"],
  viewer: ["dashboard:read"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function hasAnyPermission(
  role: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}
