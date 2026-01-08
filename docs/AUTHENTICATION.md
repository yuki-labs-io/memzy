# Authentication System Documentation

## Overview

This authentication system implements secure Google OAuth 2.0 login using NextAuth.js with role-based access control (RBAC) and comprehensive route protection.

## Features

- 🔐 **Google OAuth 2.0** - Secure authentication via Google
- 🛡️ **JWT Sessions** - Stateless, secure HTTP-only cookie sessions
- 👥 **RBAC** - Role-Based Access Control (admin, member, viewer)
- 🔑 **Permissions** - Fine-grained permission system
- 🚪 **Route Protection** - Server-side middleware + client-side guards
- 📊 **Audit Logging** - Structured event logging foundation
- ♿ **Accessible** - WCAG 2.1 Level AA compliant

## Quick Start

### 1. Set up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy your Client ID and Client Secret

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-command-below>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

### 3. Run the Application

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000`

## Architecture

### File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth handler
│   ├── login/page.tsx                    # Login page
│   ├── (protected)/dashboard/page.tsx   # Protected route example
│   ├── 403/page.tsx                     # Forbidden page
│   └── layout.tsx                       # Root layout with SessionProvider
├── components/auth/
│   ├── SessionProvider.tsx              # Session context wrapper
│   ├── AuthGuard.tsx                    # Client-side route guard
│   └── GoogleSignInButton.tsx           # Google OAuth button
├── lib/auth/
│   ├── roles.ts                         # RBAC types and utilities
│   ├── auth.types.ts                    # TypeScript type extensions
│   ├── auth-options.ts                  # NextAuth configuration
│   └── auth.ts                          # Auth helper exports
└── middleware.ts                         # Server-side route protection
```

## Usage

### Protecting Routes

#### Server-Side (Middleware)

Routes are automatically protected based on path patterns defined in `middleware.ts`:

- **Protected:** `/dashboard`, `/settings`, `/app/*`
- **Public:** `/`, `/login`, `/api/auth/*`

Unauthenticated users are redirected to `/login?next=<requested-path>`

#### Client-Side (AuthGuard)

Wrap components with `AuthGuard` for fine-grained control:

```tsx
import AuthGuard from "@/components/auth/AuthGuard";

export default function ProtectedPage() {
  return (
    <AuthGuard
      requireAuth={true}
      requireRole="member"
      requirePermissions={["dashboard:read"]}
    >
      <YourContent />
    </AuthGuard>
  );
}
```

**AuthGuard Props:**

- `requireAuth?: boolean` - Require authentication (default: true)
- `requireRole?: UserRole` - Minimum required role
- `requirePermissions?: Permission[]` - Required permissions
- `fallback?: ReactNode` - Loading component
- `redirectTo?: string` - Redirect URL (default: "/login")

### Accessing Session Data

#### Client Components

```tsx
"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not logged in</div>;

  return (
    <div>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
      <p>Permissions: {session?.user?.permissions?.join(", ")}</p>
    </div>
  );
}
```

#### Server Components

```tsx
import { auth } from "@/lib/auth/auth";

export default async function ServerProfile() {
  const session = await auth();

  if (!session) return <div>Not logged in</div>;

  return (
    <div>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}
```

### Sign Out

```tsx
import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/login" })}>
  Sign Out
</button>
```

## Role-Based Access Control

### Roles

Three predefined roles with hierarchical permissions:

1. **admin** - Full access (hierarchy level: 3)
2. **member** - Standard user access (hierarchy level: 2)
3. **viewer** - Read-only access (hierarchy level: 1)

### Permissions

Fine-grained permissions for each role:

**Admin:**
- `dashboard:read`, `dashboard:write`
- `users:manage`
- `settings:read`, `settings:write`

**Member:**
- `dashboard:read`, `dashboard:write`
- `settings:read`

**Viewer:**
- `dashboard:read`

### Role Utilities

```typescript
import { hasRole, hasPermission, hasPermissions } from "@/lib/auth/roles";

// Check if user has required role
hasRole("member", "viewer"); // true (member >= viewer)

// Check single permission
hasPermission("admin", "users:manage"); // true

// Check multiple permissions
hasPermissions("member", ["dashboard:read", "dashboard:write"]); // true
```

## Session Structure

Sessions include the following user data:

```typescript
{
  user: {
    id: string;              // User ID from Google
    email: string;           // Verified email
    name?: string;           // Display name
    image?: string;          // Profile picture URL
    role: UserRole;          // Assigned role (default: "member")
    permissions?: Permission[]; // Role-based permissions
  }
}
```

## Security Features

### CSRF Protection

Automatic CSRF protection via NextAuth's `state` parameter in OAuth flow.

### Secure Cookies

- HTTP-only cookies (not accessible via JavaScript)
- Secure flag in production
- SameSite attribute set
- 30-day session expiration

### Token Validation

- Server-side token validation only
- Google ID token signature verification
- Token expiration checking
- Audience and issuer validation

### OAuth Scopes

Minimal scopes requested:
- `openid` - OpenID Connect
- `email` - Email address
- `profile` - Basic profile information

## Audit Logging

Basic audit events are logged to console (foundation for future enhancement):

- `auth.sign_in.success` - Successful login
- `auth.sign_in.denied` - Login denied
- `auth.sign_out` - User logout
- `auth.session.invalid` - Invalid session detected

Each event includes:
- `timestamp` - ISO 8601 timestamp
- `userId` - User identifier
- `email` - User email
- `provider` - Auth provider (google)
- `success` - Operation success status

## Testing

### Manual Testing Checklist

- [ ] Navigate to `/dashboard` without auth → redirects to `/login?next=/dashboard`
- [ ] Click "Sign in with Google" → redirects to Google
- [ ] Complete Google authentication → redirects back with session
- [ ] Session displays correct user data (name, email, role, permissions)
- [ ] Access dashboard → shows protected content
- [ ] Click "Sign Out" → clears session, redirects to login
- [ ] Try accessing `/dashboard` after logout → redirects to login
- [ ] Test on mobile device → responsive and functional
- [ ] Test keyboard navigation → fully accessible

## References

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [OAuth 2.0 Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)

---

**Last Updated:** 2026-01-08
**Version:** 1.0.0
