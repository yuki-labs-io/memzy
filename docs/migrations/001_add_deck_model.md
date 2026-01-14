# Database Migration: Add Deck Model

## Overview
This migration adds the `Deck` model to support the Deck Management Dashboard feature.

## Changes

### New Table: `decks`
Creates a new table to store user study decks.

**Columns:**
- `id` (UUID, Primary Key): Unique identifier
- `userId` (String, Foreign Key): References users.id
- `title` (VARCHAR(100), Not Null): Deck title
- `description` (VARCHAR(500), Nullable): Optional description
- `tags` (String[], Default []): Array of tags
- `createdAt` (Timestamp, Default now()): Creation timestamp
- `updatedAt` (Timestamp, Auto-updated): Last update timestamp

**Indexes:**
- `userId`: For efficient user deck queries
- `createdAt`: For ordering by creation date

**Relationships:**
- Belongs to `User` (CASCADE on delete)

### Modified Table: `users`
Adds relationship to decks.

**Changes:**
- Added `decks` relationship (one-to-many)

## Running the Migration

### Prerequisites
1. Ensure PostgreSQL is running
2. Database connection configured in `.env`
3. Prisma CLI installed

### Steps

#### 1. Generate Migration
```bash
npx prisma migrate dev --name add_deck_model
```

#### 2. Apply Migration
```bash
npx prisma migrate deploy
```

#### 3. Generate Prisma Client
```bash
npx prisma generate
```

### Verification

Check that the migration was successful:

```bash
# Connect to database
psql -U memzy -d memzy

# List tables
\dt

# Describe decks table
\d decks

# Check indexes
\di decks*
```

Expected output should show:
- `decks` table exists
- Indexes on `userId` and `createdAt`
- Foreign key constraint to `users`

## Rollback

If you need to rollback this migration:

```bash
# Reset to previous migration
npx prisma migrate reset
```

**Warning:** This will delete all data in the database.

For production, create a down migration:

```sql
-- Remove decks relationship from users
-- (Prisma handles this automatically)

-- Drop indexes
DROP INDEX IF EXISTS "decks_userId_idx";
DROP INDEX IF EXISTS "decks_createdAt_idx";

-- Drop table
DROP TABLE IF EXISTS "decks";
```

## Data Migration

If you have existing data that needs to be migrated:

### Example: Migrate from old structure
```sql
-- If you had flashcards without decks, create default decks
INSERT INTO decks (id, "userId", title, description, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  "userId",
  'My Flashcards',
  'Automatically created from existing flashcards',
  NOW(),
  NOW()
FROM users
WHERE NOT EXISTS (
  SELECT 1 FROM decks WHERE decks."userId" = users.id
);
```

## Testing

After running the migration:

### 1. Verify Schema
```bash
npx prisma validate
```

### 2. Test Deck Creation
```sql
-- Insert test deck
INSERT INTO decks (id, "userId", title, description, tags, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  '<user-id>',
  'Test Deck',
  'Testing deck creation',
  ARRAY['test'],
  NOW(),
  NOW()
);

-- Verify insertion
SELECT * FROM decks;

-- Clean up
DELETE FROM decks WHERE title = 'Test Deck';
```

### 3. Test Relationships
```sql
-- Query user with decks
SELECT u.email, COUNT(d.id) as deck_count
FROM users u
LEFT JOIN decks d ON u.id = d."userId"
GROUP BY u.id, u.email;

-- Test cascade delete
BEGIN;
  DELETE FROM users WHERE email = 'test@example.com';
  -- Verify decks were also deleted
  SELECT * FROM decks WHERE "userId" = '<deleted-user-id>';
ROLLBACK;
```

## Schema Definition

Complete Prisma schema for reference:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  llmConfig LLMConfiguration?
  decks     Deck[]

  @@map("users")
}

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

## Performance Considerations

### Indexes
- `userId`: Speeds up queries for user's decks
- `createdAt`: Enables efficient ordering by date

### Query Optimization
```sql
-- Efficient query for user decks (uses userId index)
SELECT * FROM decks WHERE "userId" = $1 ORDER BY "createdAt" DESC;

-- Avoid full table scans
EXPLAIN SELECT * FROM decks WHERE "userId" = $1;
```

### Future Optimization
Consider adding these indexes if needed:
- `title` for text search
- `tags` for tag filtering (GIN index for arrays)

## Troubleshooting

### Migration fails with "relation already exists"
```bash
# Drop the table manually
psql -U memzy -d memzy -c "DROP TABLE IF EXISTS decks CASCADE;"

# Re-run migration
npx prisma migrate dev
```

### Foreign key constraint violation
Ensure all `userId` values in decks reference existing users:
```sql
-- Find orphaned decks
SELECT * FROM decks 
WHERE "userId" NOT IN (SELECT id FROM users);

-- Delete orphaned decks
DELETE FROM decks 
WHERE "userId" NOT IN (SELECT id FROM users);
```

### Prisma Client out of sync
```bash
# Regenerate Prisma Client
rm -rf node_modules/.prisma
npx prisma generate
```

## Security Considerations

1. **Row-Level Security**: Ensure users can only access their own decks
2. **Input Validation**: Title and description have length constraints
3. **Cascade Delete**: User deletion removes all their decks
4. **Index on userId**: Prevents accidental full table scans

## Related Documentation

- [Prisma Schema Documentation](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [PostgreSQL Array Types](https://www.postgresql.org/docs/current/arrays.html)
- [Deck Management Dashboard Feature](../features/DECK_MANAGEMENT_DASHBOARD.md)

---

**Migration Date:** 2026-01-13
**Version:** 1.0.0
