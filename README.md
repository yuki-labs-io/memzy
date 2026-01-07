# Memzy

Memzy is your intelligent memory assistant built with Next.js 16, featuring secure Google OAuth authentication.

## Features

- 🔐 **Secure Authentication**: Google OAuth 2.0 integration with NextAuth.js
- 🛡️ **Role-Based Access Control**: Admin, Member, and Viewer roles with granular permissions
- 🚀 **Modern Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- 🎨 **Responsive Design**: Mobile-first design with dark mode support
- 📝 **Type-Safe**: Full TypeScript support with strict type checking

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Google Cloud Console project with OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yuki-labs-io/memzy.git
cd memzy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- `NEXTAUTH_URL`: Your application URL (e.g., `http://localhost:3000`)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

See [Authentication Setup Guide](./docs/AUTH_SETUP.md) for detailed instructions.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation

- **[Authentication Setup Guide](./docs/AUTH_SETUP.md)**: Complete guide for setting up Google OAuth
- **[PRD: Login Flow](./product-lens/prd/features/login-flow-with-google.md)**: Product requirements document

## Project Structure

```
memzy/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (protected)/       # Protected routes
│   │   ├── api/auth/          # NextAuth API routes
│   │   ├── login/             # Login page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   └── auth/              # Authentication components
│   └── lib/                   # Utility functions and configs
│       └── auth/              # Authentication logic
├── middleware.ts              # Route protection middleware
├── docs/                      # Documentation
└── .product-lens/             # Product requirements
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

Memzy uses NextAuth.js with Google OAuth 2.0 for authentication. Key features:

- **Stateless JWT sessions** for scalability
- **Secure HTTP-only cookies** to prevent XSS attacks
- **CSRF protection** via state parameter
- **Role-based access control** with three default roles
- **Server-side and client-side route protection**

See the [Authentication Setup Guide](./docs/AUTH_SETUP.md) for more details.

## Security

- OAuth 2.0 with Google
- JWT-based sessions
- HTTP-only secure cookies
- CSRF protection
- Minimal OAuth scopes
- Server-side token validation

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to Yuki Labs.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Made with ❤️ by [Yuki Labs](https://github.com/yuki-labs-io)
