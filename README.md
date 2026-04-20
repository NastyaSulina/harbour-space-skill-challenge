# Harbour.Space skill challenge

Scholarship page implementation with API integration, state management, and testing

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
- **Architecture**: FSD principles for project organization
- **Testing**: Vitest, React Testing Library, Faker
- **HTTP**: Axios
- **State Management**: Combination of local component state and custom hook. No global state manager needed - single API call on mount. Page data is managed in `useScholarship` hook, while component-specific state stays local to components.

## Challenge Implementation (API, State, Testing)

**Note on API setup**: Added Vite proxy in `vite.config.ts` to handle CORS in dev mode.

Focused on **Option 1** (API calls, state management, testing). API service and data model live in `src/entities/scholarship`:

- **API Service**: `/api/scholarshipService.ts`
- **Data normalization**: `/api/normalize.ts` - transforms raw API response into typed models
- **State hook**: `/model/useScholarship.ts` - handles loading states, error handling and abort on unmount

Only API fields actually used in the UI are typed and normalized. Adding more fields to the UI requires updating the `/model/scheme.ts`, `/model/types.ts` and normalization layer.

Tests are colocated with source files following the `*.test.{ts,tsx}` naming. Also added tests for some UI components in `src/shared/ui`.

## UI Implementation

Followed the Figma design without pixel-perfect precision. Omitted some sections to prioritize API integration and testing.

The slider uses `what_you_will_learn` data from the API instead of the testimonials shown in Figma, since testimonial data isn't available in the endpoint and hardcoding conflicts with the API-first approach.

## Linting

ESLint, Prettier, Stylelint. Runs automatically on commit via `lint-staged`.

Stylelint enforces CSS property order with `stylelint-order`.

```bash
pnpm lint
pnpm stylelint
pnpm prettier
```
