# Memzy - AI-Powered Flashcard Learning Platform

Memzy is a modern, AI-powered flashcard application that helps users create, organize, and study educational content efficiently. Built with Next.js, it leverages AI to generate flashcards from various sources and provides an intuitive deck management system.

## Features

### 🎯 Core Features
- **Deck Management Dashboard**: Organize your flashcards into decks by subject or topic
- **AI Flashcard Generation**: Create flashcards from text, PDFs, images, and videos using AI
- **Progress Tracking**: Visual progress indicators show your study completion
- **User Authentication**: Secure Google OAuth authentication
- **LLM Configuration**: Configure OpenAI or Anthropic providers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 User Experience
- Clean, modern interface
- Zero-state guidance for new users
- Optimistic UI updates
- Toast notifications
- Keyboard navigation support
- Screen reader accessible

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI + Tailwind CSS
- **AI Integration**: OpenAI and Anthropic
- **Architecture**: Clean Architecture with Dependency Injection

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database
- Google OAuth credentials
- OpenAI or Anthropic API key (for AI features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yuki-labs-io/memzy.git
cd memzy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Database
DATABASE_URL="postgresql://memzy:memzy_dev_password@localhost:5432/memzy?schema=public"

# Encryption
ENCRYPTION_KEY=<generate with: openssl rand -base64 32>
```

4. **Start PostgreSQL**
```bash
npm run db:up
```

5. **Run database migrations**
```bash
npx prisma migrate dev
```

6. **Generate Prisma Client**
```bash
npx prisma generate
```

7. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
memzy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (protected)/       # Protected routes
│   │   │   ├── dashboard/     # Deck management dashboard
│   │   │   ├── flashcards/    # Flashcard generation
│   │   │   └── settings/      # User settings
│   │   ├── api/               # API routes
│   │   └── login/             # Authentication
│   ├── components/            # Reusable UI components
│   ├── context/               # Application core (Clean Architecture)
│   │   ├── domain/           # Domain entities and business rules
│   │   ├── application/      # Use cases, DTOs, handlers
│   │   └── infrastructure/   # Repositories, adapters, services
│   └── lib/                  # Shared utilities
├── prisma/                   # Database schema and migrations
└── docs/                     # Documentation
```

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:up        # Start PostgreSQL container
npm run db:down      # Stop PostgreSQL container
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:push      # Push schema changes
npm run db:reset     # Reset database
```

## Documentation

- [Authentication System](./docs/AUTHENTICATION.md)
- [AI Flashcards Feature](./docs/AI_FLASHCARDS_FEATURE.md)
- [Deck Management Dashboard](./docs/features/DECK_MANAGEMENT_DASHBOARD.md)
- [Database Migrations](./docs/migrations/)

## Architecture

Memzy follows **Clean Architecture** principles:

### Layers
1. **Domain Layer** (`context/domain/`): Business entities and rules
2. **Application Layer** (`context/application/`): Use cases and handlers
3. **Infrastructure Layer** (`context/infrastructure/`): External services
4. **Framework Layer** (`app/`): Next.js routes and UI

### Key Principles
- Dependency Injection (DI) for loose coupling
- Repository pattern for data access
- Pipeline pattern for API routes
- Atomic Design for UI components

## Features in Detail

### Deck Management Dashboard
- Create and organize study decks
- Track progress with visual indicators
- Responsive grid layout
- Zero-state for new users
- AI status indicator

[Read more →](./docs/features/DECK_MANAGEMENT_DASHBOARD.md)

### AI Flashcard Generation
- Generate from text, PDFs, images, or videos
- Support for OpenAI and Anthropic
- Configurable per user
- Encrypted API key storage

[Read more →](./docs/AI_FLASHCARDS_FEATURE.md)

## Contributing

We welcome contributions! Please follow these guidelines:

1. Follow the existing architecture patterns
2. Write clean, typed TypeScript code
3. Use the established component structure
4. Add tests for new features
5. Update documentation

## License

[License information here]

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yuki-labs-io/memzy/issues)
- Documentation: See `/docs` folder

---

Built with ❤️ using Next.js and Clean Architecture principles
