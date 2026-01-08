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

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId) {
  throw new Error(
    "Missing required environment variable GOOGLE_CLIENT_ID for Google authentication."
  );
}

if (!googleClientSecret) {
  throw new Error(
    "Missing required environment variable GOOGLE_CLIENT_SECRET for Google authentication."
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          scope: "openid email profile",
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
          email: "Email missing",
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
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
