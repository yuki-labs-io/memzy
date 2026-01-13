# Deck Management Dashboard

## Overview

The Deck Management Dashboard is the central hub of the Memzy application where users can view, organize, and manage their study decks. It provides a clean, intuitive interface for tracking study progress and accessing study materials.

## Features

### Core Functionality
- **Deck Listing**: Display all user's decks in a responsive grid layout
- **Deck Creation**: Create new decks with title and optional description
- **Progress Tracking**: Visual progress indicators showing study completion
- **Zero State**: Welcoming experience for new users with no decks
- **AI Status Indicator**: Shows LLM configuration status at a glance

### User Experience
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Skeleton loaders and spinners for better UX
- **Optimistic Updates**: Immediate UI feedback on deck creation
- **Toast Notifications**: Success and error messages
- **Accessibility**: Keyboard navigation and screen reader support

## Architecture

This feature follows Clean Architecture principles with clear separation of concerns:

```
app/(protected)/dashboard/          # Framework Layer (Next.js)
├── components/
│   ├── atomic/                     # Basic UI elements
│   │   ├── ProgressBar.tsx
│   │   └── AIStatusIndicator.tsx
│   ├── molecule/                   # Composite components
│   │   ├── DeckCard.tsx
│   │   └── CreateDeckModal.tsx
│   └── organism/                   # Complex compositions
│       ├── DeckList.tsx
│       └── ZeroState.tsx
├── hooks/                          # Custom React hooks
│   ├── useDecks.ts
│   └── useAIStatus.ts
└── page.tsx                        # Dashboard page

context/
├── domain/
│   └── entities/
│       └── Deck.entity.ts          # Rich domain entity
├── application/
│   ├── dtos/
│   │   └── Deck.dto.ts            # Data transfer objects
│   ├── use-cases/
│   │   ├── CreateDeck.use-case.ts
│   │   └── GetUserDecks.use-case.ts
│   └── handlers/
│       ├── CreateDeck.handler.ts
│       └── GetUserDecks.handler.ts
└── infrastructure/
    └── repositories/
        ├── DeckRepository.interface.ts
        └── PrismaDeckRepository.ts

app/api/decks/
└── route.ts                        # API endpoints
```

## API Endpoints

### GET /api/decks
Returns all decks for the authenticated user.

**Response:**
```json
{
  "decks": [
    {
      "id": "uuid",
      "title": "Biology 101",
      "description": "Introductory biology flashcards",
      "tags": ["science", "biology"],
      "createdAt": "2026-01-13T10:30:00Z",
      "updatedAt": "2026-01-13T15:45:00Z",
      "cardCount": 45,
      "studiedCount": 30,
      "progress": 66.67
    }
  ],
  "total": 1
}
```

### POST /api/decks
Creates a new deck.

**Request:**
```json
{
  "title": "Spanish Vocabulary",
  "description": "Common Spanish phrases",
  "tags": ["language", "spanish"]
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Spanish Vocabulary",
  "description": "Common Spanish phrases",
  "tags": ["language", "spanish"],
  "createdAt": "2026-01-13T16:00:00Z",
  "updatedAt": "2026-01-13T16:00:00Z",
  "cardCount": 0,
  "studiedCount": 0,
  "progress": 0
}
```

## Database Schema

```prisma
model Deck {
  id          String   @id @default(uuid())
  userId      String
  title       String   @db.VarChar(100)
  description String?  @db.VarChar(500)
  tags        String[] @default([])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt])
  @@map("decks")
}
```

## Components

### DeckCard
Displays individual deck information with progress visualization.

**Props:**
- `id`: Deck identifier
- `title`: Deck title
- `description`: Optional description
- `tags`: Array of tags
- `createdAt`: Creation timestamp
- `cardCount`: Number of flashcards
- `progress`: Completion percentage (0-100)

### ProgressBar
Visual progress indicator with color coding.

**Color States:**
- Red (0-25%): Just started
- Yellow (26-75%): In progress
- Blue (76-99%): Almost complete
- Green (100%): Complete

### AIStatusIndicator
Shows AI provider configuration status.

**Status Types:**
- `configured`: Green checkmark - AI ready
- `warning`: Yellow alert - Configuration issue
- `not-configured`: Red X - Not configured

### CreateDeckModal
Modal dialog for creating new decks.

**Features:**
- Title validation (required, max 100 chars)
- Description field (optional, max 500 chars)
- Character counter
- Loading state
- Error handling

### ZeroState
Welcoming screen for users with no decks.

**Features:**
- Encouraging message
- Clear call-to-action
- Educational information about decks

## Usage

### Creating a Deck
1. Click "Create New Deck" button
2. Enter deck title (required)
3. Optionally add description
4. Click "Create Deck"
5. New deck appears at top of list

### Viewing Decks
1. Navigate to dashboard after login
2. All decks displayed in grid layout
3. View progress, card count, and creation date
4. Click any deck to view details

### Progress Tracking
- Progress calculated as: (studied cards / total cards) × 100
- Visual bar with percentage
- Color-coded for quick recognition
- Zero cards shows "No cards yet"

## Best Practices

### Component Organization
- **Atomic**: Single-purpose, reusable elements
- **Molecule**: Combinations of atoms
- **Organism**: Complex, business-logic components

### State Management
- Use custom hooks for data fetching
- Optimistic updates for better UX
- Local state for UI concerns
- Server state via API calls

### Error Handling
- Toast notifications for user feedback
- Inline error messages in forms
- Graceful degradation
- Retry mechanisms

### Performance
- Lazy loading components
- Optimized images
- Efficient re-renders
- Database query optimization

## Future Enhancements

### Planned Features
- Deck editing (title, description)
- Deck deletion with confirmation
- Bulk operations (select multiple decks)
- Search and filtering
- Sorting options (by title, date, progress)
- Deck templates
- Deck sharing
- Advanced analytics

### Technical Improvements
- Real-time updates via WebSockets
- Offline support with sync
- Pagination for large deck lists
- Virtual scrolling
- Caching strategies

## Testing

### Manual Testing Checklist
- [ ] Dashboard loads correctly
- [ ] Zero state displays for new users
- [ ] Create deck modal opens
- [ ] Deck creation validates title
- [ ] New deck appears immediately
- [ ] Progress bars display correctly
- [ ] AI status indicator updates
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader announces content

### Integration Testing
```bash
# Run tests (when implemented)
npm test

# E2E tests
npm run test:e2e
```

## Troubleshooting

### Decks not loading
1. Check API endpoint connectivity
2. Verify authentication token
3. Check browser console for errors
4. Ensure database is running

### Create deck fails
1. Verify title is not empty
2. Check title length (max 100 chars)
3. Ensure user is authenticated
4. Check API error response

### Progress not updating
1. Verify flashcard-deck relationship
2. Check progress calculation logic
3. Ensure database updates properly

## References

- [PRD: Deck Management Dashboard](/.product-lens/prd/features/deck-management-dashboard.md)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Last Updated:** 2026-01-13
**Version:** 1.0.0
