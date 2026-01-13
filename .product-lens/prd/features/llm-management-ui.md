# PRD: LLM Management UI & Default Provider Integration

**Feature Name:** llm-management-ui
**Created:** 2026-01-13
**Status:** Draft
**Related PRD:** ai-provider-configuration

---

## 1. Context & Problem

### Current State
The application has successfully implemented the backend infrastructure for LLM provider configuration through the `/api/llm/config` endpoints (POST and GET). Users can programmatically save and retrieve their LLM configurations (provider, model, and API key) via API. The configuration data is securely stored in the database with encrypted API keys.

However, two critical gaps remain:
1. **No user interface exists** for users to manage their LLM configurations through the application UI
2. **Hardcoded provider usage** persists in features like image-text-extraction, which directly calls OpenAI API instead of using the user's configured default LLM provider

### Problem
- **API-only access:** Users cannot configure or manage their LLM settings through the UI, requiring technical knowledge to interact directly with the API
- **Inconsistent provider usage:** The image-text-extraction endpoint (src/app/api/image-text-extraction/route.ts:31-58) is hardcoded to use OpenAI's gpt-4o-mini, bypassing the user's configured provider
- **Poor user experience:** Users who configure Anthropic as their provider still see OpenAI charges for image text extraction
- **Configuration invisibility:** Users cannot view, edit, or test their current LLM configuration without making API calls
- **Disconnected features:** The LLM configuration infrastructure exists but isn't integrated across all AI-powered features

### Why This Matters
The foundational LLM configuration system is incomplete without a management interface and consistent integration. Users expect to:
- Manage all settings through the UI without technical intervention
- Have their chosen LLM provider respected across all features
- See transparency in which provider is being used for each operation
- Test and validate their configuration before using AI features

Without these capabilities, the value of the user-managed LLM configuration is significantly diminished.

---

## 2. Objective

### Goal
Complete the LLM configuration feature by:
- Building an intuitive settings interface for users to manage their LLM provider configuration
- Integrating the user's default LLM configuration into all AI-powered features
- Ensuring consistent provider usage across the entire application
- Providing visibility and control over LLM settings

### What Will Change
- Users will access LLM configuration through Settings → Artificial Intelligence section
- Image text extraction will use the user's configured default LLM provider instead of hardcoded OpenAI
- All future AI features will automatically leverage the configured default provider
- Users can view, edit, test, and delete their LLM configuration through the UI
- Clear visual indicators will show which provider/model is currently configured

### Strategic Alignment
This feature aligns with product strategy to:
- **Complete infrastructure:** Finish the LLM configuration foundation started in ai-provider-configuration PRD
- **Enhance user control:** Give users full autonomy over their AI provider selection
- **Ensure consistency:** Respect user preferences across all AI-powered features
- **Improve UX:** Provide intuitive interfaces for technical configuration
- **Build trust:** Demonstrate transparency in provider usage and billing

---

## 3. Scope (In Scope)

### Included
- **Settings UI Page:** Dedicated interface at Settings → Artificial Intelligence for LLM management
- **Configuration Form:** Interface to input/update provider, model, and API key
- **Current Configuration Display:** View active provider and model without exposing API key
- **Connection Test Button:** Validate configuration with immediate feedback
- **Delete Configuration:** Ability to remove current LLM configuration
- **Image Text Extraction Migration:** Refactor route to use user's default LLM provider
- **Provider Adapter Usage:** Leverage existing AnthropicAdapter and OpenAIAdapter interfaces
- **Error Handling:** Clear messages when configuration is missing or invalid
- **Visual Feedback:** Loading states, success/error toasts, and validation messages
- **Responsive Design:** Mobile-friendly configuration interface

### Key Deliverables
- Settings page UI component for LLM configuration management
- Form components for provider selection, model selection, and API key input
- Integration of LLM configuration into image-text-extraction endpoint
- Reusable service/utility to fetch and use default LLM configuration
- Visual indicators showing current configuration status
- User documentation/help text explaining configuration steps

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Multiple provider profiles:** Managing more than one LLM configuration simultaneously
- **Feature-specific providers:** Different providers for different features (e.g., OpenAI for flashcards, Anthropic for extraction)
- **Usage analytics:** Tracking token consumption or API call costs
- **Provider comparison:** Side-by-side comparison of provider capabilities or costs
- **Advanced LLM parameters:** Temperature, max tokens, top-p configuration in UI
- **Automatic provider selection:** Smart selection based on task type or user history
- **API key management features:** Key rotation, expiration warnings, or multiple keys
- **Migration wizard:** Automatic migration of existing hardcoded features
- **Admin/team settings:** Organization-level LLM configuration management

### Intentional Limitations
This PRD focuses exclusively on:
1. Creating the missing UI layer for existing configuration capabilities
2. Migrating the single existing hardcoded feature (image-text-extraction) to use default configuration

All other AI features will be addressed separately in their respective implementation tasks.

---

## 5. Personas & Users

### Primary Persona: Self-Service AI User
**Profile:**
- Individual users who want to use their own LLM API keys
- Technical proficiency: Medium (comfortable obtaining API keys from provider dashboards)
- Has already obtained API keys from OpenAI or Anthropic
- Wants cost transparency and control over AI expenses

**Needs:**
- Simple, intuitive interface to configure LLM settings
- Confidence that their configured provider is being used consistently
- Ability to test configuration before using AI features
- Clear feedback when configuration is missing or invalid

**Pain Points:**
- Currently cannot configure LLM without API knowledge
- No visibility into which provider is being used for image extraction
- Cannot validate if their API key is working correctly
- Confusion when they configure Anthropic but OpenAI is still used

### Secondary Persona: Cost-Conscious Student
**Profile:**
- Uses the platform for study flashcard generation
- Limited budget, wants to optimize AI costs
- May prefer cheaper models (gpt-4o-mini) for most tasks
- Needs clear indication of what's configured and working

**Needs:**
- Transparent view of current configuration
- Easy way to switch between models
- Assurance that the chosen (cheaper) model is actually being used
- Simple error messages when something goes wrong

---

## 6. Main Flow (User Journey)

### Entry Points
1. **Settings Navigation:** User navigates to Settings → Artificial Intelligence
2. **Feature Gate Prompt:** When attempting to use image extraction without LLM configured, user is directed to settings
3. **First-time Setup:** Onboarding flow directs new users to configure LLM before AI features

### Happy Path: Configure LLM Provider

**Step 1:** Navigate to Settings → Artificial Intelligence
- User sees current configuration status (if any)
- Empty state shows prompt to configure provider

**Step 2:** Select Provider
- User chooses between OpenAI or Anthropic from dropdown
- Model dropdown updates to show provider-specific models

**Step 3:** Select Model
- User selects desired model (e.g., gpt-4o-mini, claude-3.5-sonnet)
- Help text explains model capabilities/costs

**Step 4:** Enter API Key
- User pastes API key into secure input field
- Input is masked (password-type field)
- Help link directs to provider's API key documentation

**Step 5:** Test Connection (Optional but Recommended)
- User clicks "Test Connection" button
- System validates API key with actual API call
- Success: Green checkmark with "Connection successful"
- Failure: Red error with specific message (invalid key, no credits, etc.)

**Step 6:** Save Configuration
- User clicks "Save Configuration"
- System encrypts and stores configuration
- Success toast: "LLM provider configured successfully"
- Configuration display updates to show active settings

### Happy Path: Use Image Text Extraction with Configured Provider

**Step 1:** User uploads image for text extraction
- System checks for LLM configuration

**Step 2:** System uses configured default provider
- If OpenAI configured: Uses OpenAI adapter with user's key
- If Anthropic configured: Uses Anthropic adapter with user's key
- No hardcoded provider selection

**Step 3:** Image text extraction completes
- User receives extracted text
- Provider used is transparent to user (their configured choice)

### Exit Points
- Configuration saved successfully → Return to previous page or continue to AI features
- Configuration deleted → Redirected to empty state in settings
- Configuration failed validation → Remains on settings page with error message

---

## 7. Business Rules

### Configuration Rules
- **One configuration per user:** Each user can have exactly one active LLM configuration
- **Required fields:** Provider, model, and API key are all mandatory
- **Provider-model validation:** Selected model must be valid for the selected provider
- **Encryption requirement:** API keys must be encrypted before storage
- **Update overwrites:** Saving a new configuration replaces the previous one completely

### Feature Gate Rules
- **Missing configuration:** AI features requiring LLM return 428 Precondition Required with message directing to settings
- **Invalid configuration:** Features fail gracefully with clear error message and retry option
- **Configuration deletion:** Deleting configuration immediately gates all AI features

### API Key Handling Rules
- **No exposure:** API keys are never displayed after initial save (show masked version or "Configured")
- **No logging:** API keys must never appear in logs or error messages
- **Secure transmission:** API key input must use HTTPS and secure form handling
- **Immediate encryption:** Keys are encrypted before database write

### Image Extraction Rules
- **Default provider usage:** Always use user's configured default provider
- **No fallback to OpenAI:** Do not fall back to hardcoded OpenAI if configuration missing
- **Vision capability check:** Validate that selected model supports vision tasks (gpt-4o, gpt-4o-mini, claude-3.5-sonnet)
- **Error transparency:** Return clear error if provider lacks vision capability

---

## 8. Functional Requirements (FR-x)

### FR-1: LLM Configuration Settings Page
**Priority:** Must-have

**User Story:**
As a user, I want to access a dedicated settings page for LLM configuration, so that I can manage my AI provider settings in one place.

**Acceptance Criteria:**
- Settings navigation includes "Artificial Intelligence" or "AI Settings" menu item
- Page displays current configuration status (provider, model, configured/not configured)
- Empty state provides clear call-to-action to configure LLM provider
- Page is accessible only to authenticated users
- Layout is responsive and mobile-friendly

---

### FR-2: Provider and Model Selection
**Priority:** Must-have

**User Story:**
As a user, I want to select my preferred LLM provider and model, so that I can choose the best option for my needs and budget.

**Acceptance Criteria:**
- Provider dropdown shows: OpenAI, Anthropic
- Model dropdown dynamically updates based on selected provider
- OpenAI shows: GPT-4o, GPT-4.1, GPT-4o-mini
- Anthropic shows: Claude 3.5 Sonnet, Claude 3 Opus
- Model display names are user-friendly (not technical IDs)
- Selection persists across form interactions

---

### FR-3: API Key Input and Security
**Priority:** Must-have

**User Story:**
As a user, I want to securely input my API key, so that my credentials are protected and never exposed.

**Acceptance Criteria:**
- API key input field is password-masked by default
- Optional "show/hide" toggle for API key visibility
- Help text links to provider's API key documentation (OpenAI, Anthropic)
- After save, API key is never displayed (shows "••••••" or "Configured")
- API key is encrypted before storage in database
- Form uses HTTPS and secure submission

---

### FR-4: Connection Testing
**Priority:** Must-have

**User Story:**
As a user, I want to test my API key before saving, so that I can be confident my configuration will work.

**Acceptance Criteria:**
- "Test Connection" button is available after entering all fields
- Button shows loading state during test (spinner + "Testing...")
- Success shows green checkmark with "Connection successful" message
- Failure shows red error with specific reason (invalid key, insufficient credits, network error)
- Test makes actual API call to provider to validate key
- Test result clears when configuration fields are modified

---

### FR-5: Save and Update Configuration
**Priority:** Must-have

**User Story:**
As a user, I want to save my LLM configuration, so that the application uses my chosen provider for AI features.

**Acceptance Criteria:**
- "Save Configuration" button available after all required fields filled
- Saving shows loading state (spinner + "Saving...")
- Success displays toast: "LLM provider configured successfully"
- Configuration immediately available to all AI features
- Saving updates existing configuration (does not create duplicate)
- Page updates to show new configuration without refresh

---

### FR-6: View Current Configuration
**Priority:** Must-have

**User Story:**
As a user, I want to see my current LLM configuration, so that I know which provider and model are active.

**Acceptance Criteria:**
- Configuration status clearly displays: Provider name, Model name, Status (Active)
- API key is masked (shown as "••••••" or "Configured")
- Configuration date/time is shown (e.g., "Configured on Jan 13, 2026")
- Visual indicator shows configuration is active (green badge/checkmark)
- Empty state shows "No LLM provider configured" when none exists

---

### FR-7: Delete Configuration
**Priority:** Should-have

**User Story:**
As a user, I want to delete my LLM configuration, so that I can remove my API key or switch providers.

**Acceptance Criteria:**
- "Delete Configuration" button available when configuration exists
- Confirmation dialog appears: "Are you sure? AI features will be disabled."
- Upon confirmation, configuration is deleted from database
- Success toast: "LLM configuration deleted"
- Page returns to empty state
- AI features are immediately gated (return error if attempted)

---

### FR-8: Image Text Extraction Uses Default Provider
**Priority:** Must-have

**User Story:**
As a user, I want image text extraction to use my configured LLM provider, so that I'm not charged by a provider I didn't select.

**Acceptance Criteria:**
- Image text extraction endpoint fetches user's LLM configuration from database
- If OpenAI configured, uses OpenAIAdapter with user's API key
- If Anthropic configured, uses AnthropicAdapter with user's API key
- No hardcoded provider or API key in image extraction route
- Returns 428 Precondition Required if no configuration exists
- Returns 500 Internal Server Error if configured model lacks vision capability
- Error messages clearly indicate configuration issue and direct to settings

---

### FR-9: Configuration Loading States
**Priority:** Must-have

**User Story:**
As a user, I want clear loading indicators, so that I understand when operations are in progress.

**Acceptance Criteria:**
- Page load shows skeleton or spinner while fetching configuration
- "Test Connection" button shows loading state (disabled + spinner)
- "Save Configuration" button shows loading state (disabled + spinner)
- "Delete Configuration" shows confirmation dialog with loading state
- All loading states prevent duplicate submissions
- Loading states have reasonable timeouts (10-30 seconds)

---

### FR-10: Error Handling and User Feedback
**Priority:** Must-have

**User Story:**
As a user, I want clear error messages, so that I can understand and fix configuration problems.

**Acceptance Criteria:**
- Invalid API key shows: "Invalid API key. Please check your key and try again."
- Network errors show: "Connection failed. Please check your internet connection."
- Missing configuration (when using AI feature) shows: "LLM provider not configured. Configure in Settings → AI."
- Server errors show: "An unexpected error occurred. Please try again."
- All error messages include actionable guidance
- Errors are displayed inline (for form fields) or as toasts (for operations)

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Security
**Requirement:** All API keys must be encrypted at rest using industry-standard encryption (AES-256 or equivalent)

**Acceptance Criteria:**
- API keys are encrypted before database write
- Encryption key is stored in environment variables, not in code
- API keys are never logged or exposed in error messages
- HTTPS is enforced for all configuration endpoints
- API key input uses secure form handling (no browser autocomplete)

---

### NFR-2: Performance
**Requirement:** Configuration operations must complete within acceptable time limits to maintain good UX

**Acceptance Criteria:**
- Fetch configuration: < 500ms
- Save configuration: < 2 seconds
- Test connection: < 10 seconds (depends on external API)
- Delete configuration: < 2 seconds
- Page load (including fetch): < 2 seconds

---

### NFR-3: Reliability
**Requirement:** Configuration system must gracefully handle failures without data loss

**Acceptance Criteria:**
- Failed saves do not partially update configuration
- Database transactions ensure atomicity of configuration updates
- API failures return proper HTTP status codes (400, 500, 503)
- Feature gates fail closed (block access) rather than fail open when configuration check fails
- Retry logic implemented for transient provider API failures

---

### NFR-4: Usability
**Requirement:** Configuration interface must be intuitive for users with medium technical proficiency

**Acceptance Criteria:**
- Zero-state page explains what LLM configuration is and why it's needed
- Help text provides links to provider API key documentation
- Form validation provides immediate feedback (not just on submit)
- Success and error states are visually distinct and clear
- Mobile interface is fully functional (not desktop-only)

---

### NFR-5: Maintainability
**Requirement:** Code must be modular and extensible for future provider additions

**Acceptance Criteria:**
- LLM adapter pattern is followed consistently
- Provider logic is separated from UI components
- Configuration fetching is abstracted into reusable service/hook
- Image extraction uses dependency injection for LLM adapter
- Adding new provider requires no changes to UI logic (only configuration)

---

## 10. Metrics & Success Criteria

### Adoption Metrics
**Metric:** Configuration completion rate
**Target:** 70% of users who visit settings page complete configuration
**Measurement:** Track users who land on AI settings vs. users who successfully save configuration

**Metric:** Time to configure
**Target:** < 5 minutes from landing on settings to successful save
**Measurement:** Track timestamp from page load to successful configuration save

---

### Usage Metrics
**Metric:** Image extraction adoption post-launch
**Target:** 50% increase in image extraction usage after provider integration
**Measurement:** Compare image extraction API calls 30 days pre vs. 30 days post-launch

**Metric:** Provider distribution
**Target:** Both OpenAI and Anthropic see > 20% usage share
**Measurement:** Track configured provider distribution across user base

---

### Quality Metrics
**Metric:** Configuration error rate
**Target:** < 5% of save attempts result in errors
**Measurement:** Track failed configuration saves vs. total attempts

**Metric:** Connection test success rate
**Target:** > 85% of tested connections succeed (indicates good key quality)
**Measurement:** Track successful vs. failed connection test attempts

---

### Experience Metrics
**Metric:** Settings page abandonment rate
**Target:** < 30% of users who start configuration abandon before completion
**Measurement:** Track users who interact with form fields but don't save

**Metric:** Support tickets related to LLM configuration
**Target:** < 10 tickets per month after launch
**Measurement:** Monitor support system for configuration-related issues

---

## 11. Risks & Dependencies

### Technical Risks

**Risk:** Provider API changes break connection testing or feature integration
**Mitigation:** Implement adapter pattern with clear interfaces; monitor provider changelogs; add integration tests

**Risk:** Encryption key compromise exposes user API keys
**Mitigation:** Use environment-based key management; implement key rotation capability; follow security best practices

**Risk:** Vision capability varies across models, breaking image extraction
**Mitigation:** Validate model vision capability at configuration time; provide clear error messages for unsupported models

---

### User Experience Risks

**Risk:** Users don't understand why they need to configure LLM provider
**Mitigation:** Provide clear onboarding messaging; add help documentation; show benefits of bring-your-own-key model

**Risk:** Users configure wrong model or provider and get unexpected costs
**Mitigation:** Show model descriptions with cost indicators; allow easy switching; provide connection test before save

**Risk:** Configuration process is too complex, reducing adoption
**Mitigation:** Keep form simple (3 fields max); provide helpful guidance; allow test before commit

---

### Dependencies

**Dependency:** Existing LLM configuration API endpoints (POST/GET /api/llm/config)
**Status:** ✅ Completed
**Impact:** Required for UI to function

**Dependency:** LLM adapters (OpenAIAdapter, AnthropicAdapter) and interfaces
**Status:** ✅ Completed
**Impact:** Required for image extraction migration

**Dependency:** Database schema for LLMConfiguration model
**Status:** ✅ Completed
**Impact:** Required for storing configuration

**Dependency:** Encryption utility for API key security
**Status:** ✅ Assumed completed (mentioned in prior PRD)
**Impact:** Critical for secure key storage

---

### External Dependencies

**Dependency:** OpenAI API availability and stability
**Impact:** Test connections and image extraction for OpenAI users depend on API uptime

**Dependency:** Anthropic API availability and stability
**Impact:** Test connections and image extraction for Anthropic users depend on API uptime

**Dependency:** Provider vision API consistency
**Impact:** Changes to vision API endpoints could break image extraction

---

## 12. Open Questions

### Product Questions
1. **Should we allow users to configure separate providers for different features?**
   - Current scope: Single default provider for all features
   - Future consideration: Feature-specific provider selection (e.g., OpenAI for flashcards, Anthropic for extraction)
   - Decision needed: Is this complexity warranted?

2. **Should configuration include advanced parameters (temperature, max tokens)?**
   - Current scope: Provider and model only
   - User feedback: Do power users need fine-grained control?
   - Trade-off: Simplicity vs. flexibility

3. **Should we provide cost estimates or usage tracking?**
   - Current scope: No cost tracking
   - User need: Transparency in API spending
   - Technical effort: Significant (requires API call logging and cost calculation)

---

### Technical Questions
1. **How do we handle models that don't support vision?**
   - Option A: Block configuration of vision-incompatible models
   - Option B: Allow configuration but show warning for image features
   - Option C: Feature-level validation (image extraction checks vision support at runtime)
   - **Recommendation:** Option C (runtime validation with clear error messages)

2. **Should connection test be mandatory before save?**
   - Option A: Optional (recommended but skippable)
   - Option B: Mandatory (cannot save without successful test)
   - **Recommendation:** Option A (reduces friction, user takes responsibility)

3. **How do we migrate existing users who may have been using hardcoded OpenAI?**
   - Impact: Existing users without configuration will lose image extraction access
   - Mitigation: Clear messaging on first failed attempt directing to configuration
   - Question: Should we show a one-time migration banner?

---

### UX Questions
1. **Where should the LLM settings page be located?**
   - Option A: Settings → Artificial Intelligence (dedicated section)
   - Option B: Account Settings → Integrations (grouped with other API integrations)
   - Option C: Top-level "AI Configuration" in main navigation
   - **Recommendation:** Option A (clear categorization, room for future AI settings)

2. **Should we show provider/model in use during feature execution?**
   - Example: "Extracting text using Claude 3.5 Sonnet..."
   - Benefit: Transparency and confirmation
   - Trade-off: Visual clutter, technical exposure
   - Decision needed: Does user need this visibility?

3. **What happens when a user updates configuration while AI operations are in flight?**
   - Current scope: No special handling (in-flight operations use previous config)
   - Future consideration: Cancel in-flight operations or show warning
   - Decision needed: Is this edge case worth handling now?

---

## 13. Acceptance Criteria (AC-x)

### AC-1: LLM Settings Page is Accessible
**Given** I am a logged-in user
**When** I navigate to Settings
**Then** I see an "Artificial Intelligence" or "AI Settings" menu item
**And** clicking it takes me to the LLM configuration page

---

### AC-2: Empty State Shows Clear Guidance
**Given** I am on the LLM settings page
**And** I have no configuration saved
**When** the page loads
**Then** I see an empty state message explaining LLM configuration
**And** I see a call-to-action to configure my provider
**And** I see links to obtain API keys from OpenAI and Anthropic

---

### AC-3: Provider Selection Updates Model Options
**Given** I am on the LLM configuration form
**When** I select "OpenAI" from the provider dropdown
**Then** the model dropdown shows: GPT-4o, GPT-4.1, GPT-4o-mini
**When** I select "Anthropic" from the provider dropdown
**Then** the model dropdown shows: Claude 3.5 Sonnet, Claude 3 Opus

---

### AC-4: API Key is Securely Handled
**Given** I am entering my API key
**When** I type into the API key field
**Then** the characters are masked (password input)
**When** I click "Show API Key" toggle
**Then** the API key is temporarily visible
**When** I save my configuration
**Then** the API key is encrypted before storage
**And** subsequent page visits show "••••••" instead of the actual key

---

### AC-5: Connection Test Validates Configuration
**Given** I have entered provider, model, and API key
**When** I click "Test Connection"
**Then** the button shows a loading state
**And** the system makes an API call to the selected provider using my key
**When** the test succeeds
**Then** I see a green success message: "Connection successful"
**When** the test fails
**Then** I see a red error message with the specific reason (e.g., "Invalid API key")

---

### AC-6: Configuration is Saved Successfully
**Given** I have filled all required fields (provider, model, API key)
**When** I click "Save Configuration"
**Then** the button shows a loading state
**And** my configuration is saved to the database with encrypted API key
**When** the save succeeds
**Then** I see a success toast: "LLM provider configured successfully"
**And** the page updates to show my active configuration
**And** the form resets or switches to "edit mode"

---

### AC-7: Current Configuration is Displayed
**Given** I have a saved LLM configuration
**When** I visit the LLM settings page
**Then** I see my configured provider name (e.g., "OpenAI")
**And** I see my configured model name (e.g., "GPT-4o Mini")
**And** I see "••••••" in place of my API key
**And** I see the configuration date (e.g., "Configured on Jan 13, 2026")
**And** I see a status indicator showing "Active" or "Configured"

---

### AC-8: Configuration Can Be Updated
**Given** I have an existing LLM configuration
**When** I change the provider, model, or API key
**And** I click "Save Configuration"
**Then** my existing configuration is updated (not duplicated)
**And** I see a success toast: "LLM configuration updated"
**And** the new configuration is immediately active for AI features

---

### AC-9: Configuration Can Be Deleted
**Given** I have an existing LLM configuration
**When** I click "Delete Configuration"
**Then** I see a confirmation dialog: "Are you sure? AI features will be disabled."
**When** I click "Confirm"
**Then** my configuration is deleted from the database
**And** I see a success toast: "LLM configuration deleted"
**And** the page shows the empty state
**And** AI features return errors if attempted

---

### AC-10: Image Extraction Uses Configured Provider (OpenAI)
**Given** I have configured OpenAI as my provider with gpt-4o-mini
**When** I upload an image for text extraction
**Then** the system fetches my LLM configuration
**And** the image extraction uses OpenAI API with my API key
**And** the extraction uses my configured model (gpt-4o-mini)
**And** the extracted text is returned successfully

---

### AC-11: Image Extraction Uses Configured Provider (Anthropic)
**Given** I have configured Anthropic as my provider with claude-3.5-sonnet
**When** I upload an image for text extraction
**Then** the system fetches my LLM configuration
**And** the image extraction uses Anthropic API with my API key
**And** the extraction uses my configured model (claude-3.5-sonnet)
**And** the extracted text is returned successfully

---

### AC-12: Image Extraction Fails Without Configuration
**Given** I have NOT configured any LLM provider
**When** I attempt to upload an image for text extraction
**Then** the API returns HTTP 428 Precondition Required
**And** the error message says: "LLM provider not configured. Please configure in Settings → AI."
**And** the UI shows a message directing me to settings
**And** clicking the message takes me to the LLM configuration page

---

### AC-13: Form Validation Prevents Invalid Submission
**Given** I am on the LLM configuration form
**When** I try to save without selecting a provider
**Then** I see an error: "Provider is required"
**When** I try to save without selecting a model
**Then** I see an error: "Model is required"
**When** I try to save without entering an API key
**Then** I see an error: "API key is required"
**And** the save button is disabled until all fields are valid

---

### AC-14: Loading States Prevent Duplicate Operations
**Given** I have clicked "Save Configuration"
**When** the save operation is in progress
**Then** the save button is disabled and shows a spinner
**And** I cannot click the button again
**When** the operation completes
**Then** the button re-enables
**And** I can perform another operation

---

### AC-15: Mobile Interface is Fully Functional
**Given** I am on a mobile device (screen width < 768px)
**When** I access the LLM settings page
**Then** the form is responsive and touch-friendly
**And** all dropdowns work correctly on mobile
**And** the API key input allows paste from mobile keyboard
**And** buttons are large enough for touch interaction
**And** all features work identically to desktop

---

