# Harbour.Space skill challenge

Scholarship page implementation with API integration, state management, and testing.

## Quick Start

```bash
pnpm install
pnpm dev
```

Run tests:

```bash
pnpm test:run
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite, CSS Modules, pnpm
- **Architecture**: FSD (Feature-Sliced Design) principles for project organization
- **Testing**: Vitest, React Testing Library, Faker for mocks
- **HTTP**: Axios
- **State Management**: Local component state + custom hook. No global state needed - single API call on mount, data stays in `useScholarship` hook and component state

## Challenge Implementation (API, State, Testing)

**Note on API setup**: Added Vite proxy in `vite.config.ts` to handle CORS in dev mode. For production, proper CORS configuration would be needed on the backend.

Focused on **Option 1** (API calls, state management, testing). API service and data model live in `src/entities/scholarship`:

- **API Service**: `src/entities/scholarship/api/scholarshipService.ts`
- **Data normalization**: `src/entities/scholarship/api/normalize.ts` - transforms raw API response into typed frontend models
- **State hook**: `src/entities/scholarship/model/useScholarship.ts` - handles loading states, error handling, and abort on unmount

Tests are colocated with source files. Main functionality is covered. Also added tests for some UI components in `src/shared/ui`.

Didn't fetch all API fields upfront to keep things manageable — only grabbed what's actually displayed in the UI. To add more fields: update schema, types and normalization.

## UI Implementation

Followed the Figma design direction without aiming for pixel-perfect implementation. Some sections from the original mockup were omitted to allocate more time to API integration and testing.

The slider implementation differs from the Figma mockup. Specifically, the testimonials slider wasn't implemented because testimonial data isn't provided by the API endpoint. Since the challenge emphasizes working with real API data, I built the slider using `what_you_will_learn` content from the API response instead of hardcoding static testimonials.

## Linting

ESLint, Prettier, Stylelint. Runs automatically on commit via `lint-staged`.

Stylelint enforces CSS property order with `stylelint-order`.

```bash
pnpm lint
pnpm stylelint
pnpm prettier
```
