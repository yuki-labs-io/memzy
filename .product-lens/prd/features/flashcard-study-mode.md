# PRD: Flashcard Study Mode (SRS Player)

**Feature Name:** flashcard-study-mode  
**Created:** 2026-01-13  
**Status:** Draft  
**Source Issue:** [Requirement] flashcard-study-mode

---

## 1. Context & Problem

### Current State
Users have flashcard decks created through various means (AI generation, manual entry, imports) but lack an effective interface to study and review these cards. Without a dedicated study mode, the perceived value of having flashcards remains unrealized.

### Problem
- **No Study Interface:** Users can create flashcards but cannot effectively study them within the application
- **Lack of Spaced Repetition:** Without an SRS (Spaced Repetition System), users must manually track which cards need review
- **Cognitive Overload:** A cluttered or feature-heavy interface during study time reduces focus and learning effectiveness
- **No Progress Tracking:** Users cannot indicate their confidence level with each card, preventing adaptive learning
- **Inefficient Review Sessions:** Without intelligent scheduling, users waste time reviewing cards they already know well

### Why This Matters
Study Mode is where the highest perceived value of flashcard applications exists. Users create flashcards specifically to study them, making this the core experience that drives user satisfaction and retention. A focused, distraction-free study environment directly impacts learning outcomes and product success. Without effective study functionality, even the best flashcard generation features provide minimal value.

---

## 2. Objective

### Goal
Create a minimal, focused, and efficient flashcard study interface that implements core spaced repetition principles to help users effectively review and retain knowledge.

### What Will Change
- Users will have a dedicated, distraction-free study mode for reviewing flashcards
- The system will adapt card presentation frequency based on user feedback
- Users can indicate their confidence level with each card using standardized SRS feedback buttons
- The application will manage a repetition queue that prioritizes difficult cards
- Study sessions will have clear beginnings and endings

### Strategic Alignment
This feature aligns with the product strategy to:
- **Deliver Core Value:** Transform flashcards from passive content into active learning tools
- **Focus on Simplicity:** Implement minimal but effective SRS without complex algorithms
- **Enable Learning Flow:** Create a distraction-free environment that promotes focus
- **Build Foundation:** Establish the infrastructure for future advanced study features
- **Validate Product-Market Fit:** Test whether users value the complete flashcard lifecycle

---

## 3. Scope (In Scope)

### Included
- **Distraction-Free Interface:** Clean, centered card display with minimal UI elements
- **Card Flipping Mechanism:** Single-action flip from question (front) to answer (back)
- **SRS Feedback Buttons:** Four response options (Wrong, Hard, Good, Easy)
- **Repetition Queue Logic:** Basic algorithm to schedule card reappearance based on difficulty
- **Session Management:** Clear study session flow with start and completion states
- **Card State Persistence:** Track per-card progress and review history
- **Deck Selection:** Ability to start study session from an existing deck
- **Card Counter:** Display progress through current session (e.g., "5/20 cards")

### Key Deliverables
- Study mode UI with centered card display
- Front/back card flip interaction
- Four SRS response buttons with appropriate functionality
- Minimal repetition algorithm implementation
- Per-card state management in database
- Session completion screen
- Study session initialization flow

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Advanced SRS Algorithms:** No implementation of Anki's SM-2, SM-17, or FSRS algorithms
- **Historical Statistics:** No analytics dashboard, learning curves, or detailed progress reports
- **Custom Study Sessions:** No filtered sessions (by tag, difficulty, date range)
- **Card Editing During Study:** Cannot modify card content during study session
- **Multi-deck Sessions:** Study one deck at a time only
- **Study Preferences:** No customization of SRS intervals or algorithm parameters
- **Study Streaks:** No daily streak tracking or gamification elements
- **Audio/Pronunciation:** No text-to-speech or audio support
- **Timed Reviews:** No timer or speed-based metrics
- **Collaborative Study:** No shared study sessions or peer review

### Intentional Limitations
This MVP focuses exclusively on the core study loop: see question → flip card → rate difficulty → get next card. All features related to detailed analytics, customization, and advanced scheduling are deferred to validate whether users find value in the basic study experience first.

---

## 5. Personas & Users

### Primary Persona: Active Learner
- **Profile:** Student or professional using flashcards to master new material
- **Needs:** Efficient, focused study sessions that maximize retention
- **Pain Points:** Distractions during study, wasting time on cards they already know, forgetting to review difficult cards
- **Technical Proficiency:** Basic; expects intuitive, one-click interactions
- **Goal:** Study flashcards effectively without manual effort to track progress
- **Study Context:** Regular review sessions (daily or several times per week)
- **Session Length:** Typically 10-30 minutes per session

### Secondary Persona: Casual Reviewer
- **Profile:** User with created flashcard decks but inconsistent study habits
- **Needs:** Simple, quick study sessions that don't require setup or planning
- **Pain Points:** Overwhelmed by complex study systems, difficulty maintaining study habits
- **Technical Proficiency:** Basic; wants zero learning curve
- **Goal:** Quick review sessions when time permits
- **Study Context:** Irregular study, often on mobile during commutes or breaks
- **Session Length:** Short bursts of 5-15 minutes

### Tertiary Persona: Exam Preparer
- **Profile:** Student preparing for specific exam with deadline pressure
- **Needs:** Systematic coverage of all material with focus on weak areas
- **Pain Points:** Time pressure, anxiety about covering all content, inefficient review
- **Technical Proficiency:** Intermediate; willing to invest time in tools that work
- **Goal:** Complete coverage of all cards while focusing extra time on difficult material
- **Study Context:** Intensive study periods before exams
- **Session Length:** Extended sessions of 30-60+ minutes

---

## 6. Main Flow (User Journey)

### Happy Path: Complete Study Session

1. **Entry Point:** User navigates to a specific deck's detail page
2. **Session Initiation:** User clicks "Study Now" or "Start Session" button
3. **Study Mode Launch:** Application enters full-screen or focused study mode
4. **First Card Presentation:** Card displayed centered on screen showing question (front) only
5. **Card Review:** User reads and attempts to recall answer
6. **Card Flip:** User clicks card, presses spacebar, or taps flip button
7. **Answer Reveal:** Card flips to show answer (back)
8. **User Evaluation:** User reads answer and evaluates their recall accuracy
9. **Feedback Selection:** User clicks one of four buttons:
   - **Wrong:** "I didn't know this at all"
   - **Hard:** "I struggled but eventually recalled it"
   - **Good:** "I knew it after thinking briefly"
   - **Easy:** "I knew it immediately"
10. **Card Scheduling:** System updates card state and schedules next review
11. **Next Card:** System presents next card from queue based on algorithm
12. **Progress Indication:** Counter updates (e.g., "6/20 cards reviewed")
13. **Repeat:** Steps 4-12 continue until queue is empty
14. **Session Completion:** Completion screen shows summary (e.g., "20 cards reviewed!")
15. **Exit Point:** User returns to deck list or deck detail

### Alternative Flow: Early Exit

- User clicks "Exit Study" button during session
- System shows confirmation dialog ("Save progress and exit?")
- If confirmed, system saves current card states and exits to previous screen
- Progress is maintained for next session

### Alternative Flow: Empty or Completed Deck

- User attempts to start study session
- No cards are due for review (all cards reviewed recently)
- System displays message: "No cards due for review. Great job! Check back later."
- User returns to deck list

### Alternative Flow: Interruption

- Study session interrupted (app closed, browser crash, etc.)
- On next session start, system recovers last state
- User can continue from where they left off or restart session

---

## 7. Business Rules

### BR-1: Card Presentation Order
- Cards marked "Wrong" return to queue quickly (within next 1-3 cards)
- Cards marked "Hard" return to queue in near term (within next 10-15 cards)
- Cards marked "Good" scheduled for later in current session or next session
- Cards marked "Easy" pushed far back in queue (multiple sessions away)
- New/unseen cards prioritized before review cards in same session

### BR-2: Flip-Only Interaction
- Cards always start showing front (question) side
- User must flip to see back (answer) before rating
- Feedback buttons disabled or hidden until card is flipped
- No auto-flip; user controls when to reveal answer

### BR-3: Session Continuity
- All feedback immediately updates card state in database
- Session progress persists between interactions
- Unexpected exits do not lose substantial progress
- Card state changes are atomic and consistent

### BR-4: Minimal Repetition Logic
- Simple interval system: Wrong (1 step), Hard (2 steps), Good (4 steps), Easy (8+ steps)
- "Step" represents position in review queue, not specific time intervals
- No complex algorithm parameters or user configuration
- Priority: recency and difficulty feedback over absolute timestamps

### BR-5: Session Definition
- Session continues until all due cards reviewed or user exits
- Maximum session size can be capped (e.g., 50 cards per session)
- Each card appears once per session unless marked "Wrong"
- Session boundary resets daily or after completion

### BR-6: Feedback Requirement
- Every card must receive feedback before progressing
- No "skip" or "pass" option in MVP
- No "undo" for previous card ratings in MVP
- Feedback is final once selected

### BR-7: Deck Isolation
- Study sessions operate on single deck only
- Card states are deck-specific
- Progress in one deck doesn't affect others
- Deck must contain at least one card to start session

---

## 8. Functional Requirements (FR-x)

### FR-1: Study Session Initiation (Must-Have)
**User Story:** As a user, I want to start a study session from a deck, so that I can begin reviewing my flashcards.

**Acceptance Criteria:**
- "Study" or "Start Session" button visible on deck detail page
- Button disabled if deck has no cards
- Button shows "No cards due" if no cards need review
- Clicking button transitions to study mode interface
- Session initializes with appropriate cards queued

### FR-2: Distraction-Free Interface (Must-Have)
**User Story:** As a user, I want a clean, focused study environment, so that I can concentrate on learning without distractions.

**Acceptance Criteria:**
- Card displayed centered on screen
- Minimal navigation elements during study
- No unrelated content or advertisements
- Clean background color or subtle pattern
- Typography optimized for readability
- Consistent layout that doesn't shift between cards

### FR-3: Front Side Display (Must-Have)
**User Story:** As a user, I want to see the question/front of the card first, so that I can test my recall before seeing the answer.

**Acceptance Criteria:**
- Card initially displays front/question side only
- Back/answer side completely hidden
- Clear indication that this is the question
- Front content formatted clearly and readably
- Card takes appropriate size based on content length

### FR-4: Card Flip Interaction (Must-Have)
**User Story:** As a user, I want to flip the card with one action, so that I can reveal the answer when ready.

**Acceptance Criteria:**
- Card flippable via click/tap on card area
- Card flippable via dedicated "Show Answer" button
- Card flippable via keyboard shortcut (spacebar)
- Smooth flip animation or transition
- Clear indication card has been flipped
- No accidental flips (appropriate hit areas)

### FR-5: Back Side Display (Must-Have)
**User Story:** As a user, I want to see the answer/back of the card after flipping, so that I can verify my recall and learn.

**Acceptance Criteria:**
- Back side displays full answer/explanation
- Front content remains visible or contextually clear
- Back content formatted clearly and readably
- Distinction between front and back is clear
- Answer revealed immediately upon flip

### FR-6: SRS Feedback Buttons (Must-Have)
**User Story:** As a user, I want to indicate how well I knew the answer, so that the system can adapt future reviews.

**Acceptance Criteria:**
- Four buttons displayed: Wrong, Hard, Good, Easy
- Buttons appear only after card is flipped
- Each button clearly labeled with meaning
- Buttons visually distinct (color or style)
- Clicking any button immediately progresses to next card
- Keyboard shortcuts available (1, 2, 3, 4 keys)

### FR-7: Repetition Queue Management (Must-Have)
**User Story:** As a system, I need to schedule card reappearance based on difficulty, so that users review challenging cards more frequently.

**Acceptance Criteria:**
- "Wrong" cards reappear within next 1-3 cards
- "Hard" cards return in near term (10-15 cards)
- "Good" cards pushed to later in session or next session
- "Easy" cards scheduled far in future
- Algorithm is consistent and predictable
- Queue order adapts dynamically based on feedback

### FR-8: Card State Persistence (Must-Have)
**User Story:** As a system, I need to save card review history, so that future sessions reflect user's learning progress.

**Acceptance Criteria:**
- Each card has review count field
- Each card has last review timestamp
- Each card has difficulty/interval field
- Card state updated immediately after feedback
- State persists across sessions and app restarts
- State specific to user and deck

### FR-9: Progress Counter (Must-Have)
**User Story:** As a user, I want to see my progress through the session, so that I know how many cards remain.

**Acceptance Criteria:**
- Counter displays cards reviewed vs. total (e.g., "5/20")
- Counter updates after each card
- Counter always visible during study
- Counter position doesn't interfere with card content
- Clear indication of session progress

### FR-10: Session Completion (Must-Have)
**User Story:** As a user, I want clear indication when my study session is complete, so that I know I've finished reviewing all due cards.

**Acceptance Criteria:**
- Completion screen appears when all cards reviewed
- Screen shows summary (e.g., "20 cards reviewed!")
- Option to exit to deck list
- Option to review again/restart session
- Clear congratulatory or completion message
- No ambiguity about session state

### FR-11: Exit Study Option (Should-Have)
**User Story:** As a user, I want to exit study mode early if needed, so that I can stop without losing progress.

**Acceptance Criteria:**
- "Exit" or "Close" button available during study
- Button positioned to avoid accidental clicks
- Confirmation dialog appears before exiting
- Progress saved up to current card
- User returned to previous screen (deck detail)
- Can resume session later

### FR-12: Empty Queue Handling (Must-Have)
**User Story:** As a user, I want clear feedback when no cards are due, so that I understand why I can't start a study session.

**Acceptance Criteria:**
- Message displayed: "No cards due for review"
- Positive reinforcement included
- Indication of when to check back (optional)
- User not confused about missing cards
- Alternative action suggested (browse deck, create cards)

### FR-13: Keyboard Navigation (Should-Have)
**User Story:** As a user, I want to use keyboard shortcuts, so that I can study efficiently without mouse/touch.

**Acceptance Criteria:**
- Spacebar or Enter flips card
- Number keys 1-4 select feedback buttons
- ESC exits study mode (with confirmation)
- Shortcuts documented or discoverable
- Shortcuts don't conflict with system shortcuts

### FR-14: Card Content Rendering (Must-Have)
**User Story:** As a user, I want card content displayed correctly, so that I can read and understand the material.

**Acceptance Criteria:**
- Text content renders with proper formatting
- Line breaks and paragraphs preserved
- Special characters display correctly
- Content scrollable if exceeds screen space
- Images display inline (if supported in cards)
- Content never truncated without indication

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Performance
- **Card Flip Responsiveness:** Card flip animation completes in <200ms
- **Feedback Processing:** Next card appears within 300ms of clicking feedback button
- **Session Load Time:** Study mode initializes in <1 second
- **Database Updates:** Card state saves asynchronously without blocking UI
- **Queue Calculation:** Next card determined in <50ms
- **Smooth Animations:** All transitions run at 60fps without jank

### NFR-2: Reliability
- **Data Integrity:** Card state updates never lost even if subsequent operation fails
- **Session Recovery:** Users can resume interrupted sessions without data loss
- **Error Graceful Handling:** Application errors don't cause study session data corruption
- **State Consistency:** Card states remain consistent across concurrent sessions (if applicable)
- **Idempotent Operations:** Duplicate feedback submissions handled safely

### NFR-3: Usability
- **Zero Learning Curve:** Study interface immediately understandable without tutorial
- **One-Click Interactions:** All primary actions require single click/tap
- **Clear Visual Hierarchy:** Important elements (card, buttons) immediately recognizable
- **Consistent Feedback:** Every action provides clear, immediate visual feedback
- **Mobile Friendly:** Study mode usable on mobile screens (responsive design)
- **Accessibility:** Keyboard navigation fully functional, proper ARIA labels

### NFR-4: Focus Optimization
- **Minimal Distractions:** No pop-ups, notifications, or interruptions during study
- **Visual Calm:** Color scheme and design promote focus, not distraction
- **Cognitive Load Reduction:** Only essential information displayed at each step
- **Flow State Support:** Smooth transitions that don't break concentration
- **Optional Fullscreen:** Ability to use browser fullscreen for total immersion

### NFR-5: Scalability
- **Large Decks:** Study sessions perform well with decks of 100+ cards
- **Long Sessions:** Maintain performance over 60+ minute sessions
- **Multiple Decks:** System handles users with 50+ decks without degradation
- **Queue Complexity:** Algorithm scales to handle complex scheduling scenarios
- **Memory Management:** No memory leaks during extended study sessions

### NFR-6: Data Privacy
- **Local Processing:** Card scheduling calculations performed locally when possible
- **Minimal Tracking:** Only essential study data collected
- **No Content Leakage:** Card content never logged or sent to external services
- **User Data Ownership:** Users retain full control of their study progress data

### NFR-7: Algorithm Simplicity
- **Understandable Logic:** Repetition algorithm explainable in simple terms
- **Predictable Behavior:** Users can develop intuition for how ratings affect scheduling
- **No Black Box:** Algorithm behavior documentable and transparent
- **Tunable Constants:** Core algorithm parameters configurable for future adjustment
- **Testable:** Algorithm behavior verifiable through unit tests

### NFR-8: Cross-Platform Consistency
- **Browser Compatibility:** Works identically in Chrome, Firefox, Safari, Edge
- **Device Consistency:** Same experience on desktop, tablet, mobile
- **Responsive Layout:** Adapts gracefully to screen sizes from 320px to 4K
- **Touch and Mouse:** Both input methods supported equally well
- **Offline Consideration:** Graceful degradation if connection lost mid-session

---

## 10. Metrics & Success Criteria

### Primary Metrics

#### M-1: Study Session Completion Rate
- **Definition:** Percentage of started sessions that are completed (all due cards reviewed)
- **Target:** ≥ 70% completion rate
- **Measurement:** (Completed sessions / Started sessions) × 100
- **Collection:** Track session start and completion events
- **Importance:** Validates that study mode is engaging and usable

#### M-2: Daily Active Studiers
- **Definition:** Number of unique users who complete at least one study session per day
- **Target:** ≥ 40% of users with decks study at least once per week
- **Measurement:** Count unique users with study sessions in time period
- **Collection:** Track study session events by user ID
- **Importance:** Core engagement metric showing feature adoption

#### M-3: Average Session Duration
- **Definition:** Mean time spent in active study session
- **Target:** 10-20 minutes (sweet spot for focused study)
- **Measurement:** Time from session start to completion/exit
- **Collection:** Log timestamps for session lifecycle events
- **Importance:** Validates session length is appropriate for user needs

### Secondary Metrics

#### M-4: Cards Reviewed Per Session
- **Definition:** Average number of cards reviewed in completed sessions
- **Target:** 15-25 cards per session
- **Measurement:** Count card feedback events per session
- **Collection:** Track feedback submissions
- **Importance:** Indicates whether queue size is appropriate

#### M-5: Feedback Button Distribution
- **Definition:** Percentage of times each button (Wrong/Hard/Good/Easy) is used
- **Target:** Balanced distribution (Wrong: 10-20%, Hard: 20-30%, Good: 30-40%, Easy: 20-30%)
- **Measurement:** Count button clicks by type
- **Collection:** Log feedback button selections
- **Importance:** Validates card difficulty is appropriate and buttons are used as intended

#### M-6: Time to First Flip
- **Definition:** Average time from card display to flip action
- **Target:** 3-10 seconds (indicates user is attempting recall)
- **Measurement:** Time between card display and flip event
- **Collection:** Track card lifecycle timestamps
- **Importance:** Shows users are actively trying to recall before revealing answer

#### M-7: Early Exit Rate
- **Definition:** Percentage of sessions exited before completion
- **Target:** ≤ 30% early exits
- **Measurement:** (Exited sessions / Total sessions) × 100
- **Collection:** Track exit vs. completion events
- **Importance:** High exit rate may indicate fatigue or usability issues

#### M-8: Repeat Study Rate
- **Definition:** Percentage of users who return for subsequent study sessions
- **Target:** ≥ 60% return within 7 days
- **Measurement:** Track users with multiple sessions over time
- **Collection:** Analyze session events by user over time windows
- **Importance:** Indicates sticky, valuable feature

### Quality Metrics

#### M-9: Study Mode Error Rate
- **Definition:** Percentage of study sessions encountering technical errors
- **Target:** < 1% error rate
- **Measurement:** Track error events during study sessions
- **Collection:** Error logging with session context
- **Importance:** Ensures reliability doesn't block learning

#### M-10: SRS Effectiveness (Qualitative)
- **Definition:** User perception that system is helping them learn effectively
- **Target:** > 75% of surveyed users agree system helps them learn
- **Measurement:** Post-session surveys or periodic user feedback
- **Collection:** Optional feedback prompts
- **Importance:** Validates core value proposition

---

## 11. Risks & Dependencies

### High-Priority Risks

#### R-1: Algorithm Too Simple or Ineffective
- **Risk:** Minimal SRS algorithm doesn't provide enough value compared to manual review
- **Impact:** High - Users may not perceive study mode as better than simple card shuffling
- **Probability:** Medium
- **Mitigation:**
  - Test algorithm with real study scenarios before launch
  - Validate that "Wrong" cards return appropriately
  - Gather early user feedback on card scheduling
  - Design for easy algorithm adjustments post-launch
  - Document algorithm parameters for future tuning

#### R-2: Cognitive Flow Interruptions
- **Risk:** UI elements or interactions break user's focus and learning flow
- **Impact:** High - Reduces learning effectiveness and user satisfaction
- **Probability:** Medium
- **Mitigation:**
  - User testing with actual study sessions
  - Minimize UI elements and animations
  - Ensure all interactions feel instant and smooth
  - Test on multiple devices for consistency
  - Gather feedback on distraction level

#### R-3: Card State Data Loss
- **Risk:** Technical failures cause loss of study progress or card states
- **Impact:** Critical - Users lose trust and abandon feature
- **Probability:** Low-Medium
- **Mitigation:**
  - Implement robust database transactions
  - Save state after every card interaction
  - Test failure scenarios (network loss, app crash)
  - Implement state recovery mechanisms
  - Regular database backups

### Medium-Priority Risks

#### R-4: Queue Emptiness Issues
- **Risk:** Users frequently encounter "no cards due" when expecting to study
- **Impact:** Medium - Reduces perceived value and engagement
- **Probability:** Medium
- **Mitigation:**
  - Tune algorithm parameters to balance review frequency
  - Provide clear communication about review scheduling
  - Allow manual "review all" option if desired
  - Track and monitor queue empty rate
  - Adjust intervals based on user behavior

#### R-5: Mobile Usability Challenges
- **Risk:** Study mode doesn't work well on small mobile screens
- **Impact:** Medium - Limits usage contexts and user satisfaction
- **Probability:** Medium-High
- **Mitigation:**
  - Mobile-first design approach
  - Test on various screen sizes early
  - Ensure touch targets are appropriately sized
  - Optimize for portrait and landscape
  - Consider mobile-specific interactions

#### R-6: Button Ambiguity
- **Risk:** Users don't understand difference between feedback buttons or use them incorrectly
- **Impact:** Medium - Reduces algorithm effectiveness
- **Probability:** Medium
- **Mitigation:**
  - Clear, descriptive button labels
  - Optional tooltips or help text
  - User testing to validate understanding
  - Track button usage patterns for anomalies
  - Consider onboarding/tutorial for first session

### Low-Priority Risks

#### R-7: Performance with Large Card Content
- **Risk:** Cards with lots of text or images cause slowness
- **Impact:** Low-Medium - Affects subset of use cases
- **Probability:** Low
- **Mitigation:**
  - Test with realistic card content sizes
  - Implement content length warnings in card creation
  - Optimize rendering for large content
  - Lazy-load images if needed

#### R-8: Keyboard Shortcut Conflicts
- **Risk:** Keyboard shortcuts conflict with browser or OS shortcuts
- **Impact:** Low - Minor usability issue
- **Probability:** Low
- **Mitigation:**
  - Use common, non-conflicting shortcuts
  - Test across different platforms
  - Document shortcuts clearly
  - Make shortcuts configurable if needed

### Dependencies

#### D-1: Persisted Deck and Cards (Internal - Critical)
- **Type:** Database Schema & API
- **Status:** Must exist before implementation
- **Requirements:**
  - Deck table/model with cards relationship
  - Card table/model with front/back content
  - User ownership and permissions
- **Owner:** Backend Development Team
- **Blocker Status:** Cannot proceed without deck/card persistence

#### D-2: Per-Card Progress State (Internal - Critical)
- **Type:** Database Schema Extension
- **Status:** Must be designed and implemented
- **Requirements:**
  - Review count field (integer)
  - Last reviewed timestamp (datetime)
  - Interval/difficulty field (integer or enum)
  - Next review date/step (integer)
- **Owner:** Backend Development Team
- **Decision Needed:** Schema design before implementation

#### D-3: Study Session API Endpoints (Internal - Critical)
- **Type:** Backend API
- **Status:** To be created
- **Requirements:**
  - GET /decks/:id/study - Get next card(s) for study
  - POST /cards/:id/feedback - Submit card feedback
  - GET /decks/:id/due-count - Get count of due cards
  - POST /study/sessions - Create/track study sessions
- **Owner:** Backend Development Team

#### D-4: Frontend Routing and State Management (Internal - Critical)
- **Type:** Frontend Infrastructure
- **Status:** Assumed available
- **Requirements:**
  - Route for study mode (/study/:deckId)
  - State management for current card and session
  - Component architecture for study UI
- **Owner:** Frontend Development Team

#### D-5: Card Content Rendering System (Internal - Medium Priority)
- **Type:** Frontend Component
- **Status:** May exist from card creation features
- **Requirements:**
  - Render card front/back content
  - Handle text formatting
  - Support images if needed
- **Owner:** Frontend Development Team
- **Note:** Can reuse from existing card display components

---

## 12. Open Questions

### Algorithm Design Questions

#### Q-1: Interval Step Definition
- **Question:** What specific intervals/steps should each feedback button trigger?
- **Context:** Need to define concrete values for "quick return," "near term," "later," and "far future"
- **Impact:** Directly affects user experience and learning effectiveness
- **Options:**
  - Session-based: Wrong=next, Hard=+5 cards, Good=end of session, Easy=next session
  - Time-based: Wrong=5min, Hard=1day, Good=3days, Easy=7days
  - Hybrid: Combination of session position and time
- **Status:** **Needs decision** - Recommend session-based for MVP simplicity

#### Q-2: Maximum Session Size
- **Question:** Should study sessions be capped at a maximum number of cards?
- **Context:** Large decks might create exhausting sessions
- **Impact:** Affects session completion rate and user fatigue
- **Status:** **Needs decision** - Recommend 50 card cap per session

#### Q-3: New Card Introduction Rate
- **Question:** How many new (never-studied) cards should appear per session?
- **Context:** Balance between reviewing old cards and introducing new content
- **Impact:** Affects learning pace and review burden
- **Status:** **Needs decision** - Recommend 10 new cards max per session

#### Q-4: "Wrong" Card Re-presentation
- **Question:** Exactly how quickly should "Wrong" cards reappear?
- **Context:** Too soon may frustrate users; too late loses effectiveness
- **Impact:** Critical for learning reinforcement
- **Status:** **Needs decision** - Recommend 1-3 cards later (immediate but not instant)

### Technical Questions

#### Q-5: Database Schema for Card State
- **Question:** What specific fields are needed for card progress tracking?
- **Context:** Must balance simplicity with future extensibility
- **Impact:** Affects implementation timeline and migration path
- **Proposed Schema:**
  - `review_count` (integer)
  - `last_reviewed_at` (timestamp)
  - `ease_factor` (float or integer)
  - `interval_step` (integer)
- **Status:** **Needs technical design** - Review proposed schema

#### Q-6: Session State Storage
- **Question:** Should in-progress sessions be stored server-side or client-side?
- **Context:** Affects reliability and cross-device experience
- **Impact:** Implementation complexity and data consistency
- **Status:** **Needs decision** - Recommend server-side for data integrity

#### Q-7: Animation Style
- **Question:** Should card flip use 3D rotation, slide transition, or fade transition?
- **Context:** Affects perceived polish and potential performance
- **Impact:** Visual appeal and UX feel
- **Status:** **Needs design decision** - Any option acceptable, prefer simple fade for MVP

### UX Questions

#### Q-8: Fullscreen Mode
- **Question:** Should study mode automatically enter fullscreen or offer as option?
- **Context:** Fullscreen increases focus but some users may resist
- **Impact:** Distraction level and user control
- **Status:** **Needs decision** - Recommend optional fullscreen with keyboard shortcut

#### Q-9: Progress Indicator Style
- **Question:** Should progress be shown as fraction (5/20), percentage (25%), or progress bar?
- **Context:** Different styles communicate different aspects of progress
- **Impact:** User motivation and session pacing awareness
- **Status:** **Needs design decision** - Recommend fraction for clarity

#### Q-10: Button Visual Design
- **Question:** Should feedback buttons use color-coding (red/orange/green) or neutral styling?
- **Context:** Colors provide quick recognition but may imply judgment
- **Impact:** User emotional response and accessibility
- **Status:** **Needs design decision** - Recommend subtle color hints, not aggressive red/green

#### Q-11: Front-Back Label
- **Question:** Should cards explicitly show "Question" / "Answer" labels?
- **Context:** May help clarity but adds visual clutter
- **Impact:** First-time user understanding vs. experienced user preference
- **Status:** **Needs decision** - Recommend labels for MVP, can remove based on feedback

### Product Questions

#### Q-12: Empty Deck Handling
- **Question:** What should happen if user starts study with deck that becomes empty mid-session?
- **Context:** Edge case but could confuse users
- **Impact:** Error handling and edge case UX
- **Status:** **Needs decision** - Recommend show completion screen with appropriate message

#### Q-13: Study Session Resume
- **Question:** Should users be able to resume partially completed sessions or always start fresh?
- **Context:** Affects complexity but improves flexibility
- **Impact:** Development time and user experience
- **Status:** **Needs decision** - Recommend always fresh sessions for MVP

#### Q-14: Feedback Button Order
- **Question:** Should buttons be ordered Wrong-Hard-Good-Easy or Easy-Good-Hard-Wrong?
- **Context:** Order affects muscle memory and accidental clicks
- **Impact:** User error rate and learning curve
- **Status:** **Needs decision** - Recommend Wrong-Hard-Good-Easy (increasing difficulty left to right)

---

## 13. Acceptance Criteria (AC-x)

### AC-1: Study Session Initiation
**Given** a user viewing a deck with reviewable cards  
**When** they click the "Study" or "Start Session" button  
**Then** the study mode interface loads  
**And** the first card is displayed showing only the front/question  
**And** the interface is in distraction-free mode  
**And** a progress counter shows "1/[total]"

### AC-2: Card Front Display
**Given** a study session has started  
**When** a card is presented  
**Then** only the front/question content is visible  
**And** the card is centered on the screen  
**And** the back/answer content is completely hidden  
**And** there is clear indication this is the question side  
**And** a flip affordance (button or instruction) is visible

### AC-3: Card Flip via Click
**Given** a card is displayed showing the front  
**When** the user clicks on the card area  
**Then** the card flips to reveal the back/answer  
**And** the transition is smooth and completes within 200ms  
**And** the back content is fully visible  
**And** the card cannot be flipped back to front

### AC-4: Card Flip via Keyboard
**Given** a card is displayed showing the front  
**When** the user presses spacebar or Enter key  
**Then** the card flips to reveal the back/answer  
**And** the behavior is identical to clicking the card  
**And** keyboard focus remains appropriate

### AC-5: Feedback Buttons Appearance
**Given** a card is flipped to show the answer  
**When** the back content is visible  
**Then** four feedback buttons appear: Wrong, Hard, Good, Easy  
**And** buttons are clearly labeled and distinct  
**And** buttons are positioned to avoid accidental clicks  
**And** all buttons are interactive and clickable  
**And** keyboard shortcuts (1, 2, 3, 4) are functional

### AC-6: "Wrong" Button Feedback
**Given** a card back is displayed with feedback buttons  
**When** the user clicks "Wrong"  
**Then** the card state is updated with low interval/difficulty  
**And** the card is scheduled to reappear within next 1-3 cards  
**And** the next card appears immediately (within 300ms)  
**And** the progress counter updates  
**And** the database persists the feedback

### AC-7: "Hard" Button Feedback
**Given** a card back is displayed with feedback buttons  
**When** the user clicks "Hard"  
**Then** the card state is updated with moderate interval  
**And** the card is scheduled to reappear within 10-15 cards  
**And** the next card appears immediately  
**And** the progress counter updates  
**And** the database persists the feedback

### AC-8: "Good" Button Feedback
**Given** a card back is displayed with feedback buttons  
**When** the user clicks "Good"  
**Then** the card state is updated with standard interval  
**And** the card is scheduled for later in current or next session  
**And** the next card appears immediately  
**And** the progress counter updates  
**And** the database persists the feedback

### AC-9: "Easy" Button Feedback
**Given** a card back is displayed with feedback buttons  
**When** the user clicks "Easy"  
**Then** the card state is updated with long interval  
**And** the card is pushed far back in queue (multiple sessions)  
**And** the next card appears immediately  
**And** the progress counter updates  
**And** the database persists the feedback

### AC-10: Queue Management - Wrong Cards
**Given** a user marks multiple cards as "Wrong" during a session  
**When** continuing through the session  
**Then** wrong cards reappear within 1-3 cards of being marked  
**And** wrong cards can appear multiple times in same session  
**And** the algorithm correctly tracks which cards were marked wrong  
**And** card order adapts dynamically

### AC-11: Progress Counter Updates
**Given** a study session is in progress  
**When** the user provides feedback on any card  
**Then** the progress counter increments (e.g., "5/20" becomes "6/20")  
**And** the counter accurately reflects cards reviewed  
**And** the counter is visible throughout the session  
**And** the counter doesn't interfere with card content

### AC-12: Session Completion
**Given** a user has reviewed all due cards in a session  
**When** the last card receives feedback  
**Then** a completion screen appears  
**And** the screen shows summary (e.g., "20 cards reviewed!")  
**And** an option to return to deck list is provided  
**And** an option to start new session is provided (if applicable)  
**And** the session state is marked as complete in database

### AC-13: Early Exit - User Initiated
**Given** a study session is in progress  
**When** the user clicks "Exit" or "Close" button  
**Then** a confirmation dialog appears asking to confirm exit  
**And** if user confirms, session ends and progress is saved  
**And** user is returned to deck detail or deck list  
**And** all card feedback submitted up to that point is persisted  
**And** if user cancels, session continues

### AC-14: No Cards Due Scenario
**Given** a user views a deck where all cards were recently reviewed  
**When** they attempt to start a study session  
**Then** a message displays: "No cards due for review"  
**And** the message includes positive reinforcement  
**And** the user cannot enter study mode  
**And** the "Study" button is disabled or shows "No cards due"  
**And** user is informed when to check back (optional)

### AC-15: Empty Deck Scenario
**Given** a user views a deck with no cards  
**When** they attempt to start a study session  
**Then** the "Study" button is disabled  
**Or** a message explains the deck is empty  
**And** user is prompted to add cards first  
**And** study mode cannot be entered

### AC-16: Card State Persistence
**Given** a user provides feedback on cards during a session  
**When** database writes occur  
**Then** each card's review_count increments  
**And** last_reviewed_at timestamp is updated  
**And** interval/difficulty values are updated based on feedback  
**And** changes persist across app restarts  
**And** changes are atomic (all or nothing per card)

### AC-17: Session Recovery
**Given** a study session is interrupted unexpectedly (app crash, browser close)  
**When** the user returns to the deck  
**And** starts a new session  
**Then** the session can continue or restart cleanly  
**And** no duplicate feedback is recorded  
**And** card states reflect all feedback given before interruption  
**And** user is not stuck in corrupted state

### AC-18: Keyboard Navigation Full Flow
**Given** a keyboard-proficient user starting a study session  
**When** using only keyboard inputs  
**Then** spacebar flips card  
**And** keys 1, 2, 3, 4 select Wrong, Hard, Good, Easy respectively  
**And** ESC key exits study (with confirmation)  
**And** entire session can be completed without mouse/touch  
**And** keyboard focus is always clear and logical

### AC-19: Mobile Touch Interaction
**Given** a user on a mobile device in study mode  
**When** interacting with cards and buttons  
**Then** tap on card flips it  
**And** feedback buttons are large enough for touch (min 44x44px)  
**And** no accidental taps occur due to layout  
**And** cards are readable on small screens  
**And** interface is responsive to orientation changes

### AC-20: Visual Focus and Clarity
**Given** a user in study mode  
**When** viewing the interface  
**Then** the card is the central focus element  
**And** background is neutral and non-distracting  
**And** typography is clear and readable  
**And** feedback buttons are obvious when needed  
**And** UI chrome is minimal  
**And** no unrelated content is visible

### AC-21: Performance Benchmarks
**Given** a study session with typical deck size (20-50 cards)  
**When** measuring performance  
**Then** card flip completes within 200ms  
**And** next card loads within 300ms of feedback  
**And** session initialization takes less than 1 second  
**And** no UI lag or jank is perceptible  
**And** memory usage remains stable throughout session

### AC-22: Algorithm Correctness
**Given** a test deck with known card states  
**When** simulating study sessions with various feedback patterns  
**Then** "Wrong" cards reappear within 1-3 cards  
**And** "Easy" cards don't reappear in same session  
**And** cards marked "Good" appear later or next session  
**And** algorithm handles edge cases (all wrong, all easy, etc.)  
**And** queue never enters infinite loop or corrupt state  
**And** behavior is deterministic and reproducible

### AC-23: Cross-Browser Compatibility
**Given** study mode accessed from different browsers  
**When** testing on Chrome, Firefox, Safari, and Edge  
**Then** all functionality works identically  
**And** keyboard shortcuts work consistently  
**And** animations and transitions render smoothly  
**And** no browser-specific bugs exist  
**And** performance is acceptable across browsers

### AC-24: Data Integrity Under Load
**Given** multiple rapid feedback submissions  
**When** user quickly clicks feedback buttons  
**Then** all feedback is recorded accurately  
**And** no feedback is lost or duplicated  
**And** card states remain consistent  
**And** race conditions don't corrupt data  
**And** duplicate submissions are handled gracefully

---

## Appendix

### Related Documentation
- To be created: Study Mode UI Designs
- To be created: SRS Algorithm Specification
- To be created: Card State Database Schema

### Algorithm Pseudocode (Initial Concept)

```
Initialize Session:
  - Load all cards from deck
  - Filter to cards due for review (based on interval and last_reviewed)
  - Create priority queue with new cards first
  - Set reviewed_count = 0

Present Card:
  - Get next card from queue
  - Display front content only
  - Wait for user flip action

Process Feedback:
  - Update card.review_count += 1
  - Update card.last_reviewed_at = now()
  
  - If feedback == WRONG:
      card.interval_step = 0
      Reinsert into queue at position: current + random(1, 3)
      
  - If feedback == HARD:
      card.interval_step = max(1, card.interval_step)
      Reinsert into queue at position: current + 10-15
      
  - If feedback == GOOD:
      card.interval_step = card.interval_step * 2 (or set to 4 if new)
      Schedule for later in session or next session
      
  - If feedback == EASY:
      card.interval_step = card.interval_step * 4 (or set to 8 if new)
      Push to far end of queue or next session
      
  - Save card state to database
  - reviewed_count += 1

Check Session End:
  - If queue empty: Show completion screen
  - Else: Present next card
```

### Database Schema Proposal

```sql
-- Add to existing Card model/table
ALTER TABLE cards ADD COLUMN review_count INTEGER DEFAULT 0;
ALTER TABLE cards ADD COLUMN last_reviewed_at TIMESTAMP NULL;
ALTER TABLE cards ADD COLUMN interval_step INTEGER DEFAULT 0;
ALTER TABLE cards ADD COLUMN next_review_at TIMESTAMP NULL;

-- Optional: Track study sessions
CREATE TABLE study_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  deck_id INTEGER NOT NULL,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP NULL,
  cards_reviewed INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (deck_id) REFERENCES decks(id)
);

-- Optional: Detailed review log
CREATE TABLE card_reviews (
  id SERIAL PRIMARY KEY,
  card_id INTEGER NOT NULL,
  session_id INTEGER NULL,
  feedback TEXT NOT NULL, -- 'wrong', 'hard', 'good', 'easy'
  reviewed_at TIMESTAMP NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards(id),
  FOREIGN KEY (session_id) REFERENCES study_sessions(id)
);
```

### UI Component Structure

```
StudyModeView
├── StudyHeader (optional - progress counter, exit button)
├── CardDisplay
│   ├── CardFront (initially visible)
│   └── CardBack (revealed after flip)
├── FeedbackButtons
│   ├── WrongButton
│   ├── HardButton
│   ├── GoodButton
│   └── EasyButton
└── CompletionScreen (shown at end)
    ├── Summary
    ├── ReturnButton
    └── RestartButton (optional)
```

### Glossary
- **SRS:** Spaced Repetition System - learning technique using increasing intervals
- **Card State:** Persistent data tracking a card's review history and scheduling
- **Review Queue:** Ordered list of cards to present during study session
- **Interval Step:** Numeric value determining when card should be reviewed next
- **Study Session:** Single continuous period of flashcard review
- **Feedback Buttons:** UI controls for user to rate their recall (Wrong/Hard/Good/Easy)
- **Deck:** Collection of related flashcards
- **Flip:** Action to reveal answer side of card after viewing question

### Version History
- **v1.0** (2026-01-13): Initial PRD created from requirement issue

---

**End of Document**
