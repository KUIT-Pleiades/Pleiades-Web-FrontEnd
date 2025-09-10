# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pleiades is a private social networking application for close friends. The frontend is built with React, TypeScript, and Vite, styled with SCSS modules and styled-components.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Routing**: React Router v7
- **State Management**: Zustand for auth, React Query for server state
- **Styling**: SCSS modules + styled-components
- **Animations**: Framer Motion
- **PWA**: Vite PWA plugin configured

### Directory Structure

- `src/api/` - API client with axios instance and token refresh logic
- `src/assets/` - Images organized by feature (Character, FriendsTab, Signal, etc.)
- `src/components/` - Reusable components with modular SCSS
- `src/pages/` - Feature-based page components with nested routing
- `src/store/` - Zustand stores (auth, character)
- `src/functions/` - API hooks and utilities
- `src/interfaces/` - TypeScript interfaces

### Key Architectural Patterns

1. **Authentication Flow**: 
   - Token management via Zustand store in `src/store/authStore.ts`
   - Axios interceptors handle token refresh automatically
   - Protected routes wrapped with `AuthHandler` component

2. **API Layer**:
   - Centralized axios instance with interceptors at `src/api/axiosInstance.ts`
   - React Query hooks for data fetching in `src/functions/`
   - Environment variable `VITE_SERVER_URL` for API base URL

3. **Routing Structure**:
   - Nested routing with outlet pattern
   - Main sections: Home, Station, Market, Settings
   - Auth-protected routes under `AuthHandler`

4. **Styling Approach**:
   - Component-specific SCSS modules (`.module.scss`)
   - Consistent naming convention for style files
   - Global styles in `src/index.css`

5. **Component Organization**:
   - Feature folders contain related components and styles
   - Hooks colocated with features when specific
   - Shared components in root `components/` directory

### Important Features

- **Station System**: Social spaces with customization (backgrounds, settings)
- **Character System**: Avatar customization with faces, fashion items
- **Friends Management**: Request/accept flow with tabs
- **Signal System**: Messaging feature with send/receive modals
- **Market**: Item trading with official store and user management
- **Reports**: User activity reports with search functionality

### PWA Configuration

The app is configured as a Progressive Web App with auto-update strategy and offline support for static assets.

### Environment Variables

Required environment variable:
- `VITE_SERVER_URL`: Backend API base URL