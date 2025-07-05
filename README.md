# InsightsMesh Bainco

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

### Folders

#### `app`
- **page.tsx**: Main page of the application.
- **api**: Contains API routes.
  - **chat/route.ts**: API route for chat functionality.
  - **generateTitleAndSummary/route.ts**: API route for generating titles and summaries.
- **signin/page.tsx**: Sign-in page.

#### `wrappers`
Contains wrapper components for various functionalities.
- **AuthProvider.tsx**: Provides authentication context.
- **ClientAuthProvider.tsx**: Client-side authentication provider.
- **providers.tsx**: Combines multiple providers for the app.
- **RedirectWrapper.tsx**: Handles redirection logic.
- **redux-provider.tsx**: Redux provider for state management.
- **ReduxProvider.tsx**: Wrapper for Redux store.

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

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

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

## Additional Features

### Chat Functionality
- **Summary and Auto Title Generation**: After the first three messages in a chat, the application automatically generates a summary and title for the session.

### User Activity
- **Automatic Timeout**: The application automatically logs out users after 40 seconds of inactivity to ensure security and optimal resource usage.

### Performance Optimization
- **React-Window for Virtualization**: The application uses `react-window` to efficiently render chat messages, ensuring smooth performance even with large datasets.

### Security and Persistence
- **Persistent Encrypted Sessions**: User sessions are securely stored using encryption, ensuring data privacy and persistence across sessions.

### Session Management
- **Tagging and Filtering**: Users can add tags to chat sessions, delete tags, and filter sessions based on tags for better organization and retrieval.

### Development and Testing
- **Mock Users and Passwords**: The application includes mock user credentials for testing purposes:
  - **Username**: `user1`
  - **Password**: `password1`
These credentials allow developers to simulate authentication flows during development.

### Backend Routes
- **Chat Route**: Handles chat-related functionality (`api/chat/route.ts`).
- **Generate Title and Summary Route**: Generates titles and summaries for chat sessions (`api/generateTitleAndSummary/route.ts`).
