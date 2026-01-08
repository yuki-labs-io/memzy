export type UserRole = "admin" | "member" | "viewer";

export type Permission =
  | "dashboard:read"
  | "dashboard:write"
  | "users:manage"
  | "settings:read"
  | "settings:write";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  member: 2,
  viewer: 1,
};

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "dashboard:read",
    "dashboard:write",
    "users:manage",
    "settings:read",
    "settings:write",
  ],
  member: ["dashboard:read", "dashboard:write", "settings:read"],
  viewer: ["dashboard:read"],
};

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function hasPermission(
  userRole: UserRole,
  requiredPermission: Permission
): boolean {
  return ROLE_PERMISSIONS[userRole].includes(requiredPermission);
}

export function hasPermissions(
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean {
  const userPermissions = ROLE_PERMISSIONS[userRole];
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
}
