import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { ROLE_PERMISSIONS } from "./roles";
import "./auth.types";

const logAuthEvent = (
  event: string,
  data: {
    userId?: string;
    email?: string;
    provider?: string;
    success?: boolean;
  }
) => {
  console.log(`[AUTH EVENT] ${event}`, {
    timestamp: new Date().toISOString(),
    ...data,
  });
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
      if (!user.email) {
        logAuthEvent("auth.sign_in.denied", {
          email: user.email || "unknown",
          provider: account?.provider || "unknown",
          success: false,
        });
        return false;
      }

      logAuthEvent("auth.sign_in.success", {
        userId: user.id,
        email: user.email,
        provider: account?.provider || "unknown",
        success: true,
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.sub || "";
        token.role = user.role || "member";
        token.permissions = user.permissions || ROLE_PERMISSIONS[token.role];
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  events: {
    async signOut({ token, session }) {
      logAuthEvent("auth.sign_out", {
        userId: token?.id || session?.user?.id,
        email: token?.email || session?.user?.email || undefined,
      });
    },
    async session({ session, token }) {
      if (!session || !token) {
        logAuthEvent("auth.session.invalid", {
          userId: token?.id,
          email: token?.email || undefined,
        });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
