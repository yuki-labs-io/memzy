# Google OAuth Authentication - Implementation Guide

This document provides setup instructions and technical details for the Google OAuth authentication system implemented in Memzy.

## Prerequisites

- Google Cloud Console project with OAuth 2.0 credentials
- Node.js 18+ and npm
- HTTPS in production (required by OAuth 2.0)

## Setup Instructions

### 1. Configure Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Configure:
   - **Authorized JavaScript origins**: 
     - Development: `http://localhost:3000`
     - Production: `https://yourdomain.com`
   - **Authorized redirect URIs**: 
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://yourdomain.com/api/auth/callback/google`
7. Save your **Client ID** and **Client Secret**

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Install Dependencies

Dependencies are already installed in package.json:
```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Architecture

### File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API routes
│   ├── login/page.tsx                    # Login page with Google button
│   ├── (protected)/dashboard/page.tsx    # Protected dashboard
│   ├── 403/page.tsx                      # Access denied page
│   └── layout.tsx                        # Root layout with SessionProvider
├── lib/auth/
│   ├── auth-options.ts                   # NextAuth configuration
│   ├── auth.ts                           # Auth helper functions
│   ├── roles.ts                          # RBAC definitions
│   └── types.ts                          # TypeScript type extensions
├── components/auth/
│   ├── AuthGuard.tsx                     # Client-side route protection
│   └── SessionProvider.tsx               # Session context wrapper
└── middleware.ts                         # Server-side route protection
```

### Authentication Flow

1. **User visits login page** (`/login`)
2. **Clicks "Sign in with Google"** button
3. **Redirected to Google OAuth consent screen**
4. **User authorizes application**
5. **Google redirects back** to `/api/auth/callback/google` with authorization code
6. **NextAuth exchanges code** for access_token and id_token
7. **Token validation** occurs server-side:
   - Verify signature using Google's public keys
   - Validate issuer (iss) claim
   - Validate audience (aud) claim
   - Check expiration (exp)
8. **Session created** with JWT strategy (secure HTTP-only cookie)
9. **User redirected** to dashboard or originally requested page

## Security Features

### CSRF Protection
- State parameter automatically generated and validated by NextAuth
- Prevents cross-site request forgery attacks

### Token Security
- Access tokens never exposed to client-side JavaScript
- Session managed via secure, HTTP-only cookies
- Tokens validated server-side only

### RBAC (Role-Based Access Control)
- Three default roles: `admin`, `member`, `viewer`
- Hierarchical permission system
- Server-side and client-side enforcement

### Minimal OAuth Scopes
Only requests essential permissions:
- `openid` - User identity
- `email` - Email address
- `profile` - Basic profile information

## Usage Examples

### Server-Side Route Protection

```typescript
import { requireAuth, requireRole } from "@/lib/auth/auth";

export default async function AdminPage() {
  // Require authentication
  const user = await requireAuth();
  
  // Require specific role
  await requireRole("admin");
  
  return <div>Admin Content</div>;
}
```

### Client-Side Component Protection

```typescript
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard 
      requireAuth 
      requireRole="member"
      requirePermissions={["dashboard:read"]}
    >
      <DashboardContent />
    </AuthGuard>
  );
}
```

### Access Session Data

```typescript
"use client";
import { useSession } from "next-auth/react";

export function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;
  
  return (
    <div>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}
```

### Sign Out

```typescript
"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })}>
      Sign Out
    </button>
  );
}
```

## Routes

- `/` - Home page (redirects to dashboard if authenticated)
- `/login` - Login page with Google OAuth button
- `/dashboard` - Protected dashboard (requires authentication)
- `/403` - Access denied page
- `/api/auth/*` - NextAuth API routes

## Middleware Configuration

Protected routes (automatically redirect unauthenticated users):
- `/dashboard/*`
- `/settings/*`
- `/app/*`
- `/(protected)/*`

Public routes (accessible without authentication):
- `/`
- `/login`
- `/api/public/*`

## Error Handling

### Common OAuth Errors

| Error Code | Description | User Message |
|------------|-------------|--------------|
| `OAuthSignin` | Failed to construct authorization URL | Error connecting to Google |
| `OAuthCallback` | Error during OAuth callback | Authentication callback failed |
| `OAuthAccountNotLinked` | Email already exists with different provider | Email already associated with another account |
| `SessionRequired` | Accessing protected route without session | Please sign in to access this page |

### Custom Error Handling

Errors are displayed on the login page with user-friendly messages. Technical details are logged server-side for debugging.

## Session Management

- **Strategy**: JWT (stateless)
- **Max Age**: 30 days
- **Cookie**: Secure, HTTP-only, SameSite=Lax
- **Refresh**: Automatic on page navigation

## Monitoring & Logging

The following events are logged for observability:

- `auth.sign_in.success` - Successful authentication
- `auth.sign_in.denied` - Failed authentication attempt
- `auth.sign_out` - User sign out
- `auth.session.invalid` - Invalid session detected
- `auth.session.updated` - Session updated

Each log includes:
- `userId`
- `email`
- `provider`
- `timestamp`
- Additional context as needed

## Customization

### Adding Custom User Properties

1. Update `src/lib/auth/types.ts`:
```typescript
interface User extends DefaultUser {
  customField?: string;
}
```

2. Update JWT callback in `src/lib/auth/auth-options.ts`:
```typescript
async jwt({ token, user }) {
  if (user) {
    token.customField = user.customField;
  }
  return token;
}
```

3. Update session callback:
```typescript
async session({ session, token }) {
  session.user.customField = token.customField;
  return session;
}
```

### Adding Custom Roles/Permissions

Edit `src/lib/auth/roles.ts`:

```typescript
export type UserRole = "admin" | "member" | "viewer" | "custom";

export const rolePermissions: Record<UserRole, Permission[]> = {
  custom: ["custom:read", "custom:write"],
  // ... other roles
};
```

## Production Considerations

### HTTPS Required
OAuth 2.0 requires HTTPS in production. Ensure your deployment has SSL/TLS certificates configured.

### Environment Variables
- Never commit `.env.local` to version control
- Use environment variable management in your deployment platform
- Rotate `NEXTAUTH_SECRET` periodically

### Session Security
- Enable `secure: true` for cookies in production (automatic with HTTPS)
- Set appropriate cookie SameSite policy
- Consider shorter session duration for high-security applications

### Rate Limiting
Implement rate limiting on authentication endpoints to prevent brute force attacks.

### Monitoring
- Monitor authentication success/failure rates
- Set up alerts for unusual authentication patterns
- Track OAuth provider availability

## Troubleshooting

### "Access Denied" Error
- Verify Google OAuth credentials are correct
- Check authorized redirect URIs in Google Console
- Ensure NEXTAUTH_URL matches your deployment URL

### Session Not Persisting
- Check browser cookie settings
- Verify NEXTAUTH_SECRET is set
- Ensure cookies are not blocked by browser extensions

### Middleware Not Working
- Verify middleware.ts is in the root directory (not src/)
- Check matcher patterns in middleware config
- Ensure NextAuth is properly configured

### Type Errors
- Restart TypeScript server in your IDE
- Delete `.next` folder and rebuild
- Verify type definitions in `src/lib/auth/types.ts`

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [PRD: Login Flow with Google](./.product-lens/prd/features/login-flow-with-google.md)

## Support

For issues or questions:
1. Check this documentation first
2. Review the PRD for requirements clarification
3. Open an issue in the repository
4. Contact the development team

---

**Version**: 1.0.0  
**Last Updated**: 2026-01-07  
**Maintainer**: Development Team
