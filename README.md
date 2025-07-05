# InsightsMesh Bainco

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

### Root Files

- **next-env.d.ts**: TypeScript environment definitions for Next.js.
- **next.config.js**: Basic Next.js configuration file.
- **next.config.ts**: Extended Next.js configuration with custom webpack settings.
- **package.json**: Contains project metadata and dependencies.
- **postcss.config.mjs**: Configuration for PostCSS plugins.
- **tsconfig.json**: TypeScript configuration file.

### Folders

#### `app`
Contains the main application logic and pages.
- **AuthProvider.tsx**: Provides authentication context.
- **ClientAuthProvider.tsx**: Client-side authentication provider.
- **favicon.ico**: Favicon for the application.
- **globals.css**: Global CSS styles.
- **layout.tsx**: Layout component for the app.
- **page.tsx**: Main page of the application.
- **providers.tsx**: Combines multiple providers for the app.
- **RedirectWrapper.tsx**: Handles redirection logic.
- **redux-provider.tsx**: Redux provider for state management.
- **ReduxProvider.tsx**: Wrapper for Redux store.
- **SignOutButton.tsx**: Button component for signing out.
- **api**: Contains API routes.
  - **chat/route.ts**: API route for chat functionality.
  - **generateTitleAndSummary/route.ts**: API route for generating titles and summaries.
- **signin/page.tsx**: Sign-in page.

#### `components`
Reusable UI components.
- **AuthWrapper.tsx**: Wrapper for authentication logic.
- **Banner.tsx**: Displays a dismissible banner.
- **ChatActions.tsx**: Handles chat-related actions.
- **ChatInput.tsx**: Input field for chat messages.
- **ChatWindow.tsx**: Main chat window component.
- **FullScreenIcon.tsx**: SVG icon for fullscreen functionality.
- **GlobalThemeToggle.tsx**: Toggles between light and dark themes.
- **Layout.tsx**: Main layout component.
- **LoginScreen.tsx**: Login screen component.
- **NewChatModal.tsx**: Modal for creating new chat sessions.
- **SessionList.tsx**: Displays a list of chat sessions.
- **Sidebar.tsx**: Sidebar component for navigation.

#### `lib`
Contains shared libraries and utilities.

#### `pages`
Custom Next.js pages.

#### `public`
Static assets like images and icons.
- **file.svg**: SVG icon.
- **globe.svg**: SVG icon.
- **next.svg**: SVG icon.
- **vercel.svg**: SVG icon.
- **window.svg**: SVG icon.

#### `store`
Redux store and slices for state management.
- **index.ts**: Main Redux store configuration.
- **Provider.tsx**: Redux provider component.
- **slices**: Contains Redux slices.
  - **authSlice.ts**: Manages authentication state.
  - **sessionsSlice.ts**: Manages chat sessions state.
  - **themeSlice.ts**: Manages theme state.

#### `types`
TypeScript type definitions.
- **index.ts**: Defines types for messages, sessions, and state.

#### `utils`
Utility functions.
- **activityTracker.ts**: Tracks user activity and handles inactivity.
- **encryption.ts**: Provides encryption and decryption utilities.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Scripts

- **dev**: Starts the development server.
- **build**: Builds the application for production.
- **start**: Starts the production server.
- **lint**: Runs linting checks.

## Dependencies

- **@heroicons/react**: React icons.
- **@reduxjs/toolkit**: Redux toolkit for state management.
- **axios**: HTTP client.
- **crypto-js**: Encryption library.
- **dotenv**: Environment variable management.
- **js-cookie**: Cookie management.
- **next**: Next.js framework.
- **next-themes**: Theme management for Next.js.
- **zod**: TypeScript schema validation.

## DevDependencies

Contains development dependencies for linting, testing, and building.

## License

This project is licensed under the MIT License.

## Flow Overview

### User Interaction
1. **Authentication**: Users interact with the `AuthProvider` and `ClientAuthProvider` components for authentication.
2. **UI Components**: Users navigate through the application using components like `Sidebar`, `ChatWindow`, and `SessionList`.
3. **Theme Management**: Users can toggle between light and dark themes using the `GlobalThemeToggle` component.

### State Management
- The application uses Redux for state management.
- State slices (`authSlice`, `sessionsSlice`, `themeSlice`) manage authentication, chat sessions, and theme preferences.

### API Interaction
- API routes (`chat/route.ts`, `generateTitleAndSummary/route.ts`) handle backend logic for chat functionality and generating summaries.
- The `axios` library is used for making HTTP requests.

### Utility Functions
- Utilities like `activityTracker.ts` and `encryption.ts` provide additional functionality for tracking user activity and securing data.

### Static Assets
- Icons and images are stored in the `public` folder and used across the application.

### Deployment
- The application is built using Next.js and can be deployed to platforms like Vercel for production.
