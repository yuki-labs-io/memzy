# PRD: Deck Management & Dashboard

**Feature Name:** deck-management-dashboard  
**Created:** 2026-01-13  
**Status:** Draft  
**Source Issue:** [Requirement] deck-management-dashboard

---

## 1. Context & Problem

### Current State
The application enables users to create flashcards from various content sources (PDFs, videos, images) using AI-powered generation. However, there is currently no central interface for users to manage their study materials. Flashcards need to be organized into logical units (decks), and users require a way to track their progress and access their study materials efficiently.

### Problem
- **No Central Hub:** Users lack a "home" or entry point to view and manage their study materials
- **Organization Gap:** Flashcards cannot be grouped into meaningful collections (decks)
- **Progress Invisibility:** Users cannot see their study progress across different topics or subjects
- **AI Status Uncertainty:** Users don't know if their AI provider is properly configured without navigating to settings
- **Poor First Experience:** New users without any decks have no clear path to get started
- **Navigation Difficulty:** Users cannot quickly access or switch between different study topics

### Why This Matters
The Dashboard serves as the product's "home" and first impression. Without it:
- Users feel lost and don't understand how to organize their study materials
- Study progress is invisible, reducing motivation and engagement
- New users face a blank screen with no guidance on next steps
- Users waste time navigating to settings to check AI configuration
- The product lacks structure, appearing as disconnected features rather than a cohesive learning system

A well-designed dashboard transforms the product from a collection of features into an organized, progress-driven study environment that encourages consistent use and engagement.

---

## 2. Objective

### Goal
Build a central dashboard interface that enables users to:
- Create, view, and access their study decks
- Quickly understand study progress across all decks
- Know at a glance whether their AI provider is configured
- Experience a welcoming, action-oriented interface when starting fresh
- Navigate efficiently to study sessions or deck management

### What Will Change
- Users will land on a dashboard after login, showing all their decks
- Each deck will display visual progress indicators
- A prominent "Create New Deck" button will be immediately accessible
- AI connection status will be visible without additional navigation
- New users will see an encouraging zero-state with clear next steps
- Users can click on any deck to access its flashcards and study sessions
- The dashboard becomes the product's primary navigation hub

### Strategic Alignment
This feature aligns with the product strategy to:
- **Establish Foundation:** Create the core organizational structure for study materials
- **Improve User Experience:** Provide intuitive navigation and clear product structure
- **Increase Engagement:** Visual progress tracking motivates continued use
- **Reduce Friction:** Eliminate confusion about next steps or AI configuration
- **Enable Growth:** Dashboard structure supports future features (analytics, sharing, recommendations)

---

## 3. Scope (In Scope)

### Included
- **Dashboard View:** Central page displaying all user decks in a grid or list layout
- **Deck Display:** Each deck shows:
  - Title
  - Creation date
  - Progress indicator (percentage or visual bar)
  - Optional tags (prepared for future, not required in MVP)
- **Create Deck Action:** Primary CTA button to create new decks
- **AI Status Indicator:** Visual indicator showing AI provider connection status:
  - Green/checkmark: AI configured and working
  - Yellow/warning: AI configuration issue
  - Red/error: AI not configured
- **Zero State Experience:** 
  - Welcoming message for users with no decks
  - Action-oriented guidance ("Get started by creating your first deck")
  - Prominent "Create New Deck" CTA
- **Deck Navigation:** Clicking a deck navigates to deck details/flashcards view
- **Basic Persistence:** Decks stored in database with user association
- **Responsive Design:** Dashboard works on desktop and mobile devices

### Key Deliverables
- Dashboard page component at primary route (likely `/dashboard` or `/`)
- Deck list/grid rendering component
- Individual deck card component with progress visualization
- Create deck button and modal/form
- AI status indicator component
- Zero-state view component
- Backend API endpoints for deck CRUD operations
- Database schema for Deck model
- Integration with existing AI provider configuration status

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Deck Sharing:** Ability to share decks with other users or make public
- **Advanced Organization:** Folders, nested structures, or hierarchical organization
- **Full-Text Search:** Search across deck titles or flashcard content
- **Deck Templates:** Pre-made deck templates or suggested structures
- **Deck Analytics:** Detailed statistics beyond basic progress
- **Batch Operations:** Selecting multiple decks for bulk actions
- **Deck Import/Export:** Importing decks from other platforms or exporting to files
- **Deck Sorting/Filtering:** Advanced sorting options or filters by tag, date, progress
- **Collaborative Features:** Multiple users working on same deck
- **Deck Archiving:** Soft delete or archive functionality
- **Activity Feed:** History of recent actions across decks
- **Study Reminders:** Notifications or reminders to study specific decks

### Intentional Limitations
This is a foundational MVP focused on establishing basic deck management and dashboard visibility. Advanced features like organization tools, sharing, and detailed analytics are explicitly deferred to future iterations based on user feedback and usage patterns.

---

## 5. Personas & Users

### Primary Persona: Student Learner
- **Profile:** High school or college student studying multiple subjects
- **Needs:** Organized study materials, clear progress tracking, motivation
- **Pain Points:** Overwhelmed by unorganized notes, unclear what to study next
- **Technical Proficiency:** Basic to intermediate; comfortable with web applications
- **Goal:** Maintain organized study materials for multiple subjects and track preparation progress
- **Usage Pattern:** Daily study sessions, creating decks per subject or exam
- **Success Metric:** Can easily switch between different subject decks

### Secondary Persona: Self-Directed Learner
- **Profile:** Professional learning new skills or languages independently
- **Needs:** Clear progress indicators, flexible organization, self-paced learning
- **Pain Points:** Difficulty maintaining consistent learning routine
- **Technical Proficiency:** Intermediate; expects modern UX patterns
- **Goal:** Track learning progress and maintain motivation through visible achievement
- **Usage Pattern:** Regular but less frequent sessions (2-3 times per week)
- **Success Metric:** Progress visualization encourages continued learning

### Tertiary Persona: Exam Preparation User
- **Profile:** Student preparing for specific certification or standardized test
- **Needs:** Focused deck per exam section, clear completion status
- **Pain Points:** Need to know exactly what has been studied and what remains
- **Technical Proficiency:** Basic; focused on studying, not technology
- **Goal:** Complete all material with confidence before exam date
- **Usage Pattern:** Intensive study periods with clear beginning and end
- **Success Metric:** Clear visibility of completion percentage per deck

### Anti-Persona: Casual Browser
- **Profile:** User exploring without commitment or study goals
- **Challenge:** May create decks but not engage consistently
- **Note:** Dashboard should still provide value in zero-state to convert browsers into engaged users

---

## 6. Main Flow (User Journey)

### Happy Path: Existing User with Decks

1. **Entry Point:** User logs into the application
2. **Dashboard Load:** System displays dashboard with all user's decks
3. **Deck Overview:** User sees grid/list of decks with titles and progress
4. **Progress Assessment:** User quickly identifies which decks need attention
5. **AI Status Check:** User glances at AI status indicator (green = ready)
6. **Deck Selection:** User clicks on a deck they want to study
7. **Navigation:** System navigates to deck detail view with flashcards
8. **Exit Point:** User begins study session

### Alternative Flow: New User (Zero State)

1. **Entry Point:** New user logs in for the first time
2. **Zero State Display:** Dashboard shows welcoming empty state message
3. **Guidance Reading:** User sees message: "Welcome! Get started by creating your first study deck."
4. **AI Status Awareness:** AI status indicator shows configuration needed (yellow/red)
5. **CTA Visibility:** Large "Create New Deck" button is prominently displayed
6. **Decision:** User clicks "Create New Deck"
7. **Deck Creation:** Modal or form appears for deck details
8. **First Deck Created:** User enters title, confirms creation
9. **Dashboard Update:** New deck appears on dashboard with 0% progress
10. **Next Steps:** User can now add flashcards to the deck
11. **Exit Point:** User proceeds to add content to their first deck

### Alternative Flow: Creating Additional Deck

1. **Entry Point:** User on dashboard with existing decks
2. **New Deck Intent:** User wants to organize new study material
3. **CTA Click:** User clicks "Create New Deck" button
4. **Form Display:** Deck creation form appears
5. **Details Entry:** User enters deck title (required), optional description
6. **Optional Tags:** User may add tags (if implemented in MVP)
7. **Validation:** System validates required fields
8. **Creation Confirmation:** User clicks "Create" button
9. **Deck Added:** New deck appears on dashboard with other decks
10. **Success Feedback:** Brief success message confirms creation
11. **Exit Point:** User can navigate to new deck or stay on dashboard

### Alternative Flow: AI Configuration Issue

1. **Entry Point:** User logs in
2. **Dashboard Load:** Dashboard displays with decks
3. **AI Status Warning:** AI indicator shows yellow/red (misconfigured or not configured)
4. **User Notice:** User sees the warning indicator
5. **Status Click:** User clicks on AI status indicator
6. **Navigation:** System navigates to Settings → AI Configuration
7. **Configuration Fix:** User configures or fixes AI provider settings
8. **Return:** User returns to dashboard
9. **Status Update:** AI indicator now shows green (configured)
10. **Exit Point:** User can now generate flashcards with AI

### Alternative Flow: No Decks After Deletion

1. **Entry Point:** User deletes their last deck
2. **Dashboard Update:** Dashboard transitions to zero-state
3. **Zero State Display:** Welcoming message appears
4. **User Experience:** Same as new user zero-state
5. **Recovery Path:** Clear CTA to create new deck
6. **Exit Point:** User can rebuild their deck collection

---

## 7. Business Rules

### BR-1: Dashboard as Default Landing
- Authenticated users land on the dashboard after login
- Dashboard is the primary navigation hub of the application
- Dashboard route should be `/` or `/dashboard`

### BR-2: Deck Ownership
- Each deck is owned by exactly one user
- Users can only view and manage their own decks
- Deck creation requires authenticated user session
- Deck access must verify user ownership

### BR-3: Deck Title Requirement
- Every deck must have a non-empty title
- Title must be at least 1 character, maximum 100 characters
- Title should be trimmed of leading/trailing whitespace
- Duplicate titles are allowed (different decks can have same name)

### BR-4: Progress Calculation
- Progress is calculated as: (cards studied / total cards) × 100
- Decks with 0 cards show 0% progress
- Progress updates when cards are marked as studied
- Progress is displayed as percentage or visual bar

### BR-5: Deck Display Order
- Decks displayed in reverse chronological order (newest first) by default
- Order may be configurable in future, but not required for MVP
- Consistent ordering across page refreshes

### BR-6: AI Status Determination
- AI status reflects current user's LLM configuration
- Green: Valid LLM provider configured and tested
- Yellow/Warning: Configuration exists but may have issues
- Red/Not configured: No LLM configuration present
- Status checked on dashboard load, not real-time

### BR-7: Zero State Trigger
- Zero state displays when user has exactly 0 decks
- Zero state replaces deck list, not shown alongside
- Zero state persists until first deck is created
- Zero state shows same AI status indicator

### BR-8: Deck Creation Validation
- Title is required for deck creation
- Empty or whitespace-only titles rejected
- Creation fails gracefully with clear error message
- Successful creation immediately adds deck to dashboard

### BR-9: Minimum Information Display
- Each deck card must show at least: title, creation date, progress
- Tags are optional and may be hidden if not supported
- Consistent card layout across all decks

---

## 8. Functional Requirements (FR-x)

### FR-1: Dashboard Page Access (Must-Have)
**User Story:** As a user, I want to land on a dashboard after login, so that I can immediately see my study materials.

**Acceptance Criteria:**
- Dashboard route is accessible at `/` or `/dashboard`
- Authenticated users automatically navigate to dashboard after login
- Page loads within 2 seconds under normal conditions
- Dashboard is clearly identifiable as the main hub
- Navigation menu indicates dashboard as active/current page

### FR-2: Deck List Display (Must-Have)
**User Story:** As a user, I want to see all my decks in one place, so that I can choose what to study.

**Acceptance Criteria:**
- All user-owned decks displayed in grid or list layout
- Layout is responsive (grid on desktop, list on mobile acceptable)
- Each deck shows as distinct card or item
- Decks ordered by creation date (newest first)
- Smooth loading without janky layout shifts
- Reasonable performance with up to 100 decks

### FR-3: Deck Card Information (Must-Have)
**User Story:** As a user, I want to see key information about each deck, so that I can quickly understand my progress.

**Acceptance Criteria:**
- Each deck card displays:
  - Deck title (prominently)
  - Creation date (formatted as "Created on Jan 13, 2026" or relative like "3 days ago")
  - Progress indicator (percentage or visual bar)
  - Number of flashcards in deck (optional but recommended)
- Information is clearly readable and well-organized
- Consistent styling across all deck cards
- Progress visualization is intuitive (bar/circle/percentage)

### FR-4: Progress Visualization (Must-Have)
**User Story:** As a user, I want to quickly understand my progress on each deck, so that I know what needs attention.

**Acceptance Criteria:**
- Progress displayed as percentage (e.g., "75%") or visual indicator
- Visual options: progress bar, circular progress, or both
- 0% progress clearly distinguished from incomplete loading
- 100% progress visually celebrated (different color, checkmark icon)
- Progress calculation: (studied cards / total cards) × 100
- Real-time accuracy (reflects current study state)

### FR-5: Create New Deck Button (Must-Have)
**User Story:** As a user, I want to create a new deck in one click, so that I can quickly organize new study material.

**Acceptance Criteria:**
- "Create New Deck" button prominently displayed
- Button visible in both deck list and zero-state views
- Button uses primary action styling (high contrast, clear CTA)
- Button positioned consistently (top-right or center recommended)
- Single click opens deck creation interface
- Button has clear icon (plus sign recommended) and text label

### FR-6: Deck Creation Interface (Must-Have)
**User Story:** As a user, I want to enter basic information when creating a deck, so that I can organize my study materials.

**Acceptance Criteria:**
- Modal or dedicated form for deck creation
- Required field: Deck title (text input)
- Optional field: Description (textarea)
- Optional field: Tags (if MVP supports)
- Form validation prevents empty title submission
- Character limits enforced (title: 100 chars, description: 500 chars)
- "Create" and "Cancel" buttons clearly visible
- Cancel closes form without creating deck
- Create button disabled until valid title entered

### FR-7: Deck Creation Confirmation (Must-Have)
**User Story:** As a user, I want confirmation when I create a deck, so that I know it succeeded.

**Acceptance Criteria:**
- New deck appears immediately on dashboard after creation
- Brief success message displayed ("Deck created successfully")
- Success message auto-dismisses after 3 seconds
- No page refresh required (optimistic UI update)
- New deck appears at top of deck list (newest first)
- User can immediately interact with new deck

### FR-8: AI Status Indicator (Must-Have)
**User Story:** As a user, I want to know if my AI provider is correctly configured, so that I don't encounter errors when generating flashcards.

**Acceptance Criteria:**
- AI status indicator visible on dashboard at all times
- Indicator shows configuration state:
  - Green/checkmark: Configured and validated
  - Yellow/warning: Configuration issue detected
  - Red/X: Not configured
- Indicator positioned consistently (top-right or header recommended)
- Tooltip or label explains status on hover
- Clicking indicator navigates to AI configuration page
- Status refreshed on dashboard load

### FR-9: AI Status Details (Should-Have)
**User Story:** As a user, I want to understand what the AI status means, so that I can take action if needed.

**Acceptance Criteria:**
- Hovering over status shows tooltip with explanation
- Green: "AI ready - [Provider] configured"
- Yellow: "AI configuration needs attention"
- Red: "AI not configured - click to set up"
- Tooltip provides context without requiring click
- Mobile: tap shows status details

### FR-10: Zero State Display (Must-Have)
**User Story:** As a new user, I want clear guidance when I have no decks, so that I know what to do next.

**Acceptance Criteria:**
- Zero state displays when user has 0 decks
- Zero state includes:
  - Welcome message or encouraging headline
  - Brief explanation of deck purpose
  - Large "Create New Deck" CTA button
  - Optional: illustration or icon
- Message is action-oriented, not negative
- Example: "Welcome! Create your first deck to start studying"
- Zero state visually distinct from loading state
- AI status indicator still visible in zero state

### FR-11: Deck Navigation (Must-Have)
**User Story:** As a user, I want to click on a deck to access it, so that I can study its flashcards.

**Acceptance Criteria:**
- Entire deck card is clickable (or has clear "Open" button)
- Clicking navigates to deck detail/flashcards view
- Click target is large enough for easy interaction
- Hover state indicates card is clickable
- Navigation is immediate (<500ms)
- Deck detail page receives deck ID for loading

### FR-12: Deck Persistence (Must-Have)
**User Story:** As a system, I need to persist decks in the database, so that users' study materials are saved.

**Acceptance Criteria:**
- Decks stored in database with proper schema
- Each deck includes: ID, user_id, title, description, created_at, updated_at
- User-deck relationship enforced (foreign key or equivalent)
- Decks survive server restarts and sessions
- Database operations handle errors gracefully
- Proper indexing on user_id for query performance

### FR-13: Deck Data Model (Must-Have)
**User Story:** As a system, I need a Deck data model, so that deck information is structured consistently.

**Acceptance Criteria:**
- Deck model defined with fields:
  - id: unique identifier
  - userId: owner reference
  - title: string (required, max 100 chars)
  - description: text (optional, max 500 chars)
  - tags: array or relation (optional)
  - createdAt: timestamp
  - updatedAt: timestamp
- Model includes validation rules
- Model handles CRUD operations (Create, Read, Update, Delete)
- Relationships defined (User has many Decks)

### FR-14: Dashboard API Endpoints (Must-Have)
**User Story:** As a system, I need API endpoints for deck operations, so that the frontend can interact with decks.

**Acceptance Criteria:**
- `GET /api/decks` - Returns all decks for authenticated user
- `POST /api/decks` - Creates new deck with provided data
- Response includes created deck with ID and timestamps
- Endpoints validate user authentication
- Endpoints return appropriate status codes (200, 201, 401, 400, 500)
- Error responses include actionable messages

### FR-15: Dashboard Loading State (Should-Have)
**User Story:** As a user, I want to see a loading indicator while my decks load, so that I know the app is working.

**Acceptance Criteria:**
- Loading skeleton or spinner displayed while fetching decks
- Loading state prevents layout shift
- Loading duration typically <1 second
- Loading state differs visually from zero-state
- If loading exceeds 5 seconds, show helpful message

### FR-16: Responsive Design (Must-Have)
**User Story:** As a user, I want the dashboard to work on my mobile device, so that I can access my decks anywhere.

**Acceptance Criteria:**
- Dashboard functional on screens 320px width and above
- Deck cards stack vertically on mobile (< 768px)
- Deck cards display in grid on tablet/desktop (≥ 768px)
- Create button accessible on mobile (not hidden off-screen)
- Touch targets minimum 44x44 points on mobile
- Text remains readable at all screen sizes
- No horizontal scrolling on any device

### FR-17: Error Handling (Should-Have)
**User Story:** As a user, I want clear error messages if something goes wrong, so that I understand what happened.

**Acceptance Criteria:**
- Deck creation failure shows specific error message
- Network errors display user-friendly message
- Database errors handled gracefully
- Error messages provide actionable guidance
- Errors don't expose sensitive system details
- Users can retry failed actions
- Critical errors don't crash the dashboard

### FR-18: Tags Support (Nice-to-Have)
**User Story:** As a user, I want to add tags to my decks, so that I can categorize them.

**Acceptance Criteria:**
- Deck creation form includes optional tag input
- Tags displayed on deck cards (if present)
- Tags stored in database (array or separate table)
- Visual tag indicators (chips/badges)
- Maximum 5 tags per deck recommended
- Tag input has basic validation (no empty tags)

**Note:** Tags are prepared infrastructure for future filtering/organization features, but not required for MVP launch.

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Performance
- **Dashboard Load Time:** Complete page render within 2 seconds on average connection
- **Deck List Query:** Database query for user's decks completes within 500ms
- **Deck Creation:** New deck creation completes within 1 second
- **Progress Calculation:** Progress for all decks calculated within 1 second
- **Navigation:** Deck click to detail page navigation within 500ms
- **Scalability:** Dashboard performs well with up to 100 decks per user
- **Optimistic UI:** Deck creation shows immediately before server confirmation

### NFR-2: Usability
- **Intuitive Layout:** First-time users understand dashboard purpose without training
- **Clear Hierarchy:** Visual hierarchy guides eye from status to CTA to decks
- **Action Clarity:** "Create New Deck" button immediately obvious
- **Progress Understanding:** Progress visualization intuitively understood
- **Mobile Usability:** Full functionality on touch devices
- **Consistent Navigation:** Deck interaction patterns match common UX conventions
- **Empty State Quality:** Zero state encourages action, not discouragement

### NFR-3: Accessibility
- **WCAG 2.1 Level AA:** Dashboard meets accessibility standards
- **Keyboard Navigation:** All functionality accessible via keyboard
- **Screen Reader Support:** Deck cards properly announced with all information
- **Focus Indicators:** Clear focus states on all interactive elements
- **Color Contrast:** Minimum 4.5:1 contrast ratio for text
- **Alternative Text:** All icons and images have appropriate alt text
- **ARIA Labels:** Proper ARIA attributes for dynamic content

### NFR-4: Reliability
- **Data Consistency:** Deck list always reflects current database state
- **Error Recovery:** Dashboard doesn't break on failed deck operations
- **Graceful Degradation:** Core functionality works if optional features fail
- **Transaction Safety:** Deck creation is atomic (all or nothing)
- **State Management:** Dashboard state remains consistent across operations

### NFR-5: Security
- **Authentication Required:** Dashboard only accessible to authenticated users
- **Authorization:** Users can only see/modify their own decks
- **Input Validation:** All deck inputs sanitized against XSS/injection
- **API Security:** Backend endpoints validate user ownership
- **Session Management:** Dashboard respects session timeout and re-authentication

### NFR-6: Maintainability
- **Component Architecture:** Dashboard built with reusable components
- **Code Organization:** Clear separation of concerns (UI, logic, data)
- **Type Safety:** Strong typing for deck model and API responses (TypeScript)
- **Testing:** Unit tests for components, integration tests for API
- **Documentation:** Code comments explain complex logic

### NFR-7: Scalability
- **Database Performance:** Proper indexing on user_id and created_at
- **Query Optimization:** Efficient queries for deck lists
- **Caching Strategy:** Consider caching user deck counts
- **Pagination Ready:** Architecture supports future pagination if needed
- **Concurrent Users:** Dashboard supports 1000+ simultaneous users

### NFR-8: Visual Design
- **Consistent Styling:** Dashboard follows application design system
- **Modern Aesthetics:** Clean, contemporary visual design
- **Progress Visualization:** Intuitive and visually appealing progress indicators
- **Brand Alignment:** Colors and typography match brand guidelines
- **Spacing:** Adequate whitespace prevents cluttered appearance

### NFR-9: Browser Compatibility
- **Modern Browsers:** Full support for Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers:** iOS Safari and Android Chrome support
- **Progressive Enhancement:** Core functionality works without JavaScript (where possible)

### NFR-10: Observability
- **Analytics Tracking:** Track dashboard visits, deck creations, deck clicks
- **Error Logging:** Log frontend and backend errors with context
- **Performance Monitoring:** Track page load times and API response times
- **Usage Metrics:** Monitor zero-state conversion rate

---

## 10. Metrics & Success Criteria

### Primary Metrics

#### M-1: Dashboard Engagement Rate
- **Definition:** Percentage of users who interact with dashboard within first session
- **Target:** ≥ 90% of logged-in users view dashboard
- **Measurement:** (Users viewing dashboard / Total logged-in users) × 100
- **Collection:** Analytics tracking on dashboard page views
- **Importance:** Validates dashboard as effective entry point

#### M-2: Deck Creation Rate
- **Definition:** Percentage of users who create at least one deck
- **Target:** ≥ 70% of new users create deck within first week
- **Measurement:** (Users with ≥1 deck / Total users) × 100
- **Collection:** Database query of user-deck relationships
- **Importance:** Indicates users understand and adopt core feature

#### M-3: Zero State Conversion
- **Definition:** Percentage of zero-state views that result in deck creation
- **Target:** ≥ 60% conversion from zero-state to first deck
- **Measurement:** (First deck creations / Zero-state displays) × 100
- **Collection:** Analytics tracking on zero-state display and deck creation events
- **Importance:** Measures effectiveness of zero-state guidance

#### M-4: Time to First Deck
- **Definition:** Median time from account creation to first deck creation
- **Target:** ≤ 5 minutes for users who create decks
- **Measurement:** Track timestamps from user registration to first deck creation
- **Collection:** Database timestamps, calculated in analytics
- **Importance:** Indicates friction level in getting started

### Secondary Metrics

#### M-5: Dashboard Return Rate
- **Definition:** Percentage of users who return to dashboard multiple times
- **Target:** ≥ 80% return within 7 days
- **Measurement:** (Users with >1 dashboard visit / Total users) × 100
- **Collection:** Analytics session tracking
- **Importance:** Indicates dashboard utility and product engagement

#### M-6: Average Decks per User
- **Definition:** Mean number of decks created per active user
- **Target:** ≥ 3 decks per user within first month
- **Measurement:** Total decks / Total users with ≥1 deck
- **Collection:** Database aggregation
- **Importance:** Shows users organizing multiple study topics

#### M-7: Deck Interaction Rate
- **Definition:** Percentage of deck cards clicked from dashboard
- **Target:** ≥ 50% of decks clicked within 7 days of creation
- **Measurement:** (Decks clicked / Total decks) × 100
- **Collection:** Analytics on deck card click events
- **Importance:** Validates users return to study created decks

#### M-8: AI Status Click-Through Rate
- **Definition:** Percentage of users who click AI status indicator
- **Target:** 100% of users with red/yellow status click within first session
- **Measurement:** (Status indicator clicks / Users with unconfigured AI) × 100
- **Collection:** Analytics on AI status indicator clicks
- **Importance:** Validates indicator effectively communicates need for action

#### M-9: Dashboard Load Performance
- **Definition:** 95th percentile dashboard load time
- **Target:** ≤ 2 seconds on average connection
- **Measurement:** Client-side performance timing API
- **Collection:** Real User Monitoring (RUM) or similar
- **Importance:** Ensures responsive, professional user experience

#### M-10: Mobile Usage Percentage
- **Definition:** Percentage of dashboard views on mobile devices
- **Target:** No specific target; informational
- **Measurement:** Count views by device type
- **Collection:** User agent analysis in analytics
- **Importance:** Informs mobile optimization priorities

### Long-term Success Indicators

- **Retention:** Users with decks show higher 30-day retention
- **Engagement:** Dashboard visits correlate with study session frequency
- **Adoption:** Steady growth in average decks per user over time
- **Satisfaction:** User feedback indicates dashboard is helpful and clear

---

## 11. Risks & Dependencies

### High-Priority Risks

#### R-1: Unclear Value Proposition in Zero State
- **Risk:** New users don't understand purpose of decks or see value in creating them
- **Impact:** High - Low conversion from zero-state, poor onboarding
- **Probability:** Medium
- **Mitigation:**
  - User testing of zero-state messaging with target personas
  - A/B test different zero-state copy and CTAs
  - Include brief example or illustration of deck concept
  - Provide quick "What is a deck?" tooltip or help link
  - Consider brief onboarding tour on first dashboard visit

#### R-2: Progress Calculation Performance
- **Risk:** Calculating progress for many decks with many cards causes slow load times
- **Impact:** Medium - Poor user experience, dashboard feels sluggish
- **Probability:** Medium
- **Mitigation:**
  - Pre-calculate and cache progress on card study events
  - Store progress percentage in deck record, update incrementally
  - Implement database-level aggregations
  - Consider lazy loading progress for below-the-fold decks
  - Monitor performance metrics and optimize queries

#### R-3: Empty Progress Demotivation
- **Risk:** Seeing 0% progress on multiple decks discourages users
- **Impact:** Medium - Reduced engagement and motivation
- **Probability:** Medium-High
- **Mitigation:**
  - Use encouraging messaging for new decks ("Ready to start!")
  - Emphasize creation date ("Started 2 days ago") over empty progress
  - Provide quick "Add flashcards" action on 0% decks
  - Consider "First study" badge or encouragement on 0% decks
  - Focus on card count alongside progress

### Medium-Priority Risks

#### R-4: Database Schema Changes
- **Risk:** Deck model needs modification after launch, requiring migration
- **Impact:** Medium - Development time for migrations, potential data issues
- **Probability:** Medium
- **Mitigation:**
  - Thoroughly design schema before implementation
  - Include flexible fields (JSON, metadata) for future extensibility
  - Test migrations in development environment
  - Plan backward-compatible changes
  - Document schema and relationships clearly

#### R-5: Inconsistent AI Status
- **Risk:** AI status indicator doesn't accurately reflect current configuration state
- **Impact:** Medium - User confusion, incorrect assumptions about capabilities
- **Probability:** Medium
- **Mitigation:**
  - Real-time check of AI configuration on dashboard load
  - Cache status briefly (30 seconds) to avoid excessive checks
  - Implement configuration change webhooks/events to update status
  - Provide "Refresh status" option if user suspects inconsistency
  - Clear logging of status determination logic

#### R-6: Mobile Layout Challenges
- **Risk:** Deck cards don't display well on small mobile screens
- **Impact:** Medium - Poor mobile experience, reduced mobile adoption
- **Probability:** Low-Medium
- **Mitigation:**
  - Mobile-first design approach
  - Test on variety of device sizes (320px to 428px width)
  - Use responsive design patterns (stack on mobile, grid on desktop)
  - Adequate touch targets and spacing
  - Test with actual devices, not just browser resize

### Low-Priority Risks

#### R-7: Over-Engineering for Future Features
- **Risk:** Building unnecessary flexibility for features not yet planned
- **Impact:** Low - Wasted development time, added complexity
- **Probability:** Medium
- **Mitigation:**
  - Focus on MVP requirements only
  - Use YAGNI principle (You Aren't Gonna Need It)
  - Add flexibility only for confirmed upcoming features
  - Iterate based on actual needs, not speculation
  - Keep implementation simple and clean

#### R-8: Deck Title Ambiguity
- **Risk:** Users create decks with unclear or duplicate titles, causing confusion
- **Impact:** Low - User-created problem, doesn't affect functionality
- **Probability:** Low
- **Mitigation:**
  - Provide title guidelines or examples during creation
  - Consider optional "last edited" date for disambiguation
  - Future: Allow deck editing to rename if needed
  - Not critical for MVP; address if becomes common issue

### Dependencies

#### D-1: User Authentication System (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Must exist before dashboard
- **Requirements:**
  - User registration and login
  - Session management
  - User ID for deck ownership
- **Owner:** Authentication Team
- **Timeline:** Must be complete before dashboard development
- **Mitigation:** Dashboard development blocked until auth is ready

#### D-2: Database Infrastructure (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Must exist before dashboard
- **Requirements:**
  - PostgreSQL or similar relational database
  - ORM or database client (Prisma based on package.json)
  - Database migration system
- **Owner:** Backend Team, DevOps
- **Timeline:** Must be available for deck model creation
- **Mitigation:** Confirm database stack and migration process early

#### D-3: AI Provider Configuration System (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Must exist for AI status indicator
- **Requirements:**
  - LLM configuration storage and retrieval
  - Configuration validation status
  - API endpoint to check user's AI status
- **Owner:** AI Configuration Team
- **Source:** See PRD: ai-provider-configuration.md
- **Timeline:** Must be complete or mockable for AI status indicator
- **Mitigation:** Can implement dashboard without AI indicator initially, add later

#### D-4: Flashcard Model (Internal - Medium)
- **Type:** Internal Dependency
- **Status:** Needed for progress calculation
- **Requirements:**
  - Flashcard data model with deck association
  - Study status tracking (studied/not studied)
  - Relationship: Deck has many Flashcards
- **Owner:** Flashcard Feature Team
- **Timeline:** Can launch dashboard with 0% progress if flashcards not ready
- **Mitigation:** Show card count only, implement progress when flashcards ready

#### D-5: UI Component Library (Internal - Medium)
- **Type:** Internal Dependency
- **Status:** Should exist or be defined
- **Requirements:**
  - Button components
  - Card/panel components
  - Modal/dialog components
  - Progress indicators (bar, circle)
  - Icon library
- **Owner:** Frontend Team, Design System
- **Note:** Based on package.json, project uses Radix UI and Tailwind CSS
- **Mitigation:** Use existing components; create custom if needed

#### D-6: Routing System (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Must exist for navigation
- **Requirements:**
  - Route definition for dashboard
  - Route protection (authenticated only)
  - Navigation to deck detail pages
  - Client-side routing (Next.js based on package.json)
- **Owner:** Frontend Team
- **Note:** Next.js provides routing out of the box
- **Mitigation:** Standard Next.js routes should suffice

---

## 12. Open Questions

### Technical Questions

#### Q-1: Dashboard Route Path
- **Question:** Should dashboard be at root path `/` or `/dashboard`?
- **Context:** Root path more intuitive but may conflict with marketing site
- **Impact:** URL structure and routing configuration
- **Stakeholders:** Frontend Team, Product Team
- **Status:** **Needs decision** - Recommend `/` for authenticated users, redirect unauthenticated to landing

#### Q-2: Progress Calculation Storage
- **Question:** Should progress be calculated on-demand or pre-calculated and stored?
- **Options:**
  - On-demand: Calculate when dashboard loads
  - Pre-calculated: Update progress field when cards studied
- **Impact:** Performance vs. complexity trade-off
- **Status:** **Needs decision** - Recommend pre-calculated for better performance

#### Q-3: Deck Soft Delete
- **Question:** Should deleted decks be soft-deleted or hard-deleted?
- **Context:** Soft delete allows recovery but adds complexity
- **Impact:** Data model and deletion implementation
- **Status:** **Deferred** - Not required for MVP; hard delete acceptable initially

#### Q-4: API Response Format
- **Question:** What should deck API response structure be?
- **Context:** Affects frontend parsing and display
- **Example:**
  ```json
  {
    "decks": [
      {
        "id": "uuid",
        "title": "Biology 101",
        "createdAt": "2026-01-13T12:00:00Z",
        "cardCount": 45,
        "studiedCount": 30,
        "progress": 66.67
      }
    ]
  }
  ```
- **Status:** **Needs design** - Should include progress pre-calculated

### Product Questions

#### Q-5: Tags in MVP
- **Question:** Should tags be fully implemented in MVP or prepared for future?
- **Context:** Tags mentioned as optional but adds UI and backend work
- **Impact:** Development scope and timeline
- **Status:** **Needs decision** - Recommend database field only, no UI in MVP

#### Q-6: Deck Description Visibility
- **Question:** Should deck descriptions display on dashboard or only in deck details?
- **Context:** Dashboard space is limited
- **Impact:** Deck card design and information density
- **Status:** **Needs UX decision** - Recommend description on hover/tooltip only

#### Q-7: Maximum Decks per User
- **Question:** Should there be a limit on number of decks per user?
- **Context:** Performance and abuse prevention
- **Impact:** Business rules and validation
- **Status:** **Needs decision** - Recommend no hard limit for MVP, monitor usage

#### Q-8: Deck Ordering Options
- **Question:** Should users be able to sort/order their deck list?
- **Context:** Out of scope for MVP but affects architecture
- **Impact:** API design and state management
- **Status:** **Deferred** - Implement default ordering, add sorting in future

### UX Questions

#### Q-9: Deck Card Action Menu
- **Question:** Should deck cards have action menu (edit, delete, etc.)?
- **Context:** Not required in MVP but common pattern
- **Impact:** Card design complexity
- **Status:** **Deferred** - Implement deck actions in deck detail view for MVP

#### Q-10: Zero State Animation
- **Question:** Should zero state include animation or illustration?
- **Context:** Enhances first impression but adds design/dev work
- **Impact:** Zero state visual design and file size
- **Status:** **Nice to have** - Use if design assets available, static illustration acceptable

#### Q-11: AI Status Indicator Position
- **Question:** Where should AI status indicator be positioned?
- **Options:**
  - Top-right corner of header
  - Separate status bar above deck list
  - In user menu/profile dropdown
- **Impact:** Dashboard layout and visual hierarchy
- **Status:** **Needs design decision** - Recommend top-right corner for visibility

#### Q-12: Progress Visualization Style
- **Question:** Should progress use bar, circle, percentage, or combination?
- **Context:** Different styles suit different layouts
- **Impact:** Visual design and implementation
- **Status:** **Needs design decision** - Recommend horizontal bar with percentage label

### Data Questions

#### Q-13: Deck Creation Defaults
- **Question:** What default values should new decks have?
- **Context:** Description, tags, initial state
- **Impact:** User experience and data model
- **Status:** **Needs decision** - Recommend empty description, no tags, 0% progress

#### Q-14: Deck Metadata
- **Question:** Should decks track last accessed, last studied, or other metadata?
- **Context:** Useful for future sorting/filtering features
- **Impact:** Database schema and tracking implementation
- **Status:** **Deferred** - Add updatedAt for now, add specific timestamps later if needed

---

## 13. Acceptance Criteria (AC-x)

### AC-1: Dashboard Access
**Given** an authenticated user  
**When** they log into the application  
**Then** they are directed to the dashboard  
**And** the dashboard loads within 2 seconds  
**And** the page displays either deck list or zero-state

### AC-2: Deck List Display
**Given** a user with existing decks  
**When** they view the dashboard  
**Then** all their decks are displayed in a grid or list  
**And** decks are ordered by creation date (newest first)  
**And** each deck card shows title, creation date, and progress  
**And** the layout is responsive to screen size

### AC-3: Individual Deck Card Information
**Given** a deck card on the dashboard  
**When** a user views the card  
**Then** the deck title is prominently displayed  
**And** the creation date is formatted clearly (e.g., "Created Jan 13, 2026")  
**And** progress is shown as percentage or visual bar  
**And** card count is visible (e.g., "45 cards")  
**And** all information is clearly readable

### AC-4: Progress Visualization - 0% Progress
**Given** a deck with 0 studied cards  
**When** displayed on the dashboard  
**Then** progress shows "0%" or empty progress bar  
**And** visual indication differs from loading state  
**And** card count shows total cards available  
**And** user understands deck is ready to study

### AC-5: Progress Visualization - Partial Progress
**Given** a deck with some studied cards  
**When** displayed on the dashboard  
**Then** progress percentage accurately reflects (studied / total) × 100  
**And** progress bar is partially filled proportionally  
**And** numerical percentage is displayed (e.g., "67%")  
**And** studied and total card counts are shown

### AC-6: Progress Visualization - 100% Progress
**Given** a deck with all cards studied  
**When** displayed on the dashboard  
**Then** progress shows "100%"  
**And** progress bar is completely filled  
**And** visual indication celebrates completion (green color, checkmark)  
**And** user clearly understands deck is complete

### AC-7: Create New Deck Button Visibility
**Given** a user on the dashboard  
**When** they view the page  
**Then** "Create New Deck" button is prominently visible  
**And** button uses primary action styling (high contrast)  
**And** button includes icon (plus symbol) and text label  
**And** button is accessible on both mobile and desktop  
**And** button position is consistent (top-right or center)

### AC-8: Deck Creation Flow
**Given** a user clicks "Create New Deck"  
**When** the creation interface opens  
**Then** a modal or form appears  
**And** form includes title input field (required)  
**And** form includes description field (optional)  
**And** "Create" button is disabled until title is entered  
**And** "Cancel" button allows closing without creating  
**And** form validates title is not empty or whitespace only

### AC-9: Successful Deck Creation
**Given** a user enters valid deck information  
**When** they click "Create" button  
**Then** new deck is created in database  
**And** deck appears immediately on dashboard (optimistic UI)  
**And** success message displays briefly ("Deck created successfully")  
**And** new deck appears at top of deck list  
**And** creation form closes automatically  
**And** operation completes within 1 second

### AC-10: Deck Creation Validation Error
**Given** a user attempts to create deck with empty title  
**When** they click "Create" button  
**Then** button remains disabled  
**Or** error message displays: "Title is required"  
**And** deck is not created  
**And** form remains open for correction  
**And** user can enter valid title and retry

### AC-11: AI Status Indicator - Configured
**Given** a user with valid AI configuration  
**When** they view the dashboard  
**Then** AI status indicator shows green/checkmark  
**And** indicator is visible without scrolling  
**And** tooltip on hover shows "AI ready - [Provider] configured"  
**And** clicking indicator navigates to AI settings page

### AC-12: AI Status Indicator - Not Configured
**Given** a user without AI configuration  
**When** they view the dashboard  
**Then** AI status indicator shows red/X or warning icon  
**And** indicator is immediately visible  
**And** tooltip shows "AI not configured - click to set up"  
**And** clicking indicator navigates to AI configuration page  
**And** user understands action is needed

### AC-13: AI Status Indicator - Configuration Issue
**Given** a user with invalid AI configuration  
**When** they view the dashboard  
**Then** AI status indicator shows yellow/warning icon  
**And** tooltip explains "AI configuration needs attention"  
**And** clicking navigates to AI settings for correction  
**And** user understands there is an issue to resolve

### AC-14: Zero State Display
**Given** a user with zero decks  
**When** they view the dashboard  
**Then** zero-state view is displayed instead of deck list  
**And** welcoming message is shown (e.g., "Welcome! Create your first deck to start studying")  
**And** message is encouraging and action-oriented  
**And** large "Create New Deck" CTA button is prominently displayed  
**And** optional illustration or icon enhances the message  
**And** AI status indicator is still visible

### AC-15: Zero State Conversion
**Given** a user viewing zero-state  
**When** they click "Create New Deck"  
**Then** deck creation interface opens  
**And** user can create their first deck  
**And** after successful creation, dashboard shows deck list  
**And** zero-state no longer displays

### AC-16: Deck Navigation
**Given** a user viewing their deck list  
**When** they click on a deck card  
**Then** they navigate to the deck detail page  
**And** navigation occurs within 500ms  
**And** deck detail page receives correct deck ID  
**And** deck detail page loads the selected deck's information

### AC-17: Deck Card Hover State
**Given** a user hovering over a deck card  
**When** the mouse is over the card  
**Then** visual feedback indicates card is clickable  
**And** cursor changes to pointer  
**And** card may have subtle elevation or border change  
**And** hover state is smooth and not jarring

### AC-18: Responsive Layout - Desktop
**Given** a user on desktop screen (≥1024px)  
**When** they view the dashboard  
**Then** decks display in multi-column grid (3-4 columns)  
**And** all deck information is clearly visible  
**And** create button is in top-right or consistent position  
**And** adequate spacing between deck cards

### AC-19: Responsive Layout - Tablet
**Given** a user on tablet screen (768px - 1023px)  
**When** they view the dashboard  
**Then** decks display in 2-column grid  
**And** all information remains readable  
**And** touch targets are adequate size  
**And** layout adjusts smoothly without horizontal scroll

### AC-20: Responsive Layout - Mobile
**Given** a user on mobile screen (<768px)  
**When** they view the dashboard  
**Then** decks stack vertically (single column)  
**And** deck cards are full width with padding  
**And** all text is readable at mobile size  
**And** touch targets are minimum 44x44 points  
**And** no horizontal scrolling occurs

### AC-21: Dashboard Performance
**Given** a user with up to 50 decks  
**When** they load the dashboard  
**Then** page load completes within 2 seconds  
**And** deck list renders without janky layout shifts  
**And** progress calculations complete without blocking UI  
**And** interactions feel responsive (<100ms feedback)

### AC-22: API Endpoint - Get Decks
**Given** an authenticated user  
**When** dashboard makes `GET /api/decks` request  
**Then** API returns array of user's decks  
**And** each deck includes: id, title, description, createdAt, progress, cardCount  
**And** response status is 200 OK  
**And** response time is <500ms  
**And** unauthenticated requests return 401

### AC-23: API Endpoint - Create Deck
**Given** an authenticated user  
**When** frontend makes `POST /api/decks` with valid data  
**Then** API creates new deck in database  
**And** deck is associated with requesting user  
**And** response returns created deck with ID and timestamps  
**And** response status is 201 Created  
**And** invalid data returns 400 Bad Request with error message

### AC-24: Database Persistence
**Given** a deck is created  
**When** user logs out and logs back in  
**Then** the deck still appears on dashboard  
**And** all deck information is preserved  
**And** deck association with user is maintained  
**And** progress and card counts are accurate

### AC-25: Deck Data Model Validation
**Given** the Deck data model  
**When** creating or updating a deck  
**Then** title is required and non-empty  
**And** title is maximum 100 characters  
**And** description is optional and maximum 500 characters  
**And** userId is required and references valid user  
**And** timestamps (createdAt, updatedAt) are automatically managed

### AC-26: Error Handling - Network Failure
**Given** a network error occurs loading dashboard  
**When** API request fails  
**Then** user-friendly error message is displayed  
**And** message suggests checking internet connection  
**And** user has option to retry loading  
**And** dashboard doesn't crash or show blank screen

### AC-27: Error Handling - Deck Creation Failure
**Given** deck creation fails (database error)  
**When** user attempts to create deck  
**Then** error message is displayed  
**And** message is user-friendly (not technical error details)  
**And** deck does not appear on dashboard  
**And** user can retry creation  
**And** error is logged for debugging

### AC-28: Loading State
**Given** dashboard is fetching deck data  
**When** page is loading  
**Then** loading skeleton or spinner is displayed  
**And** loading state doesn't cause layout shift  
**And** loading typically completes within 1 second  
**And** if loading exceeds 5 seconds, helpful message appears

### AC-29: Accessibility - Keyboard Navigation
**Given** a keyboard-only user  
**When** they navigate the dashboard  
**Then** all interactive elements are keyboard accessible  
**And** tab order is logical (top to bottom, left to right)  
**And** "Create New Deck" button is focusable and activatable with Enter  
**And** deck cards are focusable and activatable with Enter  
**And** AI status indicator is keyboard accessible

### AC-30: Accessibility - Screen Reader
**Given** a screen reader user  
**When** they access the dashboard  
**Then** page title is announced ("Dashboard" or "My Decks")  
**And** deck count is announced (e.g., "You have 5 decks")  
**And** each deck card information is properly announced  
**And** progress is announced with context ("Biology 101, 67% complete")  
**And** buttons have clear labels  
**And** AI status is announced with meaning

### AC-31: Accessibility - Focus Indicators
**Given** a user navigating with keyboard  
**When** they tab through interactive elements  
**Then** focus is clearly visible on current element  
**And** focus indicator has adequate contrast (3:1 minimum)  
**And** focus outline is not removed by CSS  
**And** custom focus styles meet accessibility standards

### AC-32: Accessibility - Color Contrast
**Given** dashboard visual design  
**When** measuring color contrast  
**Then** all text has minimum 4.5:1 contrast ratio  
**And** large text (18pt+) has minimum 3:1 contrast  
**And** interactive elements have adequate contrast  
**And** progress indicators use color plus pattern/shape  
**And** design is usable in high contrast mode

---

## Appendix

### Related Documentation
- [Next.js Dashboard Patterns](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Prisma Schema Definition](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Deck Data Model Schema

**Prisma Schema (Example):**
```prisma
model Deck {
  id          String   @id @default(uuid())
  userId      String
  title       String   @db.VarChar(100)
  description String?  @db.VarChar(500)
  tags        String[] @default([])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  flashcards  Flashcard[]
  
  @@index([userId])
  @@index([createdAt])
}
```

### API Response Format Examples

**GET /api/decks Response:**
```json
{
  "decks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Biology 101",
      "description": "Introductory biology flashcards",
      "tags": ["science", "biology"],
      "createdAt": "2026-01-13T10:30:00Z",
      "updatedAt": "2026-01-13T15:45:00Z",
      "cardCount": 45,
      "studiedCount": 30,
      "progress": 66.67
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Spanish Vocabulary",
      "description": null,
      "tags": [],
      "createdAt": "2026-01-12T08:20:00Z",
      "updatedAt": "2026-01-12T08:20:00Z",
      "cardCount": 120,
      "studiedCount": 0,
      "progress": 0
    }
  ],
  "total": 2
}
```

**POST /api/decks Request:**
```json
{
  "title": "Chemistry Basics",
  "description": "General chemistry flashcards",
  "tags": ["science", "chemistry"]
}
```

**POST /api/decks Response:**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "title": "Chemistry Basics",
  "description": "General chemistry flashcards",
  "tags": ["science", "chemistry"],
  "createdAt": "2026-01-13T16:00:00Z",
  "updatedAt": "2026-01-13T16:00:00Z",
  "cardCount": 0,
  "studiedCount": 0,
  "progress": 0
}
```

### Component Structure (Suggested)

```
src/app/dashboard/
├── page.tsx                    # Main dashboard page
├── components/
│   ├── DashboardHeader.tsx    # Header with title and create button
│   ├── AIStatusIndicator.tsx  # AI configuration status
│   ├── DeckList.tsx           # Deck list container
│   ├── DeckCard.tsx           # Individual deck card
│   ├── ProgressBar.tsx        # Progress visualization
│   ├── ZeroState.tsx          # Empty state component
│   └── CreateDeckModal.tsx    # Deck creation modal/form
└── hooks/
    ├── useDecks.ts            # Deck data fetching hook
    └── useCreateDeck.ts       # Deck creation hook
```

### Progress Calculation Examples

**Example 1: New Deck**
- Total cards: 0
- Studied cards: 0
- Progress: 0% (display "Ready to start!")

**Example 2: In Progress**
- Total cards: 45
- Studied cards: 30
- Progress: (30 / 45) × 100 = 66.67% (display "67%")

**Example 3: Complete**
- Total cards: 120
- Studied cards: 120
- Progress: (120 / 120) × 100 = 100% (display "100%" with celebration)

**Example 4: Empty Cards**
- Total cards: 0
- Studied cards: 0
- Progress: 0% (but indicate "No cards yet - add some to start")

### Zero State Copy Examples

**Option 1 (Encouraging):**
> **Welcome to MemZy!**  
> Create your first deck to start your learning journey.  
> [Create New Deck]

**Option 2 (Action-Oriented):**
> **Let's get started!**  
> Organize your study materials into decks and track your progress.  
> [Create Your First Deck]

**Option 3 (Informative):**
> **You don't have any decks yet**  
> Decks help you organize flashcards by subject or topic.  
> [Create New Deck]

### Color Palette for Status Indicators

**AI Status Colors:**
- **Green (Configured):** `#10B981` or `bg-green-500`
- **Yellow (Warning):** `#F59E0B` or `bg-yellow-500`
- **Red (Not Configured):** `#EF4444` or `bg-red-500`

**Progress Colors:**
- **0-25%:** `#EF4444` (Red) - Just started
- **26-75%:** `#F59E0B` (Orange/Yellow) - In progress
- **76-99%:** `#3B82F6` (Blue) - Almost there
- **100%:** `#10B981` (Green) - Complete!

### Testing Checklist

#### Unit Tests
- [ ] DeckCard component renders correctly with all props
- [ ] ProgressBar calculates and displays progress accurately
- [ ] ZeroState displays appropriate messaging
- [ ] CreateDeckModal validates title input
- [ ] AIStatusIndicator shows correct status based on config

#### Integration Tests
- [ ] Dashboard loads deck list from API
- [ ] Create deck sends correct API request
- [ ] New deck appears in list after creation
- [ ] Zero state displays when user has no decks
- [ ] Deck click navigates to correct detail page

#### E2E Tests
- [ ] User can log in and see dashboard
- [ ] User can create deck from zero state
- [ ] User can create additional decks
- [ ] User can click deck to navigate to details
- [ ] Dashboard displays correctly on mobile

#### Accessibility Tests
- [ ] Keyboard navigation works for all interactions
- [ ] Screen reader announces all important information
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] All interactive elements have proper labels

#### Performance Tests
- [ ] Dashboard loads in <2 seconds with 10 decks
- [ ] Dashboard loads in <3 seconds with 50 decks
- [ ] Deck creation completes in <1 second
- [ ] No layout shift during loading
- [ ] Mobile performance is acceptable

### Launch Checklist

#### Pre-Launch
- [ ] All acceptance criteria met and validated
- [ ] Database schema created and migrated
- [ ] API endpoints implemented and tested
- [ ] Frontend components implemented and tested
- [ ] Responsive design verified on multiple devices
- [ ] Accessibility audit completed
- [ ] Error handling tested for common scenarios
- [ ] Performance testing completed
- [ ] Security review completed (authentication, authorization)
- [ ] Analytics tracking implemented

#### Launch
- [ ] Feature flag enabled (if using feature flags)
- [ ] Database migrations run in production
- [ ] Monitoring and alerts configured
- [ ] Documentation updated
- [ ] Support team briefed on new feature
- [ ] Rollback plan documented and ready

#### Post-Launch
- [ ] Monitor error logs for issues
- [ ] Track key metrics (M-1 through M-10)
- [ ] Gather user feedback
- [ ] Address critical bugs within 24 hours
- [ ] Plan iteration based on metrics and feedback

### Future Enhancements (Post-MVP)

Based on user feedback and metrics, consider these enhancements:

1. **Deck Sorting and Filtering**
   - Sort by: Title, Date, Progress, Card Count
   - Filter by: Tags, Progress Range, Date Range

2. **Deck Search**
   - Full-text search across deck titles
   - Search flashcard content within decks

3. **Advanced Organization**
   - Folders or collections of decks
   - Nested organization structure
   - Drag-and-drop reordering

4. **Deck Templates**
   - Pre-made deck structures
   - Import from popular formats (Anki, Quizlet)

5. **Enhanced Progress Tracking**
   - Study streaks
   - Time spent studying per deck
   - Mastery levels per deck

6. **Deck Sharing**
   - Share decks with other users
   - Public deck library
   - Collaborative deck editing

7. **Study Reminders**
   - Scheduled study notifications
   - Spaced repetition recommendations
   - Study goal tracking

8. **Deck Actions Menu**
   - Rename, duplicate, archive decks
   - Export deck to various formats
   - Print flashcards

### Glossary
- **Deck:** A collection of flashcards organized by topic or subject
- **Dashboard:** The main landing page showing overview of all decks
- **Progress:** Percentage of flashcards studied in a deck
- **Zero State:** UI displayed when user has no decks
- **AI Status:** Indicator showing whether LLM provider is configured
- **CTA:** Call-to-Action, a button or link prompting user action
- **Optimistic UI:** UI that updates immediately before server confirms
- **Card Count:** Total number of flashcards in a deck
- **Studied Count:** Number of flashcards marked as studied in a deck

### Version History
- **v1.0** (2026-01-13): Initial PRD created from requirement issue

---

**End of Document**
