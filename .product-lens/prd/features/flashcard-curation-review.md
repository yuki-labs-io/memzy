# PRD: Flashcard Curation & Review Mode

**Feature Name:** flashcard-curation-review  
**Created:** 2026-01-13  
**Status:** Draft  
**Source Issue:** [Requirement] flashcard-curation-review

---

## 1. Context & Problem

### Current State
The MemZy platform generates flashcards using AI from various content sources (text, files, images). Once generated, these flashcards are immediately available for study without any user validation or correction opportunity.

### Problem
- **AI Fallibility:** LLM-generated flashcards can contain errors, inaccuracies, or inappropriate content
- **No Quality Control:** Users cannot review flashcards before they become part of their study deck
- **Lost Context:** AI may miss important nuances or generate irrelevant questions
- **Missed Opportunities:** Users cannot add their own cards to complement AI-generated ones
- **Irreversible Mistakes:** Low-quality cards become permanently part of the deck without curation
- **No Enrichment:** Users cannot enhance AI-generated cards with their own insights

### Why This Matters
Studying with incorrect or low-quality flashcards is worse than not studying at all—it reinforces wrong information and wastes valuable learning time. Before committing to study a deck, users must have the opportunity to act as quality gatekeepers, correcting AI mistakes and enriching the deck with their own knowledge. This curation step transforms AI-generated cards from a raw draft into a reliable learning tool.

---

## 2. Objective

### Goal
Implement a mandatory curation and review phase between flashcard generation and final deck persistence, where users can:
- Review all AI-generated flashcards before saving
- Edit any field of any card inline
- Delete low-quality or incorrect cards
- Manually add new cards to fill gaps
- Explicitly confirm the final deck before it's saved for study

### What Will Change
- AI-generated flashcards become drafts rather than final products
- Users gain full editorial control over their learning materials
- Deck persistence only occurs after explicit user confirmation
- Quality of study materials improves through human-AI collaboration
- Users develop deeper engagement with content during curation

### Strategic Alignment
This feature aligns with product strategy to:
- **Trust Through Transparency:** Acknowledge AI limitations and empower users to correct them
- **Human-AI Collaboration:** Position AI as a helpful assistant, not an infallible oracle
- **Quality Over Quantity:** Prioritize deck quality through user curation
- **User Empowerment:** Give users full control over their learning materials
- **Responsible AI:** Implement guardrails against AI-generated misinformation

---

## 3. Scope (In Scope)

### Included
- **Draft Deck Display:** Presentation of all AI-generated cards in list or grid format
- **Inline Editing:** Ability to edit front (question/concept) and back (answer/explanation) of any card
- **Card Deletion:** Per-card delete action to remove unwanted cards
- **Manual Card Creation:** "Add Card" functionality to create new flashcards from scratch
- **Draft State Management:** Maintain cards in draft state until user confirmation
- **Final Confirmation:** "Save Deck and Study" action to persist the curated deck
- **Edit Validation:** Basic validation of card fields (non-empty, reasonable length)
- **Cancel Option:** Ability to abandon the curation process without saving

### Key Deliverables
- Draft deck review interface (list or grid layout)
- Inline edit controls for card front and back
- Delete button/action per card
- "Add Manual Card" interface
- "Save Deck and Study" confirmation button
- Draft state management system
- Cancel/discard draft functionality

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Deck Versioning:** Tracking multiple versions of a deck over time
- **Edit History:** Recording who changed what and when
- **Multi-user Collaboration:** Multiple users editing the same deck
- **Advanced Card Types:** Card templates beyond basic front/back format
- **Bulk Operations:** Select-all, bulk-delete, bulk-edit features
- **Card Reordering:** Changing the sequence of cards in the deck
- **Tag/Category Management:** Organizing cards with labels or categories
- **Card Duplication:** Creating copies of existing cards
- **Import/Export:** Moving cards between decks or external systems
- **Spaced Repetition Settings:** Configuring study algorithms during curation
- **Rich Text Editing:** Formatting, images, or multimedia in card content
- **Undo/Redo:** Multi-step action history within the editor

### Intentional Limitations
This is an MVP curation feature focused exclusively on the essential quality control actions: review, edit, delete, add, and confirm. Advanced editing features, organization tools, and collaboration capabilities are deferred to future iterations. The goal is to provide the minimum necessary functionality to prevent low-quality cards from entering study decks.

---

## 5. Personas & Users

### Primary Persona: Quality-Conscious Student
- **Profile:** Student who wants to ensure study materials are accurate before exam preparation
- **Needs:** Ability to verify and correct AI-generated flashcards
- **Pain Points:** Afraid of studying incorrect information that will hurt exam performance
- **Technical Proficiency:** Basic to intermediate web user
- **Goal:** Create a reliable, accurate deck of flashcards for exam preparation
- **Curation Behavior:** Carefully reviews each card, fixes errors, removes unclear questions

### Secondary Persona: Subject Matter Expert
- **Profile:** Professional or advanced learner with deep domain knowledge
- **Needs:** Ability to enhance AI-generated cards with expert insights
- **Pain Points:** AI misses nuances or oversimplifies complex concepts
- **Technical Proficiency:** Intermediate to advanced
- **Goal:** Build comprehensive flashcard deck that captures both basics and advanced concepts
- **Curation Behavior:** Adds manual cards to fill gaps, rewrites AI answers for precision

### Tertiary Persona: Efficiency-Focused Learner
- **Profile:** Busy professional who wants quick but quality flashcards
- **Needs:** Fast curation process with easy identification of problematic cards
- **Pain Points:** Doesn't want to spend excessive time editing but needs quality assurance
- **Technical Proficiency:** Basic to intermediate
- **Goal:** Quickly review deck, fix obvious problems, and start studying
- **Curation Behavior:** Scans for obvious errors, deletes bad cards, minimal editing

---

## 6. Main Flow (User Journey)

### Happy Path: Draft Deck Curation

1. **Entry Point:** User completes AI flashcard generation (from previous feature)
2. **Transition:** System displays "Review Your Flashcards" or similar transition message
3. **Draft Display:** System shows all generated cards in review interface (list or grid)
4. **Initial Review:** User scans through all generated flashcards
5. **Identify Issues:** User notices cards that need editing, deletion, or are missing
6. **Edit Card (if needed):**
   - User clicks/taps on card field (front or back)
   - Field becomes editable (inline editing mode)
   - User makes changes
   - User confirms edit (click away or explicit save)
   - Card updates in draft view
7. **Delete Card (if needed):**
   - User clicks delete icon/button on unwanted card
   - Optional: System asks for confirmation
   - Card is removed from draft deck
8. **Add Manual Card (if needed):**
   - User clicks "Add Card" or similar button
   - System displays empty card form (front and back fields)
   - User fills in both fields
   - User confirms addition
   - New card appears in draft deck
9. **Repeat:** User continues editing, deleting, adding until satisfied
10. **Final Review:** User does final scan of curated deck
11. **Confirmation:** User clicks "Save Deck and Study" or similar CTA
12. **Persistence:** System saves the final curated deck
13. **Exit Point:** User proceeds to study mode or dashboard

### Alternative Flow: Abandon Curation

- At any point during curation
- User clicks "Cancel" or "Discard Draft"
- System asks for confirmation (warn about losing changes)
- If confirmed, draft is discarded
- User returns to previous screen (dashboard or content input)

### Alternative Flow: All Cards Deleted

- User deletes all AI-generated cards
- User has not added any manual cards
- System displays message: "Your deck is empty. Add at least one card to continue."
- "Save Deck" button is disabled until at least one card exists
- User must add manual cards or cancel curation

### Alternative Flow: Empty Fields Validation

- User attempts to save a card with empty front or back field
- System displays validation error: "Both front and back must have content"
- Card is not saved until both fields are filled
- User corrects and retries

---

## 7. Business Rules

### BR-1: Draft State Requirement
- All AI-generated flashcards must pass through curation before persistence
- Draft state is temporary and not stored between sessions (MVP limitation)
- No direct path from generation to saved deck without curation

### BR-2: Minimum Deck Size
- Final deck must contain at least one flashcard
- Users cannot save an empty deck
- If all cards are deleted, user must add manual cards or cancel

### BR-3: Field Validation
- Card front (question/concept) cannot be empty
- Card back (answer/explanation) cannot be empty
- Maximum character limits may apply (e.g., 500 chars per field)
- Whitespace-only content is considered empty

### BR-4: Explicit Confirmation Required
- Deck persistence only occurs after user clicks "Save Deck and Study" or equivalent
- No auto-save during curation process
- User must take affirmative action to finalize deck

### BR-5: Card Uniqueness (Optional)
- System may warn if two cards have identical front text
- Warning does not prevent saving (user may have legitimate duplicates)
- Intended to catch accidental duplicates during manual creation

### BR-6: Editing Preservation
- Changes made during curation are immediately reflected in draft view
- No "unsaved changes" state within individual card edits
- Each edit operation completes before user can make another

### BR-7: Deletion Irreversibility
- Deleted cards cannot be recovered during current curation session
- Optional confirmation dialog prevents accidental deletion
- No "trash" or "undo delete" feature in MVP

---

## 8. Functional Requirements (FR-x)

### FR-1: Draft Deck Display (Must-Have)
**User Story:** As a user, I want to see all AI-generated flashcards in one view, so that I can review and assess the entire deck at once.

**Acceptance Criteria:**
- Display all generated cards in list or grid layout
- Each card shows both front and back content simultaneously (not flip-card in curation mode)
- Cards are visually distinct from each other
- Layout is responsive and works on mobile and desktop
- Supports scrolling for large decks (20+ cards)
- No pagination required (single scrollable view)

### FR-2: Inline Editing - Card Front (Must-Have)
**User Story:** As a user, I want to edit the front (question/concept) of any flashcard, so that I can correct errors or improve clarity.

**Acceptance Criteria:**
- Click/tap on card front text to enter edit mode
- Text field becomes editable with cursor
- Current content is pre-populated in edit field
- User can type, delete, and modify text
- Edit field supports multi-line text if needed
- Click away or press Enter to save changes
- Changes are immediately visible in draft view
- Character count or limit indicator shown

### FR-3: Inline Editing - Card Back (Must-Have)
**User Story:** As a user, I want to edit the back (answer/explanation) of any flashcard, so that I can add detail or fix incorrect information.

**Acceptance Criteria:**
- Click/tap on card back text to enter edit mode
- Text field becomes editable with cursor
- Current content is pre-populated
- Supports longer text (answers typically longer than questions)
- Multi-line editing supported
- Click away or explicit save to confirm changes
- Changes immediately reflected in draft view
- Character count or limit indicator shown

### FR-4: Field Validation on Edit (Must-Have)
**User Story:** As a system, I need to validate card fields during editing, so that users cannot create cards with empty or invalid content.

**Acceptance Criteria:**
- Detect if user attempts to save empty front field
- Detect if user attempts to save empty back field
- Display inline error message near field
- Prevent saving card with validation errors
- Allow user to correct and retry
- Whitespace-only content treated as empty

### FR-5: Card Deletion (Must-Have)
**User Story:** As a user, I want to delete individual flashcards, so that I can remove low-quality or incorrect cards from my deck.

**Acceptance Criteria:**
- Delete button/icon visible on each card
- Click delete triggers removal action
- Optional: Confirmation dialog ("Are you sure?")
- Card is immediately removed from view
- Deletion updates card count display
- No animation delay that confuses user
- Cannot delete if it would leave zero cards (unless allowing manual add after)

### FR-6: Delete Confirmation (Should-Have)
**User Story:** As a user, I want confirmation before deleting a card, so that I don't accidentally remove cards.

**Acceptance Criteria:**
- Clicking delete shows confirmation dialog
- Dialog displays card front text for context
- "Confirm" and "Cancel" options clearly visible
- Confirm executes deletion
- Cancel closes dialog without deleting
- Optional: "Don't ask again" checkbox for session

### FR-7: Add Manual Card Interface (Must-Have)
**User Story:** As a user, I want to add my own flashcards manually, so that I can fill gaps left by AI generation.

**Acceptance Criteria:**
- "Add Card" or "Create Manual Card" button clearly visible
- Button positioned logically (top or bottom of deck)
- Clicking button opens card creation form
- Form includes front field (required)
- Form includes back field (required)
- Form includes "Save" and "Cancel" buttons
- Validation prevents saving empty fields
- Successful save adds card to draft deck

### FR-8: Manual Card Form (Must-Have)
**User Story:** As a user, I want a simple form to create new flashcards, so that I can quickly add missing content.

**Acceptance Criteria:**
- Front field with label ("Question" or "Front")
- Back field with label ("Answer" or "Back")
- Both fields support multi-line text
- Character limits displayed
- "Save Card" button (disabled until valid)
- "Cancel" button to close form
- Form can be modal or inline
- After saving, form closes and new card appears in deck

### FR-9: Draft State Management (Must-Have)
**User Story:** As a system, I need to maintain the draft state of all cards, so that changes persist during curation session.

**Acceptance Criteria:**
- All edits update draft state immediately
- Deletions remove cards from draft state
- Manual additions append to draft state
- Draft state maintained across curation actions
- Draft state not persisted to database until confirmation
- Draft state lost if user navigates away (acceptable for MVP)

### FR-10: Save Deck Confirmation Button (Must-Have)
**User Story:** As a user, I want to explicitly confirm my curated deck, so that I can finalize the deck and proceed to studying.

**Acceptance Criteria:**
- "Save Deck and Study" or similar button prominently displayed
- Button positioned at bottom or top of interface
- Button disabled if deck is empty
- Button enabled if at least one card exists
- Clicking button triggers deck persistence
- Clear indication of success after save
- After save, user proceeds to study mode or confirmation screen

### FR-11: Cancel/Discard Draft (Must-Have)
**User Story:** As a user, I want to cancel the curation process, so that I can discard this draft and start over or quit.

**Acceptance Criteria:**
- "Cancel" or "Discard Draft" option available
- Positioned separately from "Save Deck" to avoid confusion
- Clicking triggers confirmation dialog
- Confirmation warns about losing all changes
- Confirming cancellation discards draft
- User returns to previous screen (dashboard or input page)

### FR-12: Empty Deck Prevention (Must-Have)
**User Story:** As a system, I need to prevent saving empty decks, so that users don't create unusable study decks.

**Acceptance Criteria:**
- "Save Deck" button disabled when no cards exist
- If user deletes all cards, display message: "Add at least one card to save"
- Cannot proceed to save until at least one card is added
- Error message clear and actionable
- Add Card button highlighted or emphasized when deck is empty

### FR-13: Card Count Display (Should-Have)
**User Story:** As a user, I want to see how many cards are in my draft deck, so that I understand the scope of my study material.

**Acceptance Criteria:**
- Display current card count (e.g., "12 cards")
- Count updates in real-time as cards added/deleted
- Count visible throughout curation process
- Positioned near deck title or action buttons

### FR-14: Visual Distinction - AI vs Manual Cards (Nice-to-Have)
**User Story:** As a user, I want to distinguish AI-generated cards from manually created ones, so that I understand the source of each card.

**Acceptance Criteria:**
- AI-generated cards have subtle indicator (e.g., small "AI" badge)
- Manually created cards have different indicator (e.g., "Manual" or person icon)
- Indicators are non-intrusive but visible
- No functional difference in editing between card types
- Indicator helps user track their contributions

### FR-15: Responsive Design (Must-Have)
**User Story:** As a user on mobile or desktop, I want the curation interface to work well on my device, so that I can curate flashcards anywhere.

**Acceptance Criteria:**
- Interface adapts to mobile screen sizes
- Touch-friendly edit and delete controls
- No horizontal scrolling required
- Text fields expand appropriately on mobile
- Buttons are large enough for touch interaction
- Grid/list layout adjusts to screen width

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Performance
- **Requirement:** Editing operations complete instantaneously (< 100ms response)
- **Rationale:** Smooth editing experience maintains user flow and prevents frustration
- **Measurement:** Time from user action (click edit, delete) to UI update
- **Target:**
  - Edit mode activation: < 50ms
  - Save edit update: < 100ms
  - Delete card: < 100ms
  - Add card: < 200ms
  - Full deck render: < 500ms for up to 50 cards

### NFR-2: Usability
- **Simple Interface:** Curation interface should be immediately understandable without instructions
- **Clear Affordances:** Edit and delete actions clearly indicated (icons, hover states)
- **Error Prevention:** Confirmation dialogs prevent accidental destructive actions
- **Visual Feedback:** All actions provide immediate visual feedback
- **Accessible:** Keyboard navigation supported for all curation actions

### NFR-3: Data Integrity
- **Draft Consistency:** Draft state remains consistent throughout curation session
- **No Data Loss:** User edits not lost during curation process (within session)
- **Atomic Saves:** Deck persistence is atomic (all cards saved or none)
- **Validation Enforcement:** Invalid cards cannot be saved to final deck
- **State Isolation:** Draft state does not affect previously saved decks

### NFR-4: Scalability
- **Deck Size:** Support curation of decks up to 100 cards without performance degradation
- **Large Text:** Handle card fields up to 500 characters without UI issues
- **Session Duration:** Support curation sessions up to 30 minutes without timeout
- **Memory Management:** Efficient memory usage for large draft decks

### NFR-5: Accessibility (WCAG 2.1 Level A minimum)
- **Keyboard Navigation:** All curation actions accessible via keyboard
- **Screen Reader Support:** Card content and actions announced properly
- **Focus Indicators:** Clear focus states for all interactive elements
- **Color Contrast:** Text meets minimum contrast ratios
- **Alternative Text:** Icons have appropriate labels/tooltips

### NFR-6: Error Handling
- **Graceful Failures:** Network or system errors don't cause data loss
- **Clear Messaging:** Error messages are user-friendly and actionable
- **Recovery Options:** Users can retry failed operations
- **Logging:** Technical errors logged for debugging without exposing to user

### NFR-7: Security
- **Input Sanitization:** All user-edited content sanitized to prevent XSS attacks
- **CSRF Protection:** State-changing operations protected against CSRF
- **Content Validation:** Prevent malicious content in card fields
- **Session Security:** Draft state tied to user session securely

### NFR-8: Browser Compatibility
- **Modern Browsers:** Support latest versions of Chrome, Firefox, Safari, Edge
- **Mobile Browsers:** Support iOS Safari and Chrome on Android
- **Graceful Degradation:** Core functionality works even if advanced features unavailable

---

## 10. Metrics & Success Criteria

### Primary Metrics

#### M-1: Curation Completion Rate
- **Definition:** Percentage of users who complete curation and save their deck vs. abandon
- **Target:** ≥ 85% completion rate
- **Measurement:** (Decks saved after curation / Curation sessions started) × 100
- **Collection:** Analytics tracking curation flow
- **Importance:** Validates that curation process is not too burdensome

#### M-2: Average Cards Edited per Deck
- **Definition:** Mean number of cards edited during curation
- **Target:** 3-7 edits per deck (indicates users find and fix issues)
- **Measurement:** Count edit actions per curation session
- **Collection:** Backend logging of edit events
- **Importance:** Validates that AI quality needs human curation

#### M-3: Card Deletion Rate
- **Definition:** Percentage of AI-generated cards deleted during curation
- **Target:** 5-20% deletion rate (some cards removed but not excessive)
- **Measurement:** (Cards deleted / Total AI-generated cards) × 100
- **Collection:** Track deletion actions
- **Importance:** Too low suggests no quality issues; too high suggests poor AI quality

### Secondary Metrics

#### M-4: Manual Card Addition Rate
- **Definition:** Percentage of decks where users add at least one manual card
- **Target:** ≥ 30% of decks include manual additions
- **Measurement:** Count decks with manual cards / Total decks
- **Collection:** Flag decks with manual cards
- **Importance:** Validates users find value in supplementing AI content

#### M-5: Average Curation Time
- **Definition:** Time spent in curation interface from entry to save
- **Target:** 3-10 minutes (thorough but not excessive)
- **Measurement:** Time delta from curation entry to save action
- **Collection:** Frontend timing analytics
- **Importance:** Indicates curation is efficient but allows quality review

#### M-6: Edit Validation Error Rate
- **Definition:** Percentage of edit attempts that trigger validation errors
- **Target:** < 5% (most edits succeed)
- **Measurement:** (Validation errors / Edit attempts) × 100
- **Collection:** Track validation failures
- **Importance:** Indicates if validation rules are too strict or UX unclear

#### M-7: Mobile Curation Rate
- **Definition:** Percentage of curation sessions on mobile devices
- **Target:** ≥ 30% mobile usage
- **Measurement:** Device type during curation
- **Collection:** User agent analysis
- **Importance:** Validates mobile experience is usable

#### M-8: Average Final Deck Size
- **Definition:** Mean number of cards in decks after curation
- **Target:** 8-20 cards (reasonable study set)
- **Measurement:** Count cards in saved decks
- **Collection:** Backend deck data
- **Importance:** Indicates users curate to meaningful deck sizes

### Long-term Success Indicators

- **User Satisfaction:** Post-curation survey ratings (if implemented)
- **Study Engagement:** Users who curate decks have higher study completion rates
- **Quality Perception:** Users report higher confidence in deck accuracy
- **Feature Adoption:** Curation feature becomes expected part of workflow

---

## 11. Risks & Dependencies

### High-Priority Risks

#### R-1: Curation Friction
- **Risk:** Curation process feels tedious and discourages users
- **Impact:** High - Users abandon curation, missing quality control benefit
- **Probability:** Medium
- **Mitigation:**
  - Design for speed (inline editing, no modal dialogs for basic actions)
  - Provide keyboard shortcuts for power users
  - Allow "Save Deck" quickly if user is satisfied with AI output
  - Track curation time and optimize bottlenecks
  - Consider "Quick Review" mode in future

#### R-2: Mobile Editing Difficulty
- **Risk:** Inline editing is cumbersome on mobile devices
- **Impact:** Medium - Mobile users have poor experience
- **Probability:** Medium
- **Mitigation:**
  - Design mobile-first editing interface
  - Use native mobile input controls
  - Test extensively on actual devices
  - Consider simplified mobile curation flow
  - Provide option to complete curation on desktop

#### R-3: Data Loss on Navigation
- **Risk:** Users accidentally navigate away and lose all curation work
- **Impact:** High - Extremely frustrating user experience
- **Probability:** Medium
- **Mitigation:**
  - Implement browser "Are you sure you want to leave?" warning
  - Auto-save draft state to session/local storage (future enhancement)
  - Display clear "Unsaved changes" indicator
  - Test back button and tab close scenarios

### Medium-Priority Risks

#### R-4: Validation Too Strict
- **Risk:** Validation rules prevent legitimate card content
- **Impact:** Medium - Users frustrated by rejections
- **Probability:** Low-Medium
- **Mitigation:**
  - Start with minimal validation (non-empty only)
  - Monitor validation error rates
  - Gather user feedback on rejected content
  - Iterate validation rules based on data

#### R-5: Performance with Large Decks
- **Risk:** UI becomes sluggish with 50+ card decks
- **Impact:** Medium - Poor experience for power users
- **Probability:** Low
- **Mitigation:**
  - Test with large decks during development
  - Implement virtualization if needed
  - Consider pagination or "Load More" for very large decks
  - Set reasonable deck size limits

#### R-6: Unclear UX for Editing
- **Risk:** Users don't understand how to edit cards
- **Impact:** Medium - Feature underutilized
- **Probability:** Low
- **Mitigation:**
  - Use familiar editing patterns (click to edit)
  - Provide hover states and visual cues
  - Include brief onboarding tooltip on first use
  - Test with actual users during design phase

### Low-Priority Risks

#### R-7: Inconsistent AI Quality
- **Risk:** Highly variable AI quality makes curation burden unpredictable
- **Impact:** Low-Medium - Some sessions require extensive editing
- **Probability:** Medium
- **Mitigation:**
  - This is expected behavior; curation exists to handle this
  - Monitor cards edited per session to quantify
  - Feed data back to AI prompt improvement efforts
  - Communicate expectations clearly to users

### Dependencies

#### D-1: Flashcard Generation Feature (Internal - Critical)
- **Type:** Prerequisite Feature
- **Status:** Must be completed first
- **Requirements:**
  - AI flashcard generation produces draft cards
  - Draft cards available in structured format
  - Cards include front, back, and metadata
- **Owner:** Development Team
- **Blocker:** Cannot start curation feature until generation feature delivers draft cards

#### D-2: Deck Persistence System (Internal - Critical)
- **Type:** Technical Infrastructure
- **Status:** Required for implementation
- **Requirements:**
  - Database schema for saved decks
  - API endpoints for deck CRUD operations
  - User-deck association (authentication system)
- **Owner:** Development Team
- **Note:** Design needed to support curated decks

#### D-3: Authentication System (Internal - Medium)
- **Type:** Technical Infrastructure
- **Status:** Assumed available
- **Requirements:**
  - User sessions to associate drafts
  - Deck ownership for persistence
- **Owner:** Authentication Team
- **Mitigation:** If not available, implement basic session management

#### D-4: Frontend Framework Capabilities (Internal - Low)
- **Type:** Technology Stack
- **Status:** Assumed available
- **Requirements:**
  - Support for inline editing (contenteditable or input fields)
  - Form validation
  - Modal dialogs (if used)
- **Note:** Most modern frameworks support these features

---

## 12. Open Questions

### UX/Design Questions

#### Q-1: List vs. Grid Layout
- **Question:** Should cards be displayed in a list (one per row) or grid (multiple columns)?
- **Context:** List is simpler and better for mobile; grid shows more cards at once
- **Impact:** Affects interface design and development approach
- **Status:** **Needs decision** - Recommend list for MVP (mobile-friendly, simpler)

#### Q-2: Inline Edit Trigger
- **Question:** Should cards enter edit mode on single click, double-click, or via explicit "Edit" button?
- **Context:** Single click is fast but may cause accidental edits; explicit button is clear but slower
- **Impact:** User experience and editing speed
- **Status:** **Needs decision** - Recommend single click with clear visual feedback

#### Q-3: Card Addition Position
- **Question:** Should manually added cards appear at the top, bottom, or insertion point?
- **Context:** Top is most visible; bottom preserves AI-generated order; insertion point is complex
- **Impact:** User mental model and implementation complexity
- **Status:** **Needs decision** - Recommend bottom (preserves AI order, simpler implementation)

#### Q-4: Delete Confirmation Default
- **Question:** Should delete action always require confirmation or have a toggle?
- **Context:** Confirmation prevents accidents but slows bulk deletion
- **Impact:** User experience trade-off between safety and speed
- **Status:** **Needs decision** - Recommend confirmation for MVP, add toggle in future if requested

### Technical Questions

#### Q-5: Draft State Storage
- **Question:** Should draft state be client-side only, session-persisted, or database-backed?
- **Context:** Client-side is simplest but data lost on refresh; database is most robust but complex
- **Impact:** Development complexity and data resilience
- **Status:** **Needs decision** - Recommend client-side for MVP, add persistence if users request

#### Q-6: Maximum Deck Size
- **Question:** Should there be a maximum number of cards per deck?
- **Context:** Affects UI performance and usability
- **Impact:** Technical limits and user expectations
- **Status:** **Needs decision** - Recommend soft limit of 100 cards for MVP

#### Q-7: Character Limits per Field
- **Question:** What are the maximum character limits for card front and back?
- **Context:** Database schema and UI design implications
- **Impact:** Validation rules and user constraints
- **Status:** **Needs decision** - Recommend 500 chars front, 1000 chars back

### Product Questions

#### Q-8: Curation Mandatory or Optional?
- **Question:** Can users skip curation and save AI-generated deck directly?
- **Context:** Mandatory curation ensures quality but may frustrate confident users
- **Impact:** Product philosophy and user flow
- **Status:** **Needs decision** - Recommend mandatory for MVP to establish quality culture

#### Q-9: Post-Save Editing
- **Question:** Can users edit saved decks later, or is curation one-time only?
- **Context:** Post-save editing is valuable but outside current scope
- **Impact:** Feature scope and future roadmap
- **Status:** **Deferred** - Out of scope for MVP; plan for future "Edit Deck" feature

#### Q-10: Curation Tutorial/Onboarding
- **Question:** Should first-time users see a tutorial or tips?
- **Context:** May help adoption but adds development time
- **Impact:** User onboarding and feature discovery
- **Status:** **Needs decision** - Recommend simple tooltip on first use, skip full tutorial for MVP

### Future Planning Questions

#### Q-11: Bulk Operations Priority
- **Question:** When should bulk edit/delete be added?
- **Context:** Users may request after using MVP
- **Impact:** Feature roadmap priority
- **Status:** **Deferred** - Collect user feedback post-launch

#### Q-12: Deck Versioning Priority
- **Question:** When is version history needed?
- **Context:** Mentioned as out of scope but may be highly requested
- **Impact:** Future development priorities
- **Status:** **Deferred** - Evaluate based on user requests

---

## 13. Acceptance Criteria (AC-x)

### AC-1: Draft Deck Display
**Given** a user has completed AI flashcard generation  
**When** the generation completes successfully  
**Then** the user is automatically transitioned to the curation interface  
**And** all AI-generated flashcards are displayed in list or grid format  
**And** each card shows both front and back content visibly  
**And** cards are clearly separated and individually identifiable  
**And** the total card count is displayed

### AC-2: Inline Edit - Card Front
**Given** a user is viewing the draft deck  
**When** they click on the front (question) text of any card  
**Then** the front text field becomes editable  
**And** the current text is pre-populated and can be modified  
**And** the user can type, delete, and change the text  
**And** clicking outside the field or pressing Enter saves the changes  
**And** the updated text is immediately visible in the draft view

### AC-3: Inline Edit - Card Back
**Given** a user is viewing the draft deck  
**When** they click on the back (answer) text of any card  
**Then** the back text field becomes editable  
**And** the current text is pre-populated and can be modified  
**And** the user can make changes to the text  
**And** clicking outside or pressing Enter saves the changes  
**And** the updated text is immediately visible in the draft view

### AC-4: Edit Validation - Empty Fields
**Given** a user is editing a card field (front or back)  
**When** they attempt to save the field with no content or only whitespace  
**Then** the system displays a validation error message  
**And** the error indicates "This field cannot be empty"  
**And** the field remains in edit mode  
**And** the user must enter content before the edit can be saved

### AC-5: Card Deletion
**Given** a user is viewing the draft deck  
**When** they click the delete button on any card  
**Then** a confirmation dialog appears asking "Are you sure you want to delete this card?"  
**And** if the user confirms, the card is immediately removed from view  
**And** the card count decreases by one  
**And** the card cannot be recovered during the session

### AC-6: Delete Last Card Warning
**Given** a user has only one card remaining in the draft deck  
**When** they attempt to delete that final card  
**Then** the delete action succeeds (if confirmed)  
**And** the deck becomes empty  
**And** a message displays: "Your deck is empty. Add at least one card to continue."  
**And** the "Save Deck" button becomes disabled

### AC-7: Add Manual Card Interface
**Given** a user is viewing the draft deck  
**When** they click the "Add Card" or "Create Manual Card" button  
**Then** a card creation form appears (modal or inline)  
**And** the form includes a front field labeled "Question" or "Front"  
**And** the form includes a back field labeled "Answer" or "Back"  
**And** both fields are empty and ready for input  
**And** "Save Card" and "Cancel" buttons are visible

### AC-8: Manual Card Creation
**Given** a user has opened the add card form  
**When** they fill in both front and back fields with valid content  
**And** click "Save Card"  
**Then** the form closes  
**And** the new card appears in the draft deck  
**And** the card count increases by one  
**And** the new card is visually distinguishable as manually created (optional badge)

### AC-9: Manual Card Validation
**Given** a user is filling out the add card form  
**When** they attempt to save the card with one or both fields empty  
**Then** validation errors appear on the empty fields  
**And** the error message states "Both fields are required"  
**And** the card is not added to the deck  
**And** the user must fill in all fields before saving succeeds

### AC-10: Cancel Manual Card Creation
**Given** a user has opened the add card form  
**When** they click "Cancel" before saving  
**Then** the form closes without adding a card  
**And** no changes are made to the draft deck  
**And** the card count remains unchanged

### AC-11: Save Deck Action
**Given** a user has completed curation and has at least one card in the deck  
**When** they click "Save Deck and Study" or equivalent button  
**Then** the system persists the final curated deck to the database  
**And** the deck is associated with the current user  
**And** a success message or confirmation is displayed  
**And** the user is redirected to the study interface or deck dashboard

### AC-12: Save Deck Disabled When Empty
**Given** a user is viewing the draft deck  
**When** the deck contains zero cards (all deleted, none added)  
**Then** the "Save Deck" button is disabled (grayed out)  
**And** clicking it has no effect  
**And** a message displays explaining at least one card is required  
**And** the button only enables when at least one card is added

### AC-13: Cancel/Discard Draft
**Given** a user is in the curation interface  
**When** they click "Cancel" or "Discard Draft"  
**Then** a confirmation dialog appears warning "Your changes will be lost"  
**And** if the user confirms, the draft is discarded  
**And** the user is returned to the previous screen (dashboard or input page)  
**And** no deck is saved

### AC-14: Draft State Persistence During Session
**Given** a user is curating a draft deck  
**When** they edit, delete, or add cards  
**Then** all changes are maintained in the draft state  
**And** navigating within the curation interface preserves changes  
**And** the draft state is consistent throughout the session  
**And** only final "Save Deck" action persists to database

### AC-15: Card Count Display
**Given** a user is viewing the draft deck  
**When** cards are added or deleted  
**Then** the displayed card count updates in real-time  
**And** the count accurately reflects the current number of cards  
**And** the count is visible throughout the curation process

### AC-16: Mobile Responsive Interface
**Given** a user accesses the curation interface on a mobile device  
**When** they view the draft deck  
**Then** the interface adapts to the mobile screen size  
**And** cards are displayed in a single column (if grid on desktop)  
**And** edit and delete controls are touch-friendly (adequate size and spacing)  
**And** text fields expand for editing on mobile keyboards  
**And** no horizontal scrolling is required  
**And** all curation actions are accessible on mobile

### AC-17: Edit Responsiveness
**Given** a user is editing a card field  
**When** they make changes and save  
**Then** the UI updates within 100ms  
**And** there is no noticeable lag or delay  
**And** the edited content is immediately visible  
**And** the editing experience feels smooth and responsive

### AC-18: Keyboard Navigation Support
**Given** a user prefers keyboard navigation  
**When** they use Tab, Enter, and Escape keys  
**Then** they can navigate between cards and fields using Tab  
**And** Enter saves edits or activates buttons  
**And** Escape cancels edit mode or closes dialogs  
**And** all interactive elements are keyboard-accessible

### AC-19: Screen Reader Compatibility
**Given** a user is using a screen reader  
**When** they navigate the curation interface  
**Then** cards are announced with their content  
**And** edit and delete actions are announced  
**And** validation errors are announced  
**And** all buttons have appropriate labels  
**And** the interface is navigable without a mouse

### AC-20: Data Integrity on Save
**Given** a user has curated a deck with edits, deletions, and additions  
**When** they click "Save Deck"  
**Then** the final deck contains exactly the cards visible in the draft  
**And** edited cards reflect all changes made  
**And** deleted cards are not present in the saved deck  
**And** manually added cards are included  
**And** card order is preserved (or follows defined ordering rules)  
**And** no data corruption or loss occurs

### AC-21: XSS Prevention
**Given** a user enters content in card fields  
**When** they include HTML, JavaScript, or special characters  
**Then** the content is properly sanitized before display  
**And** the content is sanitized before saving to database  
**And** no scripts execute when cards are displayed  
**And** special characters are escaped properly  
**And** the system is protected against XSS attacks

### AC-22: Multiple Edit Sessions
**Given** a user makes multiple edits to different cards  
**When** they save each edit sequentially  
**Then** each edit is preserved independently  
**And** later edits do not overwrite earlier edits  
**And** all edits are reflected in the final saved deck  
**And** no race conditions or data conflicts occur

### AC-23: Error Handling - Persistence Failure
**Given** a user attempts to save the curated deck  
**When** the persistence operation fails (network error, database error)  
**Then** the user sees a clear error message: "Unable to save deck. Please try again."  
**And** the draft state is preserved (not lost)  
**And** the user can retry the save operation  
**And** the error is logged for debugging  
**And** no partial or corrupted deck is saved

---

## Appendix

### Related Documentation
- [PRD: AI Flashcards Textual Generation](./ai-flashcards-textual-generation.md) - Prerequisite feature
- Deck Persistence API Specification (TBD)
- Flashcard Data Model (TBD)

### UI/UX Inspiration
- **Quizlet Editor:** Simple inline editing, clear add/delete actions
- **Anki Card Browser:** List-based card management, bulk operations
- **Notion:** Inline editing patterns, hover actions
- **Google Keep:** Card-based layout with edit/delete on hover

### Sample Wireframe Concepts

#### Draft Deck View (List Layout)
```
┌─────────────────────────────────────────────┐
│  Review Your Flashcards        [12 cards]  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Card 1                      [Delete] │   │
│  │ Front: What is photosynthesis?      │   │
│  │ Back: The process by which...       │   │
│  │ [AI]                                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Card 2                      [Delete] │   │
│  │ Front: Define mitochondria          │   │
│  │ Back: Organelles that produce...    │   │
│  │ [AI]                                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [ + Add Manual Card ]                      │
│                                             │
│  [ Cancel ]        [ Save Deck and Study ]  │
└─────────────────────────────────────────────┘
```

### Flashcard Data Structure (Proposed)

```typescript
interface DraftCard {
  id: string;
  front: string;
  back: string;
  source: 'ai' | 'manual';
  edited: boolean;
  createdAt: timestamp;
  editedAt?: timestamp;
}

interface DraftDeck {
  cards: DraftCard[];
  originalAICards: number;
  status: 'draft' | 'saved';
}
```

### Success Metrics Dashboard (Proposed)

Monitor these metrics post-launch:
- Curation completion rate (target: >85%)
- Average cards edited per session (target: 3-7)
- Card deletion rate (target: 5-20%)
- Manual card addition rate (target: >30% of decks)
- Average curation time (target: 3-10 minutes)
- Mobile curation rate (target: >30%)

### Future Enhancements (Post-MVP)

Potential features for future iterations based on user feedback:
1. **Bulk Operations:** Select multiple cards for batch delete or edit
2. **Card Reordering:** Drag-and-drop to change card sequence
3. **Duplicate Detection:** Automatic warning for duplicate cards
4. **Undo/Redo:** Multi-step action history
5. **Auto-Save Draft:** Persist draft state across sessions
6. **Rich Text Editing:** Formatting, lists, images in cards
7. **Card Templates:** Predefined card structures (cloze deletion, multiple choice)
8. **Edit History:** Track who changed what and when (for collaboration)
9. **Version Control:** Save multiple versions of decks
10. **Quick Review Mode:** Fast-track curation for confident users

### Glossary
- **Draft Deck:** Temporary collection of cards in curation phase, not yet saved
- **Curation:** Process of reviewing, editing, and finalizing AI-generated flashcards
- **Inline Editing:** Editing text directly in place without separate form or modal
- **Card Front:** Question, concept, or prompt side of flashcard
- **Card Back:** Answer, explanation, or definition side of flashcard
- **Persistence:** Saving curated deck to permanent storage (database)
- **Final Deck:** Curated and saved deck ready for study

### Version History
- **v1.0** (2026-01-13): Initial PRD created from requirement issue

---

**End of Document**
