# PRD: Deck Generation Configuration & AI Processing

**Feature Name:** generation-configuration-options  
**Created:** 2026-01-13  
**Status:** Draft  
**Source Issue:** [Requirement] generation-configuration-options

---

## 1. Context & Problem

### Current State
Users who want to generate AI-powered flashcards from their learning materials currently lack control over the generation process. The system may produce flashcards without consideration for the user's specific learning goals, preferred quantity, or desired focus areas.

### Problem
- **Lack of Control:** Users cannot specify how many flashcards they want or what type of content to focus on
- **No Transparency:** Users have no visibility into what the system is doing during the AI processing phase
- **Unclear Costs:** Users don't know the token consumption before triggering generation, potentially leading to unexpected costs
- **Limited Input Options:** Users need flexible ways to provide content (PDF, images, or text)
- **One-Size-Fits-All:** Current approach doesn't account for different learning styles, subjects, or preferences

### Why This Matters
Effective learning is highly personal. Different subjects require different types of flashcards - vocabulary learning benefits from definition-focused cards, while history might need date-based cards. Giving users control over the generation parameters ensures the output matches their specific learning needs and prevents wasted time reviewing irrelevant cards. Transparency during processing builds trust and prevents user frustration during wait times.

---

## 2. Objective

### Goal
Provide users with intuitive controls to configure AI flashcard generation parameters and transparent feedback during the processing workflow, enabling them to create personalized study materials efficiently.

### What Will Change
- Users will have explicit control over flashcard quantity, focus areas, and output language
- Users will understand exactly what the system is doing during generation through progressive feedback
- Users will have visibility into potential costs before committing to generation
- Users will be able to provide content in their preferred format (PDF, image, or text)
- The system will redirect users to a curation workflow after successful generation

### Strategic Alignment
This feature aligns with the product strategy to:
- **Empower Learners:** Give users control over their learning tools and customization
- **Build Trust:** Provide transparency into AI processing and costs
- **Reduce Friction:** Support multiple input methods to accommodate different workflows
- **Enable Iteration:** Allow users to experiment with different configurations to find what works best
- **Prepare for Curation:** Set up the workflow for post-generation refinement

---

## 3. Scope (In Scope)

### Included
- **Multi-format Input Interface:**
  - PDF/Image upload with drag & drop functionality
  - Direct text input area
  - Tab-based or segmented interface for input method selection
- **Configuration Controls:**
  - Quantity slider for controlling number of cards (5-50 range)
  - Focus selection using chip/tag interface (Definitions, Q&A, Dates, Vocabulary)
  - Output language selector dropdown
- **Generation Trigger:**
  - "Generate Flashcards" button with appropriate enabled/disabled states
  - Pre-generation validation of inputs
- **Progressive Loading Feedback:**
  - Step-based textual stepper showing current processing stage
  - Stages: Reading document → Extracting key concepts → Generating questions → Finalizing
  - Visual indication of current step
- **Optional Token Cost Estimation:**
  - Pre-generation estimate of LLM token consumption
  - Display estimated cost before user commits
- **Post-Generation Flow:**
  - Redirect to curation interface upon successful completion

### Key Deliverables
- Input interface with multiple format support
- Configuration panel with quantity, focus, and language controls
- Generation workflow with progressive feedback
- Token cost estimation component (optional MVP feature)
- Navigation to curation workflow
- Validation and error handling for configuration options

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Background Processing:** Generation happens synchronously; no queue or background job system
- **Automatic Reprocessing:** No automatic regeneration based on quality assessment
- **Result Caching:** No caching mechanism for previously processed documents
- **Advanced Configuration:**
  - Custom prompt engineering by users
  - Fine-tuning of AI model parameters
  - Card difficulty level settings
  - Custom card templates
- **Batch Processing:** Processing multiple documents simultaneously
- **Document Management:** Storing, organizing, or managing uploaded documents
- **Collaborative Features:** Sharing configurations or generated cards with others
- **A/B Testing:** Built-in comparison of different configuration options

### Intentional Limitations
This MVP focuses on providing essential configuration options and transparent feedback. Advanced features like background processing, caching, and sophisticated customization are deliberately excluded to validate core user needs first.

---

## 5. Personas & Users

### Primary Persona: Active Student
- **Profile:** University or high school student preparing for exams
- **Needs:** Quick flashcard generation from lecture notes, textbook pages, or study materials
- **Pain Points:** Limited time; wants to control focus based on what they're studying (vocabulary for language class, dates for history, concepts for science)
- **Technical Proficiency:** Basic to intermediate; comfortable with web applications
- **Goal:** Generate focused flashcards that align with specific exam topics
- **Learning Context:** Time-sensitive exam preparation with specific subject requirements

### Secondary Persona: Language Learner
- **Profile:** Self-learner studying a new language
- **Needs:** Vocabulary and definition-focused flashcards in specific languages
- **Pain Points:** Generic flashcards don't help with language-specific patterns; needs control over output language and focus
- **Technical Proficiency:** Basic; expects straightforward controls
- **Goal:** Build vocabulary systematically with appropriately focused flashcards
- **Learning Context:** Long-term language acquisition, needs consistent practice materials

### Tertiary Persona: Professional Learner
- **Profile:** Working professional learning new skills or certification content
- **Needs:** Flexible input methods (can take photos of book pages or paste from PDFs)
- **Pain Points:** Limited time; wants to know processing time and costs upfront; needs precise control over quantity
- **Technical Proficiency:** Intermediate to advanced
- **Goal:** Efficiently create study materials from various sources with predictable outcomes
- **Learning Context:** Self-paced professional development with budget awareness

### Quaternary Persona: Visual Content Learner
- **Profile:** Student working primarily with physical textbooks or printed materials
- **Needs:** Ability to photograph pages and generate flashcards without manual transcription
- **Pain Points:** Retyping content is tedious; needs system to handle image inputs smoothly
- **Technical Proficiency:** Basic; mobile-first user
- **Goal:** Transform physical study materials into digital flashcards quickly
- **Learning Context:** Traditional classroom environment with physical textbooks

---

## 6. Main Flow (User Journey)

### Happy Path: Complete Generation Workflow

1. **Entry Point:** User navigates to flashcard generation page
2. **Content Selection:** User chooses input method:
   - Selects "PDF/Image" tab and drags & drops a file, OR
   - Selects "Text" tab and pastes/types content
3. **Content Upload/Input:** 
   - For files: System accepts upload, displays filename and preview
   - For text: System validates minimum content length
4. **Configuration:**
   - User adjusts quantity slider to desired number (e.g., 15 cards)
   - User selects focus chips (e.g., "Definitions" + "Q&A")
   - User selects output language from dropdown (e.g., "Portuguese")
5. **Cost Preview (Optional):**
   - System analyzes content length
   - Displays estimated token count and cost
   - User reviews estimate
6. **Generation Trigger:**
   - User clicks "Generate Flashcards" button
   - Button becomes disabled, shows loading state
7. **Progressive Feedback:**
   - Stepper shows "Reading document" (2-5 seconds)
   - Advances to "Extracting key concepts" (5-10 seconds)
   - Advances to "Generating questions" (10-20 seconds)
   - Advances to "Finalizing" (2-5 seconds)
8. **Completion:**
   - System shows success indication
   - Generated flashcards are saved/prepared
9. **Redirect:**
   - User is automatically redirected to curation interface
   - Curation interface displays generated cards with editing options
10. **Exit Point:** User is now in curation mode with generated flashcards

### Alternative Flow: PDF/Image Processing

- Step 3a: User uploads PDF or image file
- System performs file validation (size, type)
- For images: OCR extraction shown as separate step in progress feedback
- For PDFs: Text extraction happens in "Reading document" phase
- If extraction quality is low, system may warn user but continues
- Proceed to step 4 with extracted content

### Alternative Flow: Insufficient Content

- Step 3: User inputs very short text or empty content
- System detects content below minimum threshold
- Display inline validation error: "Please provide at least 100 words of content"
- "Generate Flashcards" button remains disabled
- User adds more content
- Validation clears, button becomes enabled

### Alternative Flow: Configuration Adjustment

- Steps 4-5: User experiments with different configurations
- User previews token cost for different settings
- Realizes 50 cards would be too many, adjusts to 20
- Changes focus from "Vocabulary" to "Q&A + Dates"
- Each change updates token estimate in real-time
- User confirms final configuration and proceeds

### Alternative Flow: Processing Error

- Step 7: During generation, API request fails
- Stepper pauses at current step
- Error message overlay appears: "Generation failed. Would you like to try again?"
- Options: "Retry" or "Start Over"
- User selects "Retry"
- System resumes from last successful step
- OR user selects "Start Over" and returns to step 2

### Alternative Flow: Network Interruption

- Step 7: Network connection lost during processing
- System detects timeout
- Shows error state with explanation
- User's configuration and content are preserved
- User can retry when connection restored
- No need to re-upload or reconfigure

---

## 7. Business Rules

### BR-1: Quantity Constraints
- Minimum flashcards per generation: 5 cards
- Maximum flashcards per generation: 50 cards
- Default quantity when user first loads: 10 cards
- Quantity must be selected before generation can proceed

### BR-2: Focus Selection Rules
- At least one focus type must be selected
- Multiple focus types can be selected simultaneously
- Focus types available: "Definitions", "Q&A", "Dates", "Vocabulary"
- Selected focus types are passed to LLM prompt to guide generation
- Focus selection is mandatory; no default is pre-selected

### BR-3: Language Selection
- Output language selection is mandatory
- Language applies to generated flashcard content (questions and answers)
- Default language is based on system locale or user preference if available
- Changing language does not affect input content language detection

### BR-4: Input Content Rules
- Exactly one input method must be used (either file/image OR text, not both)
- Text input minimum: 100 characters or ~20 words
- Text input maximum: 50,000 characters or ~8,000 words
- File size maximum: 10MB for PDFs, 5MB for images
- Supported file formats: PDF, JPG, PNG, JPEG
- Supported text formats: Plain text, no rich text formatting preserved

### BR-5: Cost Estimation Rules
- Token cost estimation is calculated before generation
- Estimate based on: input content length + configuration complexity + expected output
- Estimate includes buffer (±20%) for variability
- Cost is advisory only; actual cost may vary
- If estimation service unavailable, show "Unable to estimate" rather than blocking generation

### BR-6: Processing Feedback Rules
- Progress steps must be shown sequentially, cannot skip ahead visually
- Each step must remain visible for minimum 1 second (even if processing is faster)
- If step takes longer than expected (>30 seconds), show additional feedback
- Progress cannot be dismissed or hidden by user during processing
- If processing exceeds 60 seconds, show extended time warning

### BR-7: Generation Prerequisites
- All configuration options must be valid before generation can start
- Content must pass validation (length, format, quality)
- System must confirm LLM provider availability before starting
- User cannot modify configuration during active generation
- Multiple simultaneous generations are prevented (one at a time per user)

### BR-8: Post-Generation Navigation
- Upon successful completion, redirect to curation interface is automatic
- Generated flashcards are passed to curation interface
- No option to "stay" on generation page after success
- Failure states keep user on generation page with error details
- User can navigate away manually during processing (cancels generation)

---

## 8. Functional Requirements (FR-x)

### FR-1: Input Method Selection (Must-Have)
**User Story:** As a user, I want to choose between uploading a file or pasting text, so that I can provide content in my preferred format.

**Acceptance Criteria:**
- Tab or segmented control clearly shows "PDF/Image" and "Text" options
- Only one input method is active at a time
- Switching tabs clears previous input
- Active tab is visually distinct
- Input area changes based on selected method

### FR-2: PDF/Image Upload Interface (Must-Have)
**User Story:** As a user, I want to drag & drop PDFs or images, so that I can quickly upload study materials.

**Acceptance Criteria:**
- Drag & drop zone is clearly visible with instructional text
- Alternative "Browse" or "Upload" button for traditional file selection
- Drag & drop provides visual feedback (hover state, drop zone highlight)
- Uploaded file name and size displayed
- Preview thumbnail shown for images
- "Remove" or "Clear" option to reset upload
- File type validation with clear error messages

### FR-3: Text Input Interface (Must-Have)
**User Story:** As a user, I want to paste or type text directly, so that I can generate flashcards from copied content.

**Acceptance Criteria:**
- Large, multi-line text area prominently displayed
- Placeholder text provides guidance ("Paste your text here...")
- Character/word count displayed and updates in real-time
- Supports standard keyboard shortcuts (Ctrl+V, Ctrl+A, etc.)
- Text area scrollable for long content
- Visual indication when minimum length is met

### FR-4: Quantity Slider Control (Must-Have)
**User Story:** As a user, I want to control how many flashcards are generated, so that I can get the right amount for my needs.

**Acceptance Criteria:**
- Slider with range from 5 to 50
- Current value displayed numerically next to slider
- Slider has visible tick marks or gradations (every 5 cards)
- Value updates in real-time as slider moves
- Keyboard accessible (arrow keys to adjust)
- Default position at 10 cards
- Smooth sliding animation

### FR-5: Focus Chips Selection (Must-Have)
**User Story:** As a user, I want to choose the focus of my flashcards, so that I get cards relevant to what I'm studying.

**Acceptance Criteria:**
- Four focus chips displayed: "Definitions", "Q&A", "Dates", "Vocabulary"
- Chips are toggleable (click to select/deselect)
- Multiple chips can be selected simultaneously
- Selected chips have distinct visual state (color, border, or fill)
- At least one chip must be selected (cannot deselect last chip)
- Chips are clearly labeled and easy to understand
- Touch/mobile friendly size and spacing

### FR-6: Output Language Selector (Must-Have)
**User Story:** As a user, I want to choose the output language for my flashcards, so that I can study in my preferred language.

**Acceptance Criteria:**
- Dropdown or select menu with language options
- Clearly labeled as "Output Language" or similar
- Shows currently selected language
- Supports at minimum: English, Portuguese, Spanish
- Selection persists across page refreshes (if possible)
- Default based on system locale or user preference
- Accessible via keyboard navigation

### FR-7: Generate Button with Validation (Must-Have)
**User Story:** As a user, I want a clear button to start generation that only works when everything is ready, so that I don't waste time on invalid requests.

**Acceptance Criteria:**
- Prominent "Generate Flashcards" button
- Button is disabled (greyed out) when validation fails
- Tooltip or text explains why button is disabled
- Button enabled when all requirements met
- Button shows loading state when clicked
- Button text changes to "Generating..." during processing
- Cannot be clicked multiple times

### FR-8: Textual Stepper Progress Indicator (Must-Have)
**User Story:** As a user, I want to see what the system is doing while processing, so that I know generation is working and how long it might take.

**Acceptance Criteria:**
- Four distinct steps displayed: "Reading document", "Extracting key concepts", "Generating questions", "Finalizing"
- Steps shown sequentially with visual progression
- Current step highlighted or emphasized
- Completed steps shown as done (checkmark or similar)
- Upcoming steps shown as pending (greyed or waiting state)
- Animation or transition between steps
- Cannot be dismissed or closed during processing
- Estimated time or spinner shown for current step

### FR-9: Token Cost Estimate Display (Nice-to-Have)
**User Story:** As a user, I want to know the estimated token cost before generating, so that I can make informed decisions about my usage.

**Acceptance Criteria:**
- Cost estimate shown before generation starts
- Updates in real-time as configuration changes
- Displays both token count and estimated dollar amount
- Clearly labeled as "Estimated Cost" or "Approximate Cost"
- Shows disclaimer that actual cost may vary
- Does not block generation if estimation fails
- Formatted clearly (e.g., "~1,200 tokens / ~$0.02")

### FR-10: Content Validation and Feedback (Must-Have)
**User Story:** As a user, I want immediate feedback if my content is invalid, so that I can correct issues before attempting generation.

**Acceptance Criteria:**
- Real-time validation as user inputs content
- Clear error messages for specific issues (too short, too long, wrong format)
- Validation errors displayed inline near relevant input
- Error messages use plain language, not technical jargon
- Validation clears when issue is resolved
- Positive feedback when content is valid ("Ready to generate")

### FR-11: File Format Validation (Must-Have)
**User Story:** As a user, I want to know immediately if my file format is unsupported, so that I don't waste time uploading wrong files.

**Acceptance Criteria:**
- File type validation on upload/drop
- Supported formats clearly listed near upload area
- Error modal or message for unsupported formats
- Suggestion to convert file to supported format
- File size limit communicated proactively
- Error for oversized files with clear size limit

### FR-12: Processing Error Handling (Must-Have)
**User Story:** As a user, I want clear information if generation fails, so that I can understand what went wrong and try again.

**Acceptance Criteria:**
- Error message displayed if generation fails
- Message explains the type of error (API failure, timeout, content issue)
- "Retry" button prominently displayed
- "Start Over" option to reset configuration
- User's content and configuration preserved for retry
- Technical errors logged but not shown to user
- Error doesn't crash or freeze the interface

### FR-13: Curation Redirect (Must-Have)
**User Story:** As a user, I want to automatically move to curation after generation, so that I can review and edit my flashcards immediately.

**Acceptance Criteria:**
- Automatic redirect occurs within 2 seconds of completion
- Generated flashcards are passed to curation interface
- Brief success message shown before redirect ("Success! Generated 15 flashcards")
- Loading indicator during redirect
- Redirect can be cancelled if user needs to stay (edge case)
- Curation interface receives all generated cards and metadata

### FR-14: Responsive Design (Should-Have)
**User Story:** As a user on mobile, I want the configuration interface to work on my phone, so that I can generate flashcards anywhere.

**Acceptance Criteria:**
- Layout adapts to mobile screen sizes
- All controls accessible and usable on touch devices
- Text remains readable without zooming
- Slider, chips, and buttons appropriately sized for touch
- No horizontal scrolling required
- Upload functionality works on mobile browsers
- Camera option available for image input on mobile

### FR-15: Configuration Persistence (Nice-to-Have)
**User Story:** As a user, I want my configuration preferences remembered, so that I don't have to set them every time.

**Acceptance Criteria:**
- Last used quantity value saved
- Last selected focus chips saved
- Output language preference saved
- Settings restored on page reload
- Persisted in local storage or user preferences
- Can be cleared or reset to defaults

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Performance
- **Input Responsiveness:** Configuration changes reflect in UI within 100ms
- **Cost Estimation:** Token estimate calculated within 500ms of configuration change
- **File Upload:** Files up to 5MB upload within 3 seconds on average connection
- **Generation Speed:** Complete workflow (including all steps) completes within 45 seconds for average content
- **Step Transitions:** Progress stepper transitions smoothly without lag
- **Target:** 
  - Small content (<1000 words): Total generation < 20 seconds
  - Medium content (1000-3000 words): Total generation < 35 seconds
  - Large content (3000-8000 words): Total generation < 45 seconds

### NFR-2: Reliability
- **Validation Success:** Input validation catches invalid content 99% of the time
- **Error Recovery:** System recovers gracefully from transient failures with retry logic
- **State Preservation:** User configuration and content preserved during errors
- **Generation Success Rate:** Valid content generates flashcards >95% of the time
- **No Data Loss:** Content not lost during processing or errors

### NFR-3: Security
- **File Validation:** All uploaded files scanned for malicious content
- **Content Sanitization:** User input sanitized to prevent injection attacks
- **HTTPS Only:** All communication over secure connections
- **Token Security:** API keys never exposed to client
- **Privacy:** Uploaded content not permanently stored unless user explicitly saves
- **Rate Limiting:** Prevent abuse through request rate limiting per user

### NFR-4: Usability
- **Intuitive Interface:** New users understand controls without tutorial
- **Clear Labeling:** All options and controls clearly labeled
- **Immediate Feedback:** Every user action receives immediate visual feedback
- **Error Clarity:** Error messages actionable and written in plain language
- **Accessibility:** WCAG 2.1 AA compliance for keyboard navigation and screen readers
- **Visual Hierarchy:** Most important controls (input, generate button) are prominent
- **Cognitive Load:** No more than 7-10 configuration options visible at once

### NFR-5: Scalability
- **Concurrent Users:** Support 100+ concurrent users without degradation
- **File Size Handling:** Efficiently process files up to maximum limit
- **Token Estimation:** Estimation service scales with user load
- **Frontend Performance:** No performance degradation with multiple rapid configuration changes
- **Memory Management:** Proper cleanup of uploaded files and temporary data

### NFR-6: Accessibility
- **Keyboard Navigation:** All controls accessible via keyboard only
- **Screen Reader Support:** All elements properly labeled for screen readers
- **Color Contrast:** Minimum 4.5:1 contrast ratio for text
- **Focus Indicators:** Clear visual focus indicators for all interactive elements
- **Error Announcements:** Errors announced to assistive technologies
- **Semantic HTML:** Proper use of semantic elements and ARIA attributes

### NFR-7: Maintainability
- **Component Modularity:** Input, configuration, and progress components are independent
- **Configuration Flexibility:** Easy to add new focus types or language options
- **Prompt Updates:** LLM prompts can be modified without code changes
- **Logging:** Comprehensive logging for debugging and monitoring
- **Testing:** Unit tests for validation logic, integration tests for full workflow
- **Documentation:** Clear documentation of configuration options and their effects

### NFR-8: Cost Efficiency
- **Token Optimization:** Minimize unnecessary LLM API calls
- **Accurate Estimation:** Cost estimation within ±20% of actual cost
- **Resource Usage:** Efficient frontend rendering without excessive re-renders
- **File Processing:** Optimize file parsing to minimize processing time
- **API Efficiency:** Batch requests where possible to reduce overhead

### NFR-9: Compatibility
- **Browser Support:** Works on Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers:** Full functionality on iOS Safari and Android Chrome
- **Device Support:** Tablets, phones, and desktops
- **File Format Support:** Handles various PDF versions and common image formats
- **OCR Compatibility:** Text extraction works with reasonable image quality

### NFR-10: Monitoring and Observability
- **Usage Tracking:** Log generation requests with configuration parameters
- **Error Tracking:** Comprehensive error logging with context
- **Performance Metrics:** Track generation times and step durations
- **Cost Monitoring:** Track actual API token usage and costs
- **User Behavior:** Monitor which configurations are most popular
- **Failure Analysis:** Detailed logging of failure modes and recovery attempts

---

## 10. Metrics & Success Criteria

### Primary Metrics

#### M-1: Configuration Completion Rate
- **Definition:** Percentage of users who complete configuration and click "Generate Flashcards"
- **Target:** ≥ 75% of users who start configuration complete and generate
- **Measurement:** (Successful generations / Configuration page visits) × 100
- **Collection:** Analytics tracking on page and button interactions
- **Importance:** Indicates configuration interface is clear and not overwhelming

#### M-2: Generation Success Rate
- **Definition:** Percentage of generation attempts that complete successfully
- **Target:** ≥ 95% success rate for valid configurations
- **Measurement:** (Successful generations / Total generation attempts) × 100
- **Collection:** Backend logging of generation outcomes
- **Importance:** Validates technical reliability and robustness

#### M-3: Configuration Adjustment Frequency
- **Definition:** Average number of configuration changes before generation
- **Target:** 2-4 adjustments per user (indicates experimentation without confusion)
- **Measurement:** Count configuration changes between page load and generation
- **Collection:** Frontend tracking of quantity, focus, and language changes
- **Importance:** Indicates users understand and utilize configuration options

#### M-4: Time to Generation
- **Definition:** Time from page load to clicking "Generate Flashcards"
- **Target:** 
  - Median: ≤ 60 seconds
  - 95th percentile: ≤ 180 seconds
- **Measurement:** Client-side timing from page ready to button click
- **Collection:** Performance monitoring and analytics
- **Importance:** Validates workflow efficiency and user decisiveness

### Secondary Metrics

#### M-5: Cost Estimation Usage
- **Definition:** Percentage of users who view cost estimate before generating (if feature enabled)
- **Target:** ≥ 50% of users check cost estimate
- **Measurement:** Track views of cost estimate element
- **Collection:** Frontend analytics
- **Importance:** Indicates value and visibility of cost transparency feature

#### M-6: Focus Selection Distribution
- **Definition:** Breakdown of which focus types are selected most frequently
- **Target:** No single focus type accounts for >60% (indicates diverse needs being met)
- **Measurement:** Count frequency of each focus type selection
- **Collection:** Backend logging of configuration parameters
- **Importance:** Guides future focus type additions and priority

#### M-7: Quantity Distribution
- **Definition:** Distribution of flashcard quantities selected by users
- **Target:** Normal distribution centered around 15-20 cards
- **Measurement:** Histogram of quantity values
- **Collection:** Backend logging of configuration parameters
- **Importance:** Validates quantity range and default value

#### M-8: Processing Time by Step
- **Definition:** Average time spent in each progress step
- **Target:** 
  - Reading document: 2-5 seconds
  - Extracting concepts: 5-10 seconds
  - Generating questions: 10-20 seconds
  - Finalizing: 2-5 seconds
- **Measurement:** Backend timing logs for each processing stage
- **Collection:** Performance monitoring
- **Importance:** Identifies bottlenecks and validates progress feedback accuracy

#### M-9: Input Method Preference
- **Definition:** Percentage split between PDF/Image vs Text input
- **Target:** Both methods used by >25% of users
- **Measurement:** Track which input method is used per generation
- **Collection:** Analytics on input method selection
- **Importance:** Validates need for multiple input options

#### M-10: Error Rate by Type
- **Definition:** Breakdown of errors encountered during configuration/generation
- **Target:** No single error type exceeds 5% of attempts
- **Measurement:** Categorize and count validation and generation errors
- **Collection:** Error logging and categorization
- **Importance:** Identifies common user issues and improvement areas

#### M-11: Retry Success Rate
- **Definition:** Percentage of failed generations that succeed on retry
- **Target:** ≥ 70% of retries succeed
- **Measurement:** Track retry attempts and their outcomes
- **Collection:** Backend logging of retry flows
- **Importance:** Validates error recovery mechanism effectiveness

#### M-12: Mobile vs Desktop Usage
- **Definition:** Percentage of generations initiated from mobile devices
- **Target:** ≥ 30% mobile usage (if responsive design implemented)
- **Measurement:** Device type detection
- **Collection:** Analytics with device information
- **Importance:** Validates mobile experience and responsive design priority

### Long-term Success Indicators

- **User Satisfaction:** Post-generation survey ratings (if implemented)
- **Repeat Usage:** Users return to generate additional flashcard sets
- **Configuration Evolution:** Users experiment with different configurations over time
- **Curation Engagement:** Users proceed to curation and make edits
- **Cost Predictability:** Estimated costs align closely with actual costs
- **Feature Adoption:** New focus types or languages added based on usage patterns

---

## 11. Risks & Dependencies

### High-Priority Risks

#### R-1: Configuration Complexity Overwhelms Users
- **Risk:** Too many options confuse users and prevent completion
- **Impact:** High - Users abandon before generating flashcards
- **Probability:** Medium
- **Mitigation:**
  - User testing with various user types
  - Progressive disclosure of advanced options
  - Smart defaults that work for most users
  - Clear explanations and tooltips
  - Option to use "Quick Generate" with default settings
  - Monitor completion rates and iterate

#### R-2: Cost Estimation Accuracy
- **Risk:** Token estimates significantly different from actual costs
- **Impact:** Medium-High - Erodes trust and creates budget concerns
- **Probability:** Medium
- **Mitigation:**
  - Conservative estimates (overestimate slightly)
  - Clear disclaimer about estimate variability
  - Track actual vs estimated costs and refine algorithm
  - Provide cost ranges rather than single numbers
  - Make estimates optional if accuracy is poor

#### R-3: Generation Time Exceeds User Patience
- **Risk:** Processing takes too long, users abandon or lose trust
- **Impact:** High - Poor user experience and decreased adoption
- **Probability:** Medium
- **Mitigation:**
  - Optimize LLM prompt efficiency
  - Set user expectations about time (show estimates)
  - Engaging progress feedback keeps users informed
  - Consider async processing for large documents
  - Monitor generation times and optimize bottlenecks

#### R-4: LLM Integration Reliability
- **Risk:** LLM API failures or rate limits disrupt generation
- **Impact:** High - Feature becomes unusable
- **Probability:** Medium
- **Mitigation:**
  - Implement robust retry logic with exponential backoff
  - Clear error messages with retry options
  - Monitor API status and quota proactively
  - Consider fallback LLM providers
  - Queue requests if approaching rate limits

### Medium-Priority Risks

#### R-5: File Upload Security Vulnerabilities
- **Risk:** Malicious files uploaded that compromise system
- **Impact:** High (security) but Low (probability with proper validation)
- **Probability:** Low
- **Mitigation:**
  - Strict file type validation
  - File size limits
  - Virus scanning on uploads
  - Sandboxed file processing
  - Content Security Policy headers
  - Regular security audits

#### R-6: Focus Types Don't Match User Needs
- **Risk:** Provided focus options don't cover common use cases
- **Impact:** Medium - Users can't get desired flashcard types
- **Probability:** Medium
- **Mitigation:**
  - Research common flashcard patterns before finalizing list
  - Make focus types easily extensible in code
  - Monitor user feedback and feature requests
  - Allow "Mixed" or "General" option as fallback
  - Plan for custom focus types in future iteration

#### R-7: OCR Quality for Images
- **Risk:** Text extraction from images produces poor quality results
- **Impact:** Medium - Image input becomes less useful
- **Probability:** Medium-High
- **Mitigation:**
  - Set clear image quality requirements
  - Show extracted text preview for user verification
  - Implement quality checks on extracted text
  - Provide guidance on taking good photos
  - Consider manual text correction interface

#### R-8: Mobile Responsiveness Challenges
- **Risk:** Interface doesn't work well on mobile devices
- **Impact:** Medium - Excludes mobile users
- **Probability:** Medium
- **Mitigation:**
  - Mobile-first design approach
  - Touch-friendly control sizes
  - Test on actual mobile devices
  - Simplified mobile layout if needed
  - Progressive enhancement strategy

### Low-Priority Risks

#### R-9: Language Support Limitations
- **Risk:** LLM quality varies significantly across languages
- **Impact:** Low-Medium - Some languages provide poor results
- **Probability:** Medium
- **Mitigation:**
  - Test output quality in each supported language
  - Start with major languages (English, Portuguese, Spanish)
  - Clearly mark experimental language support
  - Collect feedback on language-specific quality
  - Adjust prompts per language if needed

#### R-10: Configuration Persistence Issues
- **Risk:** Saved preferences don't persist correctly across sessions
- **Impact:** Low - Minor inconvenience, users must reconfigure
- **Probability:** Low
- **Mitigation:**
  - Test localStorage implementation thoroughly
  - Fallback to defaults if persistence fails
  - Don't block functionality if persistence unavailable
  - Monitor localStorage errors

### Dependencies

#### D-1: LLM API Integration (External - Critical)
- **Type:** External Service
- **Status:** Required before development
- **Requirements:**
  - Active API account with generation capability
  - Sufficient quota for expected usage
  - Support for configuration parameters in prompts
- **Owner:** Development Team / Backend
- **Mitigation:** Verify API access and test configuration parameter effects

#### D-2: File Upload Infrastructure (Internal - Critical)
- **Type:** Backend Service
- **Status:** May need implementation or enhancement
- **Requirements:**
  - Support for PDF and image uploads
  - File size limits and validation
  - Temporary storage for processing
  - Text extraction libraries/services
- **Owner:** Backend Team
- **Timeline:** Must be ready before frontend development completes

#### D-3: Token Estimation Service (Internal - Medium Priority)
- **Type:** Backend Service or Library
- **Status:** Needs development (marked as optional MVP)
- **Requirements:**
  - Analyze content and configuration
  - Calculate estimated token usage
  - Return estimate quickly (<500ms)
- **Owner:** Backend Team
- **Note:** Feature can launch without this if not ready

#### D-4: OCR/Text Extraction Service (External - Critical)
- **Type:** External Service or Library
- **Status:** Decision needed on provider
- **Requirements:**
  - Support for common image formats
  - Reasonable accuracy (>90% for clear images)
  - Integration with file upload workflow
- **Owner:** Development Team
- **Options:** OpenAI Vision, Tesseract, Google Cloud Vision
- **Timeline:** Required for image upload feature

#### D-5: Curation Interface (Internal - Critical)
- **Type:** Internal Feature/Page
- **Status:** Must exist for redirect to work
- **Requirements:**
  - Accept generated flashcards as input
  - Support editing and review workflow
  - Ready to receive users from generation flow
- **Owner:** Product/Development Team
- **Note:** If not ready, may need temporary display state

#### D-6: Frontend Framework and UI Library (Internal - Low Priority)
- **Type:** Technology Stack
- **Status:** Assumed existing based on repository
- **Requirements:**
  - Component library for sliders, chips, dropdowns
  - File upload components
  - Progress/stepper components
- **Owner:** Frontend Team
- **Note:** Based on repo (Next.js, Radix UI), likely already available

#### D-7: Analytics and Monitoring Infrastructure (Internal - Medium Priority)
- **Type:** Internal Service
- **Status:** Needed for metrics collection
- **Requirements:**
  - Track user interactions and configurations
  - Log generation attempts and outcomes
  - Performance timing collection
- **Owner:** DevOps/Development Team
- **Timeline:** Should be ready for launch to collect metrics

---

## 12. Open Questions

### Technical Questions

#### Q-1: Token Estimation Implementation Approach
- **Question:** Should token estimation be client-side (approximate) or server-side (accurate)?
- **Context:** Client-side is faster but less accurate; server-side requires API call
- **Impact:** Affects implementation complexity and estimation accuracy
- **Stakeholders:** Development Team, Product Team
- **Status:** **Needs decision** - Recommend server-side with caching for accuracy

#### Q-2: Configuration Parameter Encoding
- **Question:** How are configuration parameters passed to the LLM prompt?
- **Context:** Focus types and quantity need to be translated into prompt instructions
- **Impact:** Affects prompt engineering and output quality
- **Status:** **Needs technical design** - Recommend structured prompt templates with parameter injection

#### Q-3: Step Progress Determination
- **Question:** How does the system know when to advance between progress steps?
- **Context:** Processing may be in backend, frontend needs to know current state
- **Impact:** Affects architecture (polling, websockets, estimated timing)
- **Options:**
  - Event-based updates via WebSocket
  - Polling backend for status
  - Time-based estimation on frontend
- **Status:** **Needs decision** - Recommend WebSocket for real-time accuracy or polling for simplicity

#### Q-4: File Processing Location
- **Question:** Should file text extraction happen client-side or server-side?
- **Context:** Client-side reduces server load but has library limitations
- **Impact:** Affects performance, reliability, and implementation
- **Status:** **Needs decision** - Recommend server-side for consistency and security

#### Q-5: Cost Calculation Formula
- **Question:** What formula should be used for token cost estimation?
- **Context:** Needs to account for input, output, and configuration complexity
- **Impact:** Affects estimation accuracy
- **Status:** **Needs technical specification** - Recommend formula based on: (input_tokens × 1.2) + (estimated_cards × 150 tokens per card) × prompt_complexity_multiplier

### Product Questions

#### Q-6: Default Configuration Values
- **Question:** What should be the default values for quantity, focus, and language?
- **Context:** Defaults should work for most common use case
- **Impact:** Affects initial user experience and completion rates
- **Status:** **Needs decision** - Recommend: Quantity=10, Focus=none pre-selected (user must choose), Language=system locale

#### Q-7: Focus Type Definitions
- **Question:** How should each focus type be explained to users?
- **Context:** Users need to understand what each focus type means
- **Impact:** Affects UI tooltips, help text, and user comprehension
- **Status:** **Needs copy definition** - Recommend:
  - Definitions: "Concept and explanation cards"
  - Q&A: "Question and answer format"
  - Dates: "Timeline and historical events"
  - Vocabulary: "Terms and their meanings"

#### Q-8: Handling Configuration Conflicts
- **Question:** What happens if configuration is impossible to fulfill (e.g., 50 cards from 100 words)?
- **Context:** Some configurations may not be realistic
- **Impact:** Affects validation logic and user expectations
- **Status:** **Needs decision** - Recommend: Allow user to attempt, LLM generates what it can, show message like "Generated 12 of requested 50 cards based on content"

#### Q-9: Cost Display Format
- **Question:** How should cost be displayed (tokens only, dollars only, both)?
- **Context:** Different users care about different metrics
- **Impact:** Affects UI design and user understanding
- **Status:** **Needs decision** - Recommend: Both tokens and dollars with format "~1,200 tokens / $0.024"

#### Q-10: Maximum Processing Time
- **Question:** When should the system timeout and show an error?
- **Context:** Very long content might exceed reasonable processing time
- **Impact:** Affects user experience and resource usage
- **Status:** **Needs decision** - Recommend: 60 second timeout with option to extend for large documents

### UX Questions

#### Q-11: Tab vs Segmented Control for Input Methods
- **Question:** Should input methods use tabs, radio buttons, or segmented control?
- **Context:** Affects visual design and interaction pattern
- **Impact:** Affects user navigation and clarity
- **Status:** **Needs design decision** - Recommend: Tabs for clear separation

#### Q-12: Progress Stepper Visual Style
- **Question:** Horizontal stepper, vertical stepper, or list-based progress?
- **Context:** Affects space usage and mobile responsiveness
- **Impact:** Affects mobile experience and visual design
- **Status:** **Needs design decision** - Recommend: Horizontal on desktop, vertical on mobile

#### Q-13: Cost Estimate Visibility
- **Question:** Should cost estimate be always visible, shown on hover, or behind a toggle?
- **Context:** May cause anxiety or confusion for some users
- **Impact:** Affects UI complexity and user trust
- **Status:** **Needs decision** - Recommend: Always visible but subtle, with "Learn more" link

#### Q-14: Error Recovery Experience
- **Question:** Should failed generations preserve all configuration, or allow starting fresh?
- **Context:** Balance between convenience and confusion
- **Impact:** Affects error handling UX
- **Status:** **Needs decision** - Recommend: Preserve configuration with clear "Start Over" option

#### Q-15: Mobile Upload Experience
- **Question:** Should mobile show camera option directly for image input?
- **Context:** Mobile users often want to photograph documents directly
- **Impact:** Affects mobile UX and adoption
- **Status:** **Needs design decision** - Recommend: Yes, show both camera and gallery options on mobile

### Integration Questions

#### Q-16: Curation Interface Data Format
- **Question:** What data structure should be passed to curation interface?
- **Context:** Need to agree on contract between generation and curation
- **Impact:** Affects integration implementation
- **Status:** **Needs technical specification** - Recommend: JSON array with card objects including question, answer, metadata

#### Q-17: Analytics Event Naming
- **Question:** What events should be tracked and how should they be named?
- **Context:** Need consistent analytics across product
- **Impact:** Affects analytics implementation and reporting
- **Status:** **Needs specification** - Recommend: Document event taxonomy before implementation

#### Q-18: Localization Strategy
- **Question:** Should UI labels be localized or English only?
- **Context:** Different from flashcard output language
- **Impact:** Affects implementation scope and user base
- **Status:** **Needs decision** - Recommend: English UI initially, plan for localization later

---

## 13. Acceptance Criteria (AC-x)

### AC-1: Input Method Selection and Switching
**Given** a user on the generation configuration page  
**When** they view the interface  
**Then** they see clearly labeled "PDF/Image" and "Text" input options  
**And** they can click to switch between input methods  
**And** switching clears the previous input  
**And** only one input method is active at a time  
**And** the active method is visually distinct

### AC-2: PDF/Image Upload via Drag & Drop
**Given** a user has selected the "PDF/Image" input method  
**When** they drag a PDF or image file over the upload zone  
**Then** the zone displays a visual hover effect  
**And** when they drop the file, it uploads successfully  
**And** the file name and size are displayed  
**And** for images, a preview thumbnail is shown  
**And** they see a "Remove" option to clear the upload  
**And** if the file type is invalid, an error message is shown immediately

### AC-3: Text Input with Validation
**Given** a user has selected the "Text" input method  
**When** they paste or type text into the input area  
**Then** a character/word count updates in real-time  
**And** if text is below minimum length, validation feedback is shown  
**And** when minimum length is met, validation feedback updates to positive  
**And** the "Generate Flashcards" button state updates based on validity  
**And** text area supports standard keyboard operations

### AC-4: Quantity Slider Configuration
**Given** a user is configuring flashcard generation  
**When** they interact with the quantity slider  
**Then** the slider moves smoothly between 5 and 50  
**And** the current value is displayed numerically in real-time  
**And** they can use keyboard arrows to adjust the value  
**And** the slider defaults to 10 cards on page load  
**And** tick marks or gradations are visible for reference

### AC-5: Focus Chips Multi-Selection
**Given** a user is configuring flashcard generation  
**When** they click on focus chips ("Definitions", "Q&A", "Dates", "Vocabulary")  
**Then** clicked chips toggle between selected and unselected states  
**And** multiple chips can be selected simultaneously  
**And** selected chips have a visually distinct appearance  
**And** they cannot deselect the last remaining chip (at least one must be selected)  
**And** if they try to deselect when only one is selected, it remains selected

### AC-6: Output Language Selection
**Given** a user is configuring flashcard generation  
**When** they click on the output language selector  
**Then** a dropdown shows available language options  
**And** the currently selected language is indicated  
**And** selecting a language updates the UI to show the new selection  
**And** the default language is based on system locale or user preference  
**And** the selector is keyboard accessible

### AC-7: Generate Button Validation State
**Given** a user is on the configuration page  
**When** their configuration is incomplete or invalid  
**Then** the "Generate Flashcards" button is disabled (greyed out)  
**And** hovering shows a tooltip explaining what's missing  
**When** all requirements are met (content valid, at least one focus selected)  
**Then** the button becomes enabled and clickable  
**And** clicking starts the generation process  
**And** the button cannot be clicked multiple times during processing

### AC-8: Progressive Loading Feedback Display
**Given** a user has clicked "Generate Flashcards" with valid configuration  
**When** the generation process starts  
**Then** a progress stepper appears showing four steps: "Reading document", "Extracting key concepts", "Generating questions", "Finalizing"  
**And** the first step ("Reading document") is highlighted as active  
**And** steps advance sequentially as processing continues  
**And** completed steps show a checkmark or completion indicator  
**And** each step remains visible for at least 1 second  
**And** the stepper cannot be dismissed during processing

### AC-9: Step Progression Through Workflow
**Given** generation is in progress  
**When** the system completes each processing stage  
**Then** the progress stepper advances to the next step  
**And** transitions between steps are smooth and animated  
**And** "Reading document" completes within 2-5 seconds for typical content  
**And** "Extracting key concepts" completes within 5-10 seconds  
**And** "Generating questions" completes within 10-20 seconds  
**And** "Finalizing" completes within 2-5 seconds  
**And** if any step exceeds 30 seconds, additional feedback is shown

### AC-10: Token Cost Estimate Display (If Implemented)
**Given** a user has provided valid content and configuration  
**When** they view the configuration page  
**Then** a token cost estimate is calculated and displayed  
**And** the estimate shows both token count and dollar amount  
**And** the estimate updates in real-time when configuration changes  
**And** a disclaimer states the estimate may vary  
**And** if estimation fails, "Unable to estimate" is shown  
**And** generation is not blocked by failed estimation

### AC-11: Successful Generation and Redirect
**Given** generation has completed successfully  
**When** the "Finalizing" step completes  
**Then** a success message is displayed ("Success! Generated X flashcards")  
**And** within 2 seconds, the user is redirected to the curation interface  
**And** the generated flashcards are passed to the curation interface  
**And** a loading indicator is shown during the redirect  
**And** the curation interface displays all generated flashcards

### AC-12: Content Validation Errors
**Given** a user attempts to generate flashcards  
**When** their text content is below minimum length (100 characters)  
**Then** an inline error message appears: "Please provide at least 100 characters"  
**And** the "Generate Flashcards" button remains disabled  
**When** content exceeds maximum length (50,000 characters)  
**Then** an error message appears: "Content too long. Maximum 50,000 characters"  
**And** the button remains disabled until content is within limits

### AC-13: File Upload Validation Errors
**Given** a user attempts to upload a file  
**When** the file format is not supported  
**Then** an error message appears listing supported formats  
**And** the file is not accepted  
**When** the file size exceeds 10MB (PDF) or 5MB (image)  
**Then** an error message specifies the size limit  
**And** the file is rejected  
**When** the file is corrupted or unreadable  
**Then** an error message explains the issue  
**And** suggests trying a different file

### AC-14: Generation API Errors
**Given** generation is in progress  
**When** the LLM API returns an error or times out  
**Then** the progress stepper pauses at the current step  
**And** an error modal or message appears with user-friendly text  
**And** a "Retry" button is prominently displayed  
**And** a "Start Over" option is available  
**And** clicking "Retry" attempts generation again with same configuration  
**And** technical error details are logged but not shown to user

### AC-15: Configuration Preservation During Errors
**Given** generation has failed with an error  
**When** the user views the error state  
**Then** their original content (text or file) is still present  
**And** their quantity slider position is preserved  
**And** their selected focus chips remain selected  
**And** their language selection is unchanged  
**And** they can click "Retry" without reconfiguring  
**And** they can click "Start Over" to reset everything

### AC-16: Multiple Focus Type Selection Logic
**Given** a user is selecting focus types  
**When** they select "Definitions" and "Q&A"  
**Then** both chips show as selected  
**When** they generate flashcards  
**Then** the LLM prompt includes instructions for both focus types  
**And** generated flashcards include a mix of both types  
**And** the configuration is passed correctly to the backend

### AC-17: Responsive Mobile Experience
**Given** a user accesses the page on a mobile device  
**When** they view the configuration interface  
**Then** the layout adapts to the smaller screen  
**And** all controls are touch-friendly (minimum 44x44px touch targets)  
**And** text is readable without zooming  
**And** the slider can be manipulated via touch  
**And** focus chips are appropriately sized and spaced  
**And** file upload includes camera option on mobile  
**And** no horizontal scrolling is required

### AC-18: Real-Time Configuration Feedback
**Given** a user is adjusting any configuration option  
**When** they move the quantity slider  
**Then** the displayed number updates immediately  
**When** they select/deselect focus chips  
**Then** visual state changes occur within 100ms  
**When** they change output language  
**Then** the dropdown updates instantly  
**And** if cost estimation is enabled, it recalculates within 500ms  
**And** all changes feel responsive and immediate

### AC-19: Processing Timeout Handling
**Given** generation is in progress  
**When** processing exceeds 60 seconds  
**Then** a warning message appears: "Processing is taking longer than expected..."  
**And** user is given option to "Keep Waiting" or "Cancel"  
**And** if user chooses "Keep Waiting", processing continues  
**And** if user chooses "Cancel", they return to configuration with content preserved  
**And** timeout event is logged for analysis

### AC-20: Network Interruption Recovery
**Given** generation is in progress  
**When** the user's network connection is lost  
**Then** the system detects the timeout within 10 seconds  
**And** an error message explains the connection issue  
**And** user's configuration and content are preserved  
**And** a "Retry" option is available  
**When** network is restored and user clicks "Retry"  
**Then** generation resumes with saved configuration

### AC-21: Empty or Missing Configuration Prevention
**Given** a user is on the configuration page  
**When** no content has been provided  
**Then** "Generate Flashcards" button is disabled  
**When** content is provided but no focus chips are selected  
**Then** button remains disabled with tooltip: "Please select at least one focus type"  
**When** all requirements are met  
**Then** button becomes enabled  
**And** generation can proceed

### AC-22: File Upload Security Validation
**Given** a user uploads any file  
**When** the file is received by the system  
**Then** file type is validated against allowed list  
**And** file size is checked against limits  
**And** file content is scanned for malicious patterns  
**And** only safe, valid files are processed  
**And** any security concerns result in rejection with generic error message  
**And** detailed security issues are logged internally

### AC-23: Quantity and Content Length Mismatch Handling
**Given** a user has uploaded short content (200 words)  
**When** they select 50 flashcards on the slider  
**Then** generation is allowed to proceed  
**When** processing completes  
**Then** system generates as many quality cards as possible (e.g., 8 cards)  
**And** displays message: "Generated 8 flashcards from your content (you requested 50)"  
**And** user is redirected to curation with the generated cards  
**And** this is not treated as an error

### AC-24: Configuration State Persistence (If Implemented)
**Given** a user has configured settings and generated flashcards  
**When** they return to the generation page later  
**Then** their last used quantity value is pre-set on the slider  
**And** their previously selected focus chips are pre-selected  
**And** their language preference is pre-selected  
**And** if persistence fails, defaults are used without error  
**And** user can manually change any persisted values

### AC-25: Accessibility Compliance
**Given** a user navigating with keyboard only  
**When** they tab through the interface  
**Then** all interactive elements are reachable via Tab key  
**And** focus indicators are clearly visible  
**And** slider can be adjusted with arrow keys  
**And** chips can be toggled with Space/Enter  
**And** dropdown can be opened and navigated with keyboard  
**And** screen reader announces all labels and state changes  
**And** ARIA attributes properly describe interactive elements

### AC-26: Language-Specific Output
**Given** a user has selected "Portuguese" as output language  
**When** they generate flashcards from English content  
**Then** the processing completes successfully  
**And** generated flashcard questions are in Portuguese  
**And** generated flashcard answers are in Portuguese  
**And** the content accurately reflects the original source material  
**And** language quality is appropriate for learning use

### AC-27: Focus Type Impact on Output
**Given** a user has selected only "Vocabulary" focus  
**When** they generate flashcards from content  
**Then** the majority of generated flashcards are term/definition format  
**Given** a user has selected "Q&A" and "Dates" focus  
**Then** generated flashcards include question/answer cards and date-related cards  
**And** the focus selection clearly influences the card types produced

---

## Appendix

### Related Documentation
- [OpenAI API - Chat Completions](https://platform.openai.com/docs/api-reference/chat)
- [OpenAI Vision API](https://platform.openai.com/docs/guides/vision)
- [Token Counting Guide](https://platform.openai.com/docs/guides/tokens)
- [PDF Text Extraction Libraries](https://github.com/topics/pdf-extraction)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

### Technology Options

#### File Upload Components
- **React Dropzone:** Popular drag & drop library for React
- **Next.js API Routes:** Built-in file upload handling
- **Multer:** Node.js middleware for file uploads (backend)

#### Progress/Stepper Components
- **Radix UI Progress:** Accessible progress component (already in project)
- **Custom Stepper:** Build on top of existing component library
- **Framer Motion:** For smooth animations between steps

#### Token Estimation Libraries
- **tiktoken:** OpenAI's official token counting library
- **gpt-3-encoder:** JavaScript token encoder
- **Server-side estimation:** More accurate using actual API tokenization

#### OCR/Text Extraction
- **OpenAI Vision API:** Multimodal LLM can read text from images
- **Tesseract.js:** Client-side OCR (may be slow)
- **Google Cloud Vision API:** High accuracy, additional cost
- **pdf-parse:** Node.js PDF text extraction
- **pdfjs-dist:** Mozilla's PDF.js for browser-based extraction

### Sample Configuration to Prompt Translation

```
User Configuration:
- Quantity: 15 cards
- Focus: ["Definitions", "Q&A"]
- Language: Portuguese
- Content: [user's text]

Translated Prompt Instructions:
"You are an educational content expert. Analyze the following text and generate 15 flashcards in Portuguese that help students learn the key concepts.

Focus your flashcards on:
- Definitions and explanations of key terms
- Question and answer pairs that test understanding

Instructions:
- Create exactly 15 flashcards
- Each flashcard should have a clear question or concept on the front
- Each answer should be concise but complete in Portuguese
- Mix flashcard types according to the focus areas above
- Ensure flashcards are educationally valuable

Format your response as:
[structured JSON or parseable format]

Content to analyze:
[USER_CONTENT_HERE]"
```

### Quantity Slider Design Considerations
- **Range:** 5-50 allows flexibility without overwhelming
- **Default:** 10 cards balances detail with review time
- **Step Size:** 1 card increments for precise control
- **Visual Marks:** Every 5 cards (5, 10, 15, 20...) for visual reference
- **Mobile Touch:** Slider thumb should be large enough for touch (44px minimum)

### Focus Type Definitions
| Focus Type | Description | Example Card Format | Use Case |
|------------|-------------|---------------------|----------|
| **Definitions** | Concept and explanation format | Q: "What is photosynthesis?" A: "The process by which plants convert light into energy..." | Science, technical terms |
| **Q&A** | Direct question and answer pairs | Q: "Who wrote 1984?" A: "George Orwell" | Facts, comprehension |
| **Dates** | Timeline and chronological information | Q: "When did WWII begin?" A: "September 1, 1939" | History, events |
| **Vocabulary** | Terms and their meanings | Q: "Ubiquitous" A: "Present everywhere; widespread" | Language learning |

### Cost Estimation Formula (Proposed)

```
Estimated Tokens = 
  Input Content Tokens + 
  Prompt Template Tokens + 
  (Flashcard Quantity × Average Tokens Per Card) +
  Complexity Multiplier

Where:
- Input Content Tokens = word_count × 1.3 (average tokens per word)
- Prompt Template Tokens = ~200-300 (fixed overhead)
- Average Tokens Per Card = ~150 tokens (question + answer)
- Complexity Multiplier = 1.0 (baseline) to 1.5 (multiple focus types)

Example:
Content: 1000 words = 1300 tokens
Prompt: 250 tokens
Cards: 15 × 150 = 2250 tokens
Multiplier: 1.2 (two focus types)
Total: (1300 + 250 + 2250) × 1.2 = 4,560 tokens

Cost: 4,560 tokens × $0.002 per 1K tokens = $0.009
Displayed: "~4,600 tokens / $0.01"
```

### Processing Step Timing Breakdown

| Step | Typical Duration | Actions |
|------|-----------------|---------|
| **Reading document** | 2-5 seconds | File upload, OCR/extraction if needed, content normalization |
| **Extracting key concepts** | 5-10 seconds | Initial LLM analysis, concept identification |
| **Generating questions** | 10-20 seconds | Main LLM generation, flashcard creation |
| **Finalizing** | 2-5 seconds | Response parsing, validation, data formatting |
| **Total** | 19-40 seconds | Average ~30 seconds for typical content |

### Accessibility Features Checklist
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible and clear
- [ ] Proper semantic HTML (buttons, inputs, labels)
- [ ] ARIA labels for custom components
- [ ] Screen reader announcements for dynamic changes
- [ ] Color contrast minimum 4.5:1
- [ ] Error messages announced to assistive tech
- [ ] Form validation accessible
- [ ] Progress updates announced
- [ ] No keyboard traps

### Mobile-Specific Considerations
- **Touch Targets:** Minimum 44x44px for all tappable elements
- **Viewport:** Responsive layout with no horizontal scroll
- **Input Methods:** Support touch, swipe, and pinch gestures where appropriate
- **Camera Access:** For image upload, offer camera option on mobile
- **Performance:** Optimize for mobile CPUs and memory
- **Network:** Handle slower mobile connections gracefully
- **Orientation:** Support both portrait and landscape

### Error Messages Reference

| Error Scenario | User Message | Action |
|---------------|--------------|--------|
| No content | "Please provide content to generate flashcards" | Disable button |
| Content too short | "Please provide at least 100 characters of content" | Inline validation |
| Content too long | "Content exceeds maximum length (50,000 characters)" | Inline validation |
| Invalid file type | "Unsupported file type. Please upload PDF, JPG, or PNG" | Upload rejection |
| File too large | "File size exceeds 10MB limit. Please upload a smaller file" | Upload rejection |
| Upload failed | "Upload failed. Please try again" | Retry option |
| OCR failure | "Unable to extract text from image. Please try a clearer image" | Retry option |
| API error | "Generation failed. Please try again in a moment" | Retry button |
| Timeout | "Processing is taking longer than expected. Continue waiting?" | Keep waiting / Cancel |
| Network error | "Connection lost. Please check your network and retry" | Retry button |
| No focus selected | "Please select at least one focus type" | Tooltip on button |

### Glossary
- **Configuration:** User-selected parameters that control flashcard generation (quantity, focus, language)
- **Focus Type:** Category of flashcard content (Definitions, Q&A, Dates, Vocabulary)
- **Token:** Unit of text processed by LLM; used for cost calculation
- **Cost Estimation:** Pre-generation calculation of expected token usage and cost
- **Progressive Feedback:** Step-by-step display of current processing stage
- **Curation:** Post-generation interface where users review and edit flashcards
- **Stepper:** Visual component showing progress through multi-step workflow
- **OCR:** Optical Character Recognition - extracting text from images
- **Drag & Drop:** Interface pattern for file upload by dragging file onto zone
- **Validation:** Checking user input meets requirements before processing

### Version History
- **v1.0** (2026-01-13): Initial PRD created from requirement issue

---

**End of Document**
