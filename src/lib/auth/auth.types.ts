import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole, Permission } from "./roles";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      permissions?: Permission[];
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    role?: UserRole;
    permissions?: Permission[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    permissions?: Permission[];
  }
}
