import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserRole, rolePermissions } from "./roles";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          console.error("auth.sign_in.denied", {
            reason: "no_email",
            provider: account.provider,
          });
          return false;
        }

        console.log("auth.sign_in.success", {
          userId: user.id,
          email: user.email,
          provider: account.provider,
          timestamp: new Date().toISOString(),
        });
        return true;
      }
      return false;
    },

    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role as UserRole) || "member";
        token.permissions = user.permissions || rolePermissions[token.role];
        token.tenantId = user.tenantId;
      }

      if (account?.provider === "google") {
        token.provider = account.provider;
      }

      if (trigger === "update") {
        console.log("auth.session.updated", {
          userId: token.id,
          timestamp: new Date().toISOString(),
        });
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
  events: {
    async signOut({ token }) {
      console.log("auth.sign_out", {
        userId: token?.id,
        email: token?.email,
        timestamp: new Date().toISOString(),
      });
    },
    async session({ session }) {
      if (!session?.user?.id) {
        console.error("auth.session.invalid", {
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
};
