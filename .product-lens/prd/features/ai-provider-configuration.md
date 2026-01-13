# PRD: AI Provider Configuration

**Feature Name:** ai-provider-configuration  
**Created:** 2026-01-12  
**Status:** Draft  
**Source Issue:** [Requirement] ai-provider-configuration

---

## 1. Context & Problem

### Current State
The application enables users to submit content in various formats (PDF, video, images) to automatically generate study flashcards using Large Language Models (LLMs). Currently, the platform would need to either embed a single proprietary API or absorb the direct costs of LLM usage, limiting scalability and flexibility.

### Problem
- **Vendor Lock-in:** Being tied to a single LLM provider prevents flexibility and rapid evolution as new models emerge
- **Cost Burden:** The platform absorbing LLM costs creates an unsustainable scaling challenge
- **Limited User Control:** Advanced users cannot optimize the cost-to-quality ratio based on their specific needs
- **Missing Infrastructure:** Without a structured mechanism to configure LLM usage, AI-powered features cannot function
- **Security Risk:** API keys and sensitive credentials require secure storage and management

### Why This Matters
The choice of LLM provider and model directly impacts both the quality of generated flashcards and the cost per generation. By allowing users to configure their own LLM provider:
- The platform remains economically viable at scale
- Users gain control over their AI spending and model selection
- The application can rapidly adopt new models and providers as they emerge
- Power users receive the flexibility they expect from modern tools
- The product establishes itself as a transparent, user-controlled solution

---

## 2. Objective

### Goal
Build a secure, user-friendly configuration system that enables users to:
- Connect their own LLM provider API credentials
- Select from supported providers (OpenAI, Anthropic)
- Choose specific models within their selected provider
- Validate their configuration before use
- Manage and update their settings as needed

### What Will Change
- Users will need to configure an LLM provider before using AI-powered features
- The application will support multiple LLM providers through a unified abstraction layer
- API keys will be securely stored and never exposed after initial configuration
- AI-powered features will be gated behind valid LLM configuration
- Users will have visibility into their provider and model selection

### Strategic Alignment
This feature aligns with the product strategy to:
- **Enable Scalability:** Remove direct LLM costs from the platform's operating expenses
- **Empower Users:** Provide advanced users with control over AI quality and cost
- **Future-Proof Architecture:** Create extensible infrastructure for emerging LLM providers
- **Establish Foundation:** Build the prerequisite for all AI-powered flashcard generation features

---

## 3. Scope (In Scope)

### Included
- **Provider Support:** Initial support for OpenAI and Anthropic LLM providers
- **Model Selection:** Ability to choose specific models from each provider:
  - OpenAI: GPT-4o, GPT-4.1, GPT-4o-mini
  - Anthropic: Claude 3.5 Sonnet, Claude 3 Opus
- **API Key Configuration:** Secure input and storage of provider API keys
- **Connection Testing:** Immediate validation of API credentials
- **Configuration Management:** Ability to view, edit, and update LLM settings
- **Feature Gating:** Block AI features for users without valid configuration
- **Configuration UI:** Dedicated interface for LLM provider setup
- **Onboarding Flow:** Context-aware prompts directing users to configure LLM when needed

### Key Deliverables
- LLM provider configuration interface (Settings → Artificial Intelligence)
- API key input with secure handling
- Provider and model selection dropdowns
- Connection test functionality
- Encrypted storage of API credentials
- LLM provider abstraction layer
- Feature gate checking for AI functionality
- User guidance and error messaging

---

## 4. Non-Objectives (Out of Scope)

### Explicitly NOT Included
- **Additional Providers:** Support for providers beyond OpenAI and Anthropic (e.g., Google PaLM, Cohere, local models)
- **Multiple Configurations:** Users managing multiple provider configurations simultaneously
- **Cost Tracking:** Monitoring or reporting on user's LLM API usage or costs
- **Provider Recommendations:** Suggesting which provider or model to use
- **Fallback Providers:** Automatic switching to alternative provider on failure
- **API Key Rotation:** Automatic key rotation or expiration management
- **Team/Organization Settings:** Shared LLM configuration across multiple users
- **Provider Status Monitoring:** Tracking uptime or availability of LLM providers
- **Model Fine-tuning:** Ability to use custom fine-tuned models
- **Advanced Configuration:** Temperature, top-p, or other LLM-specific parameters

### Intentional Limitations
This is a foundational implementation focused on establishing the core infrastructure for user-managed LLM configuration. Advanced features like multi-provider support, usage analytics, and parameter tuning are explicitly deferred to future iterations.

---

## 5. Personas & Users

### Primary Persona: Cost-Conscious Learner
- **Profile:** Student or self-directed learner with budget awareness
- **Needs:** Control over AI costs while maintaining quality
- **Pain Points:** Subscription fatigue; wants to pay only for what they use
- **Technical Proficiency:** Intermediate; comfortable obtaining and managing API keys
- **Goal:** Use powerful AI for flashcard generation without unpredictable costs
- **API Key Access:** Willing to create and manage their own LLM provider account

### Secondary Persona: Power User / Developer
- **Profile:** Technical professional who understands LLM capabilities
- **Needs:** Flexibility to choose optimal model for their use case
- **Pain Points:** Frustrated by platforms that restrict AI provider choice
- **Technical Proficiency:** Advanced; familiar with different LLM providers and models
- **Goal:** Optimize cost-to-quality ratio based on content complexity
- **Experimentation:** May want to test different models for different content types

### Tertiary Persona: Privacy-Focused Professional
- **Profile:** Professional handling sensitive or proprietary content
- **Needs:** Control over which AI provider processes their data
- **Pain Points:** Concerned about data privacy and provider trust
- **Technical Proficiency:** Intermediate to advanced
- **Goal:** Ensure content is processed by their chosen, trusted provider
- **Compliance:** May have regulatory requirements influencing provider choice

### Anti-Persona: Non-Technical Casual User
- **Profile:** User uncomfortable with technical setup or API concepts
- **Challenge:** May struggle with obtaining and configuring API keys
- **Note:** This feature creates friction for non-technical users; future iterations should consider simplified alternatives or guided setup

---

## 6. Main Flow (User Journey)

### Happy Path: First-Time LLM Configuration

1. **Entry Point:** User attempts to generate flashcards for the first time
2. **Feature Gate Detection:** System detects absence of LLM configuration
3. **Informative Prompt:** System displays message:
   > "To generate flashcards automatically, you need to configure an AI provider."
4. **Guided Navigation:** User clicks "Configure AI Provider" button
5. **Configuration Page:** User lands on Settings → Artificial Intelligence page
6. **Provider Selection:** User selects provider from dropdown (OpenAI or Anthropic)
7. **Model Selection:** Dropdown updates with available models for chosen provider
8. **Model Choice:** User selects desired model (e.g., GPT-4o or Claude 3.5 Sonnet)
9. **API Key Input:** User pastes API key into masked text field
10. **Connection Test:** User clicks "Test Connection" button
11. **Validation Success:** System validates key with test API call, shows success message
12. **Save Configuration:** User clicks "Save" button
13. **Secure Storage:** System encrypts and stores configuration
14. **Confirmation:** Success message displayed
15. **Return to Feature:** User returns to flashcard generation
16. **Feature Access:** User can now generate flashcards
17. **Exit Point:** AI-powered features are fully accessible

### Alternative Flow: Invalid API Key

- Step 11: Connection test fails
- System displays specific error message (invalid key, no permissions, rate limit, etc.)
- User can correct API key and retry test
- Process repeats from step 9

### Alternative Flow: Edit Existing Configuration

- Entry: User accesses Settings → Artificial Intelligence
- System displays current provider and model (API key remains masked)
- User can change provider, model, or update API key
- Must test and save changes
- Previous configuration is replaced

### Alternative Flow: Network Error During Test

- Step 11: Network error occurs during connection test
- System displays user-friendly error message
- User can retry test
- System logs technical details for debugging

---

## 7. Business Rules

### BR-1: Configuration Requirement
- Users cannot access AI-powered flashcard generation without valid LLM configuration
- System must check for valid configuration before allowing AI feature access
- Clear guidance must be provided when configuration is missing

### BR-2: Provider-Model Relationship
- Each provider has a specific set of supported models
- Model selection dropdown must dynamically update based on provider selection
- Invalid provider-model combinations must be prevented

### BR-3: API Key Security
- API keys must be encrypted before storage in the database
- API keys must never be transmitted to the client after initial save
- API keys must not appear in logs, error messages, or debug output
- System should display only masked version of stored keys (e.g., "sk-...xyz123")

### BR-4: Connection Validation
- API keys must be validated via actual API call before saving
- Test call should use minimal resources (e.g., simple prompt or list models endpoint)
- Validation must confirm both authentication and authorization
- Failed validation must block configuration save

### BR-5: Single Active Configuration
- Users can only have one active LLM configuration at a time
- Changing configuration replaces the previous setup
- No history or versioning of configurations in initial version

### BR-6: Configuration Visibility
- Users can view their current provider and selected model
- Users cannot view the full API key after it's been saved
- System should indicate when configuration is present and valid

### BR-7: Feature Gating
- All AI-dependent features must check for valid configuration
- Users without configuration should receive contextual prompts
- Feature gates should be implemented at both UI and API levels

---

## 8. Functional Requirements (FR-x)

### FR-1: Configuration Interface (Must-Have)
**User Story:** As a user, I want to access a dedicated configuration page for AI settings, so that I can set up my LLM provider.

**Acceptance Criteria:**
- Configuration page accessible via Settings → Artificial Intelligence
- Page clearly explains purpose and requirements
- Interface is clean and focused on configuration task
- Help text provides guidance on obtaining API keys
- Page is responsive across desktop and mobile devices

### FR-2: Provider Selection (Must-Have)
**User Story:** As a user, I want to select my preferred LLM provider, so that I can use my existing API credentials.

**Acceptance Criteria:**
- Dropdown displays "OpenAI" and "Anthropic" as options
- Default state prompts user to select a provider
- Selection updates available models
- Clear labeling of each provider option
- Selection persists after page refresh during configuration session

### FR-3: Model Selection (Must-Have)
**User Story:** As a user, I want to choose a specific model from my selected provider, so that I can control the quality and cost of AI processing.

**Acceptance Criteria:**
- Model dropdown is disabled until provider is selected
- OpenAI models include: gpt-4o, gpt-4.1, gpt-4o-mini
- Anthropic models include: claude-3.5-sonnet, claude-3-opus
- Model names are displayed in user-friendly format
- Selected model is clearly indicated
- Selection updates when provider changes

### FR-4: API Key Input (Must-Have)
**User Story:** As a user, I want to securely enter my API key, so that the application can authenticate with my LLM provider.

**Acceptance Criteria:**
- Text input field is properly labeled "API Key"
- Input is masked (password-style) to prevent shoulder surfing
- Placeholder text provides format guidance (e.g., "sk-..." for OpenAI)
- Input field supports paste operations
- Help text links to provider documentation for obtaining keys
- Field validation prevents empty submission

### FR-5: Connection Test (Must-Have)
**User Story:** As a user, I want to test my API key before saving, so that I know it works correctly.

**Acceptance Criteria:**
- "Test Connection" button is prominently displayed
- Button is disabled if provider, model, or API key is empty
- Clicking button initiates API validation call
- Loading indicator displayed during test
- Success state shows clear positive feedback
- Error state displays specific failure reason
- Test uses minimal API resources
- Test confirms both authentication and authorization

### FR-6: Configuration Save (Must-Have)
**User Story:** As a user, I want to save my verified configuration, so that I can use AI features throughout the application.

**Acceptance Criteria:**
- "Save" button available after successful connection test
- Save button is disabled until test succeeds
- Clicking save encrypts and stores configuration
- Success confirmation displayed after save
- Configuration persists across sessions
- User is informed that configuration is now active

### FR-7: Encrypted Storage (Must-Have)
**User Story:** As a system, I need to securely store API keys, so that user credentials are protected from unauthorized access.

**Acceptance Criteria:**
- API keys encrypted before database storage
- Encryption uses industry-standard algorithm (AES-256 or equivalent)
- Encryption keys stored separately from encrypted data
- Decryption only occurs on backend for API calls
- No plain-text API keys in database
- Encrypted data cannot be reverse-engineered from database access

### FR-8: Configuration Retrieval (Must-Have)
**User Story:** As a user, I want to see my current configuration, so that I know which provider and model are active.

**Acceptance Criteria:**
- Configuration page displays current provider if configured
- Configuration page displays current model if configured
- API key displayed in masked format (e.g., "sk-...xyz123")
- Clear indication if no configuration exists
- "Last tested" or "Status: Active" indicator shown
- User can easily identify what is configured

### FR-9: Configuration Edit (Must-Have)
**User Story:** As a user, I want to change my LLM configuration, so that I can switch providers or models as needed.

**Acceptance Criteria:**
- Edit mode allows changing provider, model, or API key
- Changing provider updates available models
- New configuration must be tested before saving
- Previous configuration replaced on successful save
- No "undo" required; user can reconfigure at any time
- Clear warning if changing active configuration

### FR-10: Feature Gate Implementation (Must-Have)
**User Story:** As a system, I need to block AI features for unconfigured users, so that the application doesn't fail when LLM is required.

**Acceptance Criteria:**
- All AI-dependent features check for valid configuration
- Unconfigured users see informative blocking message
- Message includes call-to-action to configure provider
- CTA button navigates directly to configuration page
- Feature gates implemented at both UI and API levels
- Clear distinction between "not configured" and "configuration error"

### FR-11: Provider Abstraction Layer (Must-Have)
**User Story:** As a system, I need a unified interface for different LLM providers, so that business logic doesn't depend on specific provider implementations.

**Acceptance Criteria:**
- Common interface defined for LLM operations (e.g., generateFlashCards)
- OpenAI provider implementation follows interface
- Anthropic provider implementation follows interface
- Business logic uses abstraction, not specific providers
- New providers can be added by implementing interface
- Provider selection at runtime based on user configuration

### FR-12: Connection Test Implementation (Must-Have)
**User Story:** As a system, I need to validate API credentials with actual provider calls, so that invalid configurations are caught early.

**Acceptance Criteria:**
- Test makes minimal API call to selected provider
- OpenAI test uses appropriate endpoint (e.g., /v1/models)
- Anthropic test uses appropriate endpoint
- Test confirms authentication (401 errors caught)
- Test confirms authorization (403 errors caught)
- Test distinguishes network errors from credential errors
- Test response time is reasonable (< 10 seconds)

### FR-13: Error Handling and Feedback (Must-Have)
**User Story:** As a user, I want clear error messages when configuration fails, so that I can resolve issues quickly.

**Acceptance Criteria:**
- Invalid API key produces specific error message
- Insufficient permissions produces specific error message
- Rate limit errors identified and explained
- Network errors distinguished from credential errors
- Error messages provide actionable guidance
- Errors don't expose sensitive system details
- Technical errors logged for debugging

### FR-14: Configuration Validation (Should-Have)
**User Story:** As a system, I need to validate configuration inputs, so that invalid data doesn't cause runtime errors.

**Acceptance Criteria:**
- Provider selection validates against allowed providers
- Model selection validates against provider's model list
- API key format validation (basic structure check)
- Empty field validation prevents submission
- Invalid combinations prevented before test
- Client-side and server-side validation

### FR-15: Onboarding Guidance (Should-Have)
**User Story:** As a new user, I want clear guidance on configuring my LLM provider, so that I understand what's required and why.

**Acceptance Criteria:**
- First-time users see explanatory content
- Instructions for obtaining API keys from each provider
- Links to provider documentation
- Explanation of why configuration is needed
- Expected cost implications mentioned
- Privacy and security reassurances provided

---

## 9. Non-Functional Requirements (NFR-x)

### NFR-1: Security
- **API Key Encryption:** All API keys must be encrypted at rest using AES-256 or equivalent
- **Transmission Security:** All configuration data transmitted over HTTPS only
- **Key Isolation:** Encryption keys stored separately from application database
- **Access Control:** API keys only decrypted in backend services, never sent to client
- **Logging Safety:** API keys never logged in plain text
- **Input Sanitization:** All configuration inputs sanitized to prevent injection attacks
- **Session Security:** Configuration changes require authenticated session

### NFR-2: Performance
- **Configuration Load:** Configuration page loads within 2 seconds
- **Connection Test:** API validation completes within 5-10 seconds
- **Configuration Save:** Save operation completes within 3 seconds
- **Feature Gate Check:** Configuration validation for feature access < 100ms
- **Caching:** User configuration cached to avoid repeated database queries
- **API Efficiency:** Test calls use minimal provider resources

### NFR-3: Reliability
- **Error Recovery:** Graceful handling of provider API unavailability
- **Validation Robustness:** Connection tests handle all common error scenarios
- **Data Integrity:** Configuration cannot be saved in invalid state
- **Transaction Safety:** Configuration updates are atomic operations
- **Fallback Messaging:** Clear user feedback when systems unavailable

### NFR-4: Usability
- **Clarity:** Configuration purpose and requirements immediately clear
- **Guidance:** Contextual help available throughout configuration flow
- **Feedback:** Immediate feedback on all user actions
- **Error Clarity:** Error messages actionable and non-technical
- **Mobile Support:** Configuration interface functional on mobile devices
- **Accessibility:** WCAG 2.1 Level AA compliance for configuration interface

### NFR-5: Maintainability
- **Provider Abstraction:** Clean separation between provider implementations
- **Extensibility:** New providers addable without modifying core logic
- **Configuration Management:** Environment-based configuration for provider endpoints
- **Code Documentation:** Clear documentation of encryption and provider integration
- **Testing:** Unit tests for provider abstraction and integration tests for each provider

### NFR-6: Scalability
- **Concurrent Configuration:** Support 100+ simultaneous configuration operations
- **Database Performance:** Configuration queries optimized with proper indexing
- **Caching Strategy:** User configurations cached appropriately
- **Provider API Limits:** Respect rate limits of each provider during tests

### NFR-7: Compliance
- **Data Privacy:** Comply with GDPR, CCPA regarding API key storage
- **Provider Terms:** Ensure usage complies with OpenAI and Anthropic terms of service
- **Audit Trail:** Log configuration changes (without exposing keys) for security auditing
- **Right to Deletion:** Support user request to delete stored API keys

### NFR-8: Observability
- **Configuration Metrics:** Track configuration completion rates
- **Provider Distribution:** Monitor which providers/models users choose
- **Error Tracking:** Log all configuration and validation errors
- **Performance Monitoring:** Track API test response times
- **Usage Patterns:** Understand configuration update frequency

---

## 10. Metrics & Success Criteria

### Primary Metrics

#### M-1: Configuration Completion Rate
- **Definition:** Percentage of users who complete LLM configuration after encountering feature gate
- **Target:** ≥ 60% completion within first attempt
- **Measurement:** (Users with saved config / Users who reached config page) × 100
- **Collection:** Analytics tracking on configuration flow
- **Importance:** Validates that configuration process is achievable

#### M-2: Connection Test Success Rate
- **Definition:** Percentage of connection tests that succeed on first attempt
- **Target:** ≥ 70% first-attempt success rate
- **Measurement:** (Successful tests / Total test attempts) × 100
- **Collection:** Backend logging of test outcomes
- **Importance:** Indicates clarity of instructions and user API key readiness

#### M-3: Time to Configuration Completion
- **Definition:** Median time from reaching config page to successful save
- **Target:** ≤ 5 minutes for users with pre-existing API key
- **Measurement:** Track timestamps from page load to save confirmation
- **Collection:** Client-side analytics
- **Importance:** Measures friction in configuration process

### Secondary Metrics

#### M-4: Provider Distribution
- **Definition:** Breakdown of which providers users choose
- **Target:** No specific target; informational
- **Measurement:** Count of configurations by provider
- **Collection:** Database query of user configurations
- **Importance:** Informs future provider prioritization

#### M-5: Configuration Error Rate
- **Definition:** Percentage of save attempts that fail due to errors
- **Target:** ≤ 10% error rate
- **Measurement:** (Failed saves / Total save attempts) × 100
- **Collection:** Backend error logging
- **Importance:** Identifies issues in validation or storage logic

#### M-6: Configuration Update Frequency
- **Definition:** How often users modify their existing configuration
- **Target:** < 5% of users update within 30 days
- **Measurement:** Count configuration updates per user per time period
- **Collection:** Database audit log
- **Importance:** Low updates indicate stable configuration; high updates may indicate problems

#### M-7: Feature Gate Encounter Rate
- **Definition:** Percentage of new users who encounter AI feature gate
- **Target:** 100% (validates gate is working)
- **Measurement:** Track users shown configuration prompt
- **Collection:** Analytics on feature gate displays
- **Importance:** Ensures all users guided to configuration

### Long-term Success Indicators

- **AI Feature Usage:** Users with configured LLM actively use flashcard generation
- **Support Tickets:** Low volume of configuration-related support requests
- **Configuration Retention:** Users maintain valid configuration over time
- **Security Incidents:** Zero breaches of stored API credentials

---

## 11. Risks & Dependencies

### High-Priority Risks

#### R-1: User Friction from Configuration Requirement
- **Risk:** Requiring API key configuration creates barrier to entry, reducing conversion
- **Impact:** High - May prevent users from trying core product features
- **Probability:** High
- **Mitigation:**
  - Clear value proposition before configuration requirement
  - Excellent guidance and documentation
  - Consider time-limited trial with platform-provided credits (future)
  - A/B test configuration messaging
  - Provide video walkthrough of API key creation

#### R-2: API Key Security Breach
- **Risk:** Stored API keys compromised through security vulnerability
- **Impact:** Critical - User credentials exposed, trust destroyed
- **Probability:** Low (with proper implementation)
- **Mitigation:**
  - Follow security best practices for encryption
  - Regular security audits and penetration testing
  - Separate encryption key storage
  - Monitor for unusual API usage patterns
  - Rapid incident response plan
  - Consider using key management service (AWS KMS, etc.)

#### R-3: Provider API Changes
- **Risk:** OpenAI or Anthropic changes API, breaking integration
- **Impact:** High - Feature becomes unusable for affected provider
- **Probability:** Medium
- **Mitigation:**
  - Monitor provider changelogs and announcements
  - Implement versioned API calls
  - Build error detection for API changes
  - Quick rollout capability for updates
  - Maintain communication channels with provider support

### Medium-Priority Risks

#### R-4: Complex Error Scenarios
- **Risk:** Diverse error conditions from providers difficult to handle gracefully
- **Impact:** Medium - Poor user experience during failures
- **Probability:** Medium
- **Mitigation:**
  - Comprehensive error mapping from provider APIs
  - Extensive testing of error scenarios
  - Generic fallback error messages
  - Detailed logging for debugging
  - User-friendly error documentation

#### R-5: User Confusion About API Keys
- **Risk:** Users struggle to obtain or understand API keys from providers
- **Impact:** Medium - High drop-off during configuration
- **Probability:** Medium-High
- **Mitigation:**
  - Step-by-step documentation with screenshots
  - Video tutorials for each provider
  - FAQ covering common issues
  - Consider in-app chat support during configuration
  - Clear cost expectations for API usage

#### R-6: Model Availability Changes
- **Risk:** Providers deprecate models or change model names
- **Impact:** Medium - Configurations become invalid
- **Probability:** Medium
- **Mitigation:**
  - Model configuration stored as provider-specific identifier
  - Detect deprecated models and notify users
  - Allow easy model updates
  - Monitor provider model catalog changes

### Low-Priority Risks

#### R-7: Connection Test Costs
- **Risk:** Users repeatedly testing connections incur micro-costs on their API accounts
- **Impact:** Low - Minor cost concern for users
- **Probability:** Medium
- **Mitigation:**
  - Use cheapest possible test endpoint
  - Rate limit connection tests per session
  - Warn users that tests consume API credits
  - Cache successful test results temporarily

### Dependencies

#### D-1: OpenAI API Access (External - Critical)
- **Type:** External Service
- **Status:** Publicly available
- **Requirements:** 
  - OpenAI API endpoints accessible
  - Stable API for model listing and validation
- **Owner:** OpenAI
- **Mitigation:** Monitor OpenAI status page, have error handling for outages

#### D-2: Anthropic API Access (External - Critical)
- **Type:** External Service
- **Status:** Publicly available
- **Requirements:**
  - Anthropic API endpoints accessible
  - Stable API for validation
- **Owner:** Anthropic
- **Mitigation:** Monitor Anthropic status, implement provider-specific error handling

#### D-3: Encryption Infrastructure (Internal - Critical)
- **Type:** Infrastructure
- **Status:** Must be implemented
- **Requirements:**
  - Encryption library or service
  - Secure key management
  - Key storage solution
- **Owner:** Backend Team, Security Team
- **Timeline:** Must be available before feature implementation

#### D-4: User Authentication System (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Assumed existing (based on Settings context)
- **Requirements:**
  - User identification for configuration storage
  - Authenticated sessions for configuration access
- **Owner:** Authentication Team
- **Note:** Configuration is per-user, requires user context

#### D-5: Database Schema (Internal - Critical)
- **Type:** Internal Dependency
- **Status:** Must be designed and implemented
- **Requirements:**
  - Table/collection for storing user configurations
  - Fields for provider, model, encrypted API key
  - Proper indexing for performance
- **Owner:** Database Team, Backend Team

#### D-6: Settings UI Framework (Internal - Medium)
- **Type:** Frontend Dependency
- **Status:** Assumed existing
- **Requirements:**
  - Settings page navigation structure
  - UI components for forms and dropdowns
- **Owner:** Frontend Team

---

## 12. Open Questions

### Technical Questions

#### Q-1: Encryption Key Management
- **Question:** Should encryption keys be managed by application or external service (AWS KMS, Azure Key Vault)?
- **Context:** Affects security posture and infrastructure complexity
- **Impact:** Implementation approach and security guarantees
- **Stakeholders:** Backend Team, Security Team, DevOps
- **Status:** **Needs decision** - Recommend AWS KMS if on AWS, or similar service for production

#### Q-2: Configuration Storage Location
- **Question:** Should configuration be in primary database or separate secrets store?
- **Context:** Separation of concerns vs. complexity
- **Impact:** Architecture and security model
- **Status:** **Needs decision** - Recommend primary database with encryption for v1

#### Q-3: API Key Rotation Support
- **Question:** Should we support API key rotation or version history?
- **Context:** Users may need to rotate keys periodically
- **Impact:** Data model and UI complexity
- **Status:** **Deferred** - Not in scope for v1, revisit based on user feedback

#### Q-4: Test Call Specifics
- **Question:** Exact API endpoint to use for connection testing?
- **Options:**
  - OpenAI: /v1/models (lists available models)
  - Anthropic: Similar listing endpoint or minimal completion call
- **Impact:** Test reliability and cost
- **Status:** **Needs research** - Investigate cheapest, most reliable test endpoints

### Product Questions

#### Q-5: Trial or Demo Option
- **Question:** Should we provide trial credits or demo mode for users without API keys?
- **Context:** Reduces friction but adds complexity and cost
- **Impact:** User acquisition and conversion rates
- **Status:** **Out of scope for v1** - Consider for future iteration based on conversion metrics

#### Q-6: Configuration Portability
- **Question:** Should users be able to export/import configurations?
- **Context:** Useful for backup or multi-device usage
- **Impact:** Additional features and data format considerations
- **Status:** **Deferred** - Assess need after launch

#### Q-7: Multi-Configuration Support
- **Question:** Should advanced users have multiple configurations (e.g., different models for different content)?
- **Context:** Power user feature but adds significant complexity
- **Impact:** Data model, UI, and selection logic
- **Status:** **Out of scope for v1** - Explicitly noted in non-objectives

### UX Questions

#### Q-8: Configuration Page Access
- **Question:** Should configuration be accessible from main navigation or only settings?
- **Context:** Affects discoverability and frequency of access
- **Impact:** Navigation design
- **Status:** **Needs design decision** - Recommend Settings only for v1

#### Q-9: Post-Configuration Flow
- **Question:** Where should users land after completing configuration?
- **Options:**
  - Return to feature that triggered configuration
  - Stay on configuration page with success message
  - Navigate to getting started guide
- **Status:** **Needs UX decision** - Recommend return to triggering feature

#### Q-10: Configuration Status Indicator
- **Question:** Should there be a global indicator of LLM configuration status?
- **Context:** Helps users understand why AI features are/aren't available
- **Impact:** UI/UX design across application
- **Status:** **Needs decision** - Recommend status in user profile/settings menu

### Security Questions

#### Q-11: Encryption Standard
- **Question:** Which encryption algorithm and key size should be used?
- **Context:** Balance between security and performance
- **Impact:** Implementation specifics
- **Status:** **Needs security review** - Recommend AES-256 as minimum

#### Q-12: Audit Logging Scope
- **Question:** What level of detail should be logged for configuration changes?
- **Context:** Security auditing vs. privacy concerns
- **Impact:** Logging infrastructure and compliance
- **Status:** **Needs decision** - Recommend logging config changes without keys

---

## 13. Acceptance Criteria (AC-x)

### AC-1: Configuration Page Access
**Given** an authenticated user  
**When** they navigate to Settings → Artificial Intelligence  
**Then** the configuration page loads successfully  
**And** the page displays provider selection, model selection, and API key input  
**And** help text explains the purpose of configuration  
**And** guidance on obtaining API keys is visible

### AC-2: Provider Selection
**Given** a user on the configuration page  
**When** they click the provider dropdown  
**Then** "OpenAI" and "Anthropic" options are displayed  
**And** selecting a provider enables the model dropdown  
**And** selecting a provider clears any previously selected model from different provider  
**And** the selection is visually indicated

### AC-3: Dynamic Model Selection
**Given** a user has selected "OpenAI" as provider  
**When** they click the model dropdown  
**Then** models "GPT-4o", "GPT-4.1", and "GPT-4o-mini" are displayed  
**Given** a user has selected "Anthropic" as provider  
**When** they click the model dropdown  
**Then** models "Claude 3.5 Sonnet" and "Claude 3 Opus" are displayed

### AC-4: API Key Input
**Given** a user on the configuration page  
**When** they enter an API key in the input field  
**Then** the input is masked (password-style)  
**And** pasted content is accepted  
**And** the field displays placeholder text with format guidance  
**And** the field validates for non-empty value before enabling test button

### AC-5: Connection Test Success
**Given** a user has entered valid provider, model, and API key  
**When** they click "Test Connection"  
**Then** a loading indicator is displayed  
**And** the system makes a test API call to the selected provider  
**And** a success message is displayed upon validation  
**And** the "Save" button becomes enabled  
**And** the test completes within 10 seconds

### AC-6: Connection Test Failure - Invalid Key
**Given** a user has entered an invalid API key  
**When** they click "Test Connection"  
**Then** the system attempts validation  
**And** an error message is displayed: "Invalid API key. Please check your key and try again."  
**And** the "Save" button remains disabled  
**And** the user can modify the key and retry

### AC-7: Connection Test Failure - Insufficient Permissions
**Given** a user has entered an API key without required permissions  
**When** they click "Test Connection"  
**Then** an error message is displayed: "API key lacks necessary permissions. Please check your provider account."  
**And** the "Save" button remains disabled  
**And** guidance on required permissions is provided

### AC-8: Connection Test Failure - Network Error
**Given** a network error occurs during connection test  
**When** the test is attempted  
**Then** a user-friendly error message is displayed: "Unable to connect. Please check your internet connection and try again."  
**And** the technical error is logged for debugging  
**And** the user can retry the test

### AC-9: Configuration Save
**Given** a user has successfully tested their configuration  
**When** they click "Save"  
**Then** the provider, model, and API key are stored  
**And** the API key is encrypted before storage  
**And** a success confirmation message is displayed  
**And** the configuration is persisted across sessions  
**And** the save operation completes within 3 seconds

### AC-10: API Key Encryption
**Given** an API key is being saved  
**When** the save operation executes  
**Then** the API key is encrypted using AES-256 or equivalent  
**And** the encrypted key is stored in the database  
**And** the plain-text key is never stored  
**And** the encryption key is stored separately from the database  
**And** the API key never appears in application logs

### AC-11: Configuration Retrieval
**Given** a user with existing configuration  
**When** they visit the configuration page  
**Then** their current provider is displayed in the provider dropdown  
**And** their current model is displayed in the model dropdown  
**And** their API key is displayed in masked format (e.g., "sk-...xyz123")  
**And** a status indicator shows "Configuration Active" or similar  
**And** the user can edit any field

### AC-12: Configuration Edit
**Given** a user with existing configuration  
**When** they change provider, model, or API key  
**Then** they must test the new configuration before saving  
**And** "Save" button remains disabled until test succeeds  
**And** successful save replaces the previous configuration  
**And** confirmation message indicates configuration was updated  
**And** AI features continue working with new configuration

### AC-13: Feature Gate - Unconfigured User
**Given** a user without LLM configuration  
**When** they attempt to use AI flashcard generation  
**Then** a blocking message is displayed  
**And** the message states: "To generate flashcards automatically, you need to configure an AI provider."  
**And** a "Configure AI Provider" button is prominently displayed  
**And** clicking the button navigates to Settings → Artificial Intelligence  
**And** the AI feature does not execute

### AC-14: Feature Gate - Configured User
**Given** a user with valid LLM configuration  
**When** they attempt to use AI flashcard generation  
**Then** no blocking message is displayed  
**And** the AI feature executes normally  
**And** the system uses the configured provider and model  
**And** the feature gate check completes in < 100ms

### AC-15: Provider Abstraction Layer
**Given** the system needs to generate flashcards  
**When** using the LLM service  
**Then** a common interface is used regardless of provider  
**And** the interface method is called (e.g., generateFlashCards)  
**And** the correct provider implementation is invoked based on user configuration  
**And** OpenAI and Anthropic implementations both work through the same interface  
**And** business logic does not contain provider-specific code

### AC-16: Security - No Client-Side Key Exposure
**Given** a user has saved their API key  
**When** the configuration page loads  
**Then** the full API key is never transmitted to the client  
**And** only a masked version is displayed  
**And** the API key is not present in browser JavaScript variables  
**And** the API key is not visible in network requests (except initial save)  
**And** browser DevTools cannot reveal the stored key

### AC-17: Security - HTTPS Enforcement
**Given** any configuration-related operation  
**When** data is transmitted between client and server  
**Then** all communication occurs over HTTPS  
**And** HTTP requests are redirected to HTTPS  
**And** sensitive data is never transmitted over insecure connections

### AC-18: Validation - Empty Fields
**Given** a user on the configuration page  
**When** they attempt to test or save with empty fields  
**Then** "Test Connection" button is disabled if any field is empty  
**And** validation messages indicate which fields are required  
**And** no API request is made with incomplete data

### AC-19: Error Handling - Rate Limits
**Given** a user has been rate-limited by their provider  
**When** they attempt a connection test  
**Then** a specific error message is displayed: "Rate limit reached. Please wait before testing again."  
**And** the error includes approximate wait time if available  
**And** the user can retry after the limit period  
**And** the rate limit event is logged

### AC-20: Onboarding Guidance
**Given** a first-time user on the configuration page  
**When** they view the page  
**Then** clear instructions explain why configuration is needed  
**And** links to OpenAI API key creation are provided  
**And** links to Anthropic API key creation are provided  
**And** cost expectations for API usage are mentioned  
**And** privacy and security reassurances are present  
**And** guidance can be dismissed or collapsed

### AC-21: Mobile Responsiveness
**Given** a user accesses configuration on a mobile device  
**When** they view the configuration page  
**Then** all form elements are properly sized and accessible  
**And** dropdowns function correctly on mobile  
**And** masked input fields work on mobile keyboards  
**And** buttons are touch-friendly (minimum 44x44 points)  
**And** the entire configuration flow is completable on mobile

### AC-22: Accessibility Compliance
**Given** a user with assistive technology  
**When** they access the configuration interface  
**Then** all form fields have proper labels and ARIA attributes  
**And** dropdown selections are announced to screen readers  
**And** error messages are announced to screen readers  
**And** keyboard navigation works for entire flow  
**And** color contrast meets WCAG 2.1 Level AA standards  
**And** focus indicators are clearly visible

---

## Appendix

### Related Documentation
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude API Documentation](https://docs.anthropic.com/claude/reference)
- [OAuth 2.0 Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [AES Encryption Standards](https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines)

### Supported Models by Provider

#### OpenAI Models
| Model ID | Display Name | Description |
|----------|--------------|-------------|
| gpt-4o | GPT-4o | Most capable model, balanced cost/quality |
| gpt-4.1 | GPT-4.1 | Latest iteration, improved reasoning |
| gpt-4o-mini | GPT-4o-mini | Faster, more economical option |

#### Anthropic Models
| Model ID | Display Name | Description |
|----------|--------------|-------------|
| claude-3.5-sonnet | Claude 3.5 Sonnet | High intelligence, balanced performance |
| claude-3-opus | Claude 3 Opus | Most capable Claude model |

### Sample API Test Endpoints

#### OpenAI Test Call
```
GET https://api.openai.com/v1/models
Authorization: Bearer {api_key}
```
- Minimal cost (list operation)
- Validates authentication and authorization
- Returns quickly

#### Anthropic Test Call
```
POST https://api.anthropic.com/v1/messages
Authorization: x-api-key {api_key}
Content-Type: application/json

{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 10,
  "messages": [{"role": "user", "content": "Hi"}]
}
```
- Minimal token usage
- Validates full API access
- Confirms model availability

### Encryption Implementation Reference

**Storage Format:**
```
{
  "user_id": "uuid",
  "provider": "openai|anthropic",
  "model": "model_identifier",
  "encrypted_api_key": "base64_encrypted_data",
  "encryption_algorithm": "AES-256-GCM",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

**Encryption Process:**
1. Generate or retrieve encryption key from secure store
2. Encrypt API key using AES-256-GCM
3. Store encrypted data and authentication tag
4. Never store plain-text key

**Decryption Process:**
1. Retrieve encrypted API key from database
2. Retrieve encryption key from secure store
3. Decrypt in backend service memory only
4. Use for API call
5. Never transmit to client

### Cost Estimation Guidance

**For Users:**
- OpenAI GPT-4o: ~$0.01-0.05 per flashcard generation (varies by content length)
- OpenAI GPT-4o-mini: ~$0.001-0.01 per generation
- Anthropic Claude 3.5 Sonnet: ~$0.01-0.04 per generation
- Costs depend on content length and number of flashcards generated

**Note:** Actual costs vary based on provider pricing and usage patterns. Users should monitor their provider dashboards for exact billing.

### Security Checklist

- [ ] API keys encrypted with AES-256 or stronger
- [ ] Encryption keys stored separately from application database
- [ ] API keys never logged in plain text
- [ ] API keys never sent to client after initial save
- [ ] All communication over HTTPS
- [ ] Input validation prevents injection attacks
- [ ] Rate limiting on connection tests
- [ ] Audit logging of configuration changes (without keys)
- [ ] Security review completed before launch
- [ ] Penetration testing performed
- [ ] Incident response plan for key compromise
- [ ] GDPR/CCPA compliance for stored credentials

### Glossary
- **LLM:** Large Language Model - AI system capable of understanding and generating text
- **API Key:** Secret credential used to authenticate with LLM provider
- **Provider:** Third-party service offering LLM access (OpenAI, Anthropic)
- **Model:** Specific version of an LLM (e.g., GPT-4o, Claude 3.5 Sonnet)
- **Abstraction Layer:** Code interface that unifies different provider implementations
- **Feature Gate:** Mechanism to block functionality based on prerequisites
- **AES-256:** Advanced Encryption Standard with 256-bit key length
- **HTTPS:** Secure HTTP protocol using TLS encryption
- **Masking:** Displaying only partial information (e.g., "sk-...xyz") to hide sensitive data

### Version History
- **v1.0** (2026-01-12): Initial PRD created from requirement issue

---

**End of Document**
