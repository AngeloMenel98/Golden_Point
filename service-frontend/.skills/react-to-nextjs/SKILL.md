# React SPA to Next.js App Router Migration Skill

## Overview

This skill guides the migration of a React SPA (Vite) to Next.js 15 App Router.

**Use when**: Migrating from `create-react-app` or Vite to Next.js App Router.

---

## Quick Reference

| Current | Target |
|---------|--------|
| React 18 + Vite | Next.js 15 App Router |
| React Router | next/navigation |
| Redux Toolkit | Redux Toolkit (keep) |
| Vite proxy | next.config.js rewrites |

---

## Prerequisites

### 1. Check Node.js Version
```bash
node --version  # Must be 18.17+ for Next.js 15
```

### 2. Backup Current Project
```bash
git tag pre-nextjs-migration
git push origin pre-nextjs-migration
```

### 3. Docker Backup (if applicable)
```bash
docker build -t my-app:pre-nextjs .
```

### 4. Check Dependencies Compatibility
```json
// Remove these (Vite-specific):
- "vite"
- "@vitejs/plugin-react"
- "babel-plugin-styled-components"

// Add these:
- "next": "^15.0.0"
- "@types/node": "^20.0.0"
```

---

## Phase 1: Project Setup

### 1.1 Create Next.js App

```bash
cd service-frontend
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*" --tailwind=false --use-npm
```

Select **No** for Tailwind (if using styled-components).

### 1.2 Install Dependencies

```bash
npm install styled-components@latest
npm install -D @types/styled-components
```

### 1.3 Configure next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:8080'}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

### 1.4 Create tsconfig Paths

```json
// tsconfig.json - add paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 1.5 Delete Vite Files

```bash
rm -f vite.config.ts
rm -f index.html
rm -f tsconfig.node.json
```

---

## Phase 2: Routing Structure

### 2.1 Create App Router Directory Structure

```
src/app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── tournaments/
│   │   └── page.tsx
│   ├── matches/
│   │   └── page.tsx
│   ├── ranking/
│   │   └── page.tsx
│   ├── clubs/
│   │   └── page.tsx
│   └── layout.tsx
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

### 2.2 Root Layout (src/app/layout.tsx)

```tsx
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import StoreProvider from '@/lib/store-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Golden Point',
  description: 'Tournament Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
            {children}
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
```

### 2.3 Auth Layout (src/app/(auth)/layout.tsx)

```tsx
'use client';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
```

### 2.4 Dashboard Layout (src/app/(dashboard)/layout.tsx)

```tsx
'use client';

import styled from 'styled-components';
import NavBar from '@/components/navbar/NavBar';
import { usePathname } from 'next/navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <LayoutContainer>
      <NavBar currentPath={pathname} />
      <Main>{children}</Main>
    </LayoutContainer>
  );
}
```

---

## Phase 3: State & API

### 3.1 Styled Components Registry (src/lib/registry.tsx)

```tsx
'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
```

### 3.2 Store Provider (src/lib/store-provider.tsx)

```tsx
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore>>();
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

### 3.3 Store Setup (src/store/index.ts)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tourReducer from './tourSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      tour: tourReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

### 3.4 Typed Redux Hooks (src/lib/hooks.ts)

```typescript
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, RootState, AppStore } from '@/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

### 3.5 Axios Client (src/lib/api.ts)

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor - unwrap { success, data }
api.interceptors.response.use(
  (response) => {
    if (response.data && 'success' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
```

---

## Phase 4: Middleware

### 4.1 Create middleware.ts (root directory)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/tournaments', '/matches', '/ranking', '/clubs'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookie
  const token = request.cookies.get('token')?.value || 
                request.cookies.get('auth_token')?.value;

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/tournaments', request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 4.2 Auth Utilities (src/lib/auth.ts)

```typescript
import { jwtDecode } from 'jwt-decode';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  // ... other user fields
}

export function getAuthUser(token: string): AuthUser | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  try {
    const user = jwtDecode<{ exp: number }>(token);
    return user.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
```

---

## Phase 5: Page Migration

### 5.1 Convert Page Component Pattern

**Before (Vite/React):**
```tsx
// src/pages/Login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Login() {
  const navigate = useNavigate();
  // ... component logic
}
```

**After (Next.js):**
```tsx
// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function LoginPage() {
  const router = useRouter();
  // ... component logic
}
```

### 5.2 Key Changes

| Vite Pattern | Next.js Equivalent |
|--------------|-------------------|
| `useNavigate()` | `useRouter()` + `router.push()` |
| `<Link to="/">` | `<Link href="/">` |
| `<NavLink>` | Use `usePathname()` + conditional styles |
| `useParams()` | `params` from page props |
| `useSearchParams()` | `useSearchParams()` hook |

### 5.3 Add loading.tsx

```tsx
// src/app/(dashboard)/loading.tsx
'use client';

import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export default function Loading() {
  return <LoadingContainer>Loading...</LoadingContainer>;
}
```

### 5.4 Add error.tsx

```tsx
// src/app/(dashboard)/error.tsx
'use client';

import styled from 'styled-components';
import { useEffect } from 'react';

const ErrorContainer = styled.div`
  padding: 40px;
  text-align: center;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorContainer>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </ErrorContainer>
  );
}
```

---

## Phase 6: Components

### 6.1 Add 'use client' Directive

Components using:
- `useState`, `useEffect`, `useRef`
- `styled-components`
- Browser APIs (`window`, `localStorage`)
- Event handlers

Need `'use client'` at the top:

```tsx
'use client';

import { useState } from 'react';
import styled from 'styled-components';

// ... component
```

### 6.2 Update NavBar for Next.js

```tsx
// src/components/navbar/NavBar.tsx
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background: #333;
  color: white;
`;

const StyledLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#ffd700' : 'white'};
  text-decoration: none;
`;

interface NavBarProps {
  currentPath: string;
}

export default function NavBar({ currentPath }: NavBarProps) {
  return (
    <Nav>
      <StyledLink href="/tournaments" $active={currentPath.startsWith('/tournaments')}>
        Tournaments
      </StyledLink>
      <StyledLink href="/matches" $active={currentPath.startsWith('/matches')}>
        Matches
      </StyledLink>
      {/* ... other links */}
    </Nav>
  );
}
```

### 6.3 Link Component

Replace React Router `Link`:
```tsx
// Before
import { Link } from 'react-router-dom';
<Link to="/tournaments">Tournaments</Link>

// After
import Link from 'next/link';
<Link href="/tournaments">Tournaments</Link>
```

---

## Phase 7: Docker Deployment

### 7.1 Dockerfile (Multi-stage)

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### 7.2 docker-compose.yml Update

```yaml
frontend:
  build:
    context: ./service-frontend
    dockerfile: Dockerfile
  ports:
    - "3000:3000"
  environment:
    - API_URL=http://backend:8080
    - NODE_ENV=production
  depends_on:
    - backend
  networks:
    - common-net
  restart: unless-stopped
```

---

## Phase 8: Testing & Polish

### 8.1 Test Checklist

- [ ] `npm run dev` starts without errors
- [ ] Login page renders and works
- [ ] Register page renders and works
- [ ] Protected routes redirect to login
- [ ] Authenticated pages load data
- [ ] Navigation works (Link components)
- [ ] styled-components render correctly
- [ ] Redux state persists across navigation
- [ ] Docker build completes
- [ ] Production build works

### 8.2 Common Issues

#### styled-components Hydration Mismatch

**Problem**: Server HTML doesn't match client HTML.

**Solution**: Use the registry pattern from Phase 3.1.

#### localStorage in Server Components

**Problem**: `localStorage` is undefined on server.

**Solution**: Always check `typeof window !== 'undefined'` or use `'use client'`.

#### Redux State Not Persisting

**Problem**: State resets on navigation.

**Solution**: Ensure StoreProvider wraps the entire app. For persistence, add redux-persist or sync to localStorage manually.

#### Middleware Not Running

**Problem**: Protected routes accessible without auth.

**Solution**: Ensure middleware.ts is in the project root (not src/). Check `matcher` config.

#### API Calls Failing in Docker

**Problem**: `localhost:8080` doesn't work in container.

**Solution**: Use container service name `http://backend:8080` or nginx proxy.

---

## Environment Variables

Create `.env.local`:

```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:8080

# Production (Docker)
API_URL=http://backend:8080
```

---

## Rollback Procedures

### 1. Revert Git
```bash
git checkout pre-nextjs-migration
```

### 2. Restore Docker Image
```bash
docker run -d --name app my-app:pre-nextjs
```

### 3. Partial Rollback
If only one phase fails, check out specific files:
```bash
git checkout HEAD~1 -- src/app/
```

---

## File Mapping

| Vite | Next.js |
|------|---------|
| `src/App.tsx` | `src/app/layout.tsx` |
| `src/pages/*/index.tsx` | `src/app/(group)/*/page.tsx` |
| `src/routes/*` | `src/app/` directory |
| `src/store/*` | `src/store/` (keep) |
| `src/services/*` | `src/lib/api.ts` or keep in `src/services/` |
| `src/components/*` | `src/components/*` (add 'use client') |
| `vite.config.ts` | `next.config.js` |

---

## Next Steps After Migration

1. Enable TypeScript strict mode
2. Add React Server Components where applicable
3. Implement loading states with Suspense
4. Add error boundaries
5. Set up ISR for public pages
6. Configure caching headers
7. Add sitemap and robots.txt
8. Lighthouse audit
