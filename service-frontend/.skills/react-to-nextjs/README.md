# React to Next.js Migration Skill

## Description

Guides the migration of a React SPA (Vite/create-react-app) to Next.js 15 App Router.

## When to Use

- Migrating from Vite to Next.js
- Upgrading from React Router to Next.js App Router
- Moving from CSR to SSR/SSG

## Phases

1. **Project Setup** - Create Next.js app, configure styled-components
2. **Routing Structure** - App Router layouts, route groups
3. **State & API** - Redux Provider, Axios client, styled-components registry
4. **Middleware** - Auth protection, route guards
5. **Page Migration** - Convert pages with React Router → Next.js patterns
6. **Components** - Add 'use client' directives, update imports
7. **Docker Deployment** - Multi-stage Dockerfile, standalone output
8. **Testing & Polish** - Verify all functionality

## Key Differences

| React SPA | Next.js |
|-----------|---------|
| BrowserRouter | App Router |
| useNavigate | useRouter + router.push |
| React Router Link | next/link |
| Client-only | Server + Client Components |

## Files

- `SKILL.md` - Complete migration guide with code snippets
