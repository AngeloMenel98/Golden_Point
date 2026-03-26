# Proposal: Add /api/clubs/:userId Endpoint

## Intent

Add a new API endpoint `/api/clubs/:userId` to allow fetching clubs for a specific user by passing `userId` as a path parameter instead of extracting it from JWT or query parameters. This enables frontend components to explicitly request clubs for any user.

## Scope

### In Scope
- Create new route file: `/new-frontend/src/app/api/clubs/[userId]/route.ts`
- Implement GET handler that accepts `userId` from path parameter
- Support both authenticated (with token) and unauthenticated calls with userId in path

### Out of Scope
- Modifying existing `/api/clubs` route (keeps backward compatibility)
- Adding POST/PUT/DELETE handlers to the new route
- Changing backend API

## Approach

Create a new dynamic route file `[userId]/route.ts` that:
1. Extracts `userId` from the URL path parameter
2. Uses token from cookie for authentication (optional - allows viewing other users' clubs)
3. Calls backend API `/club/clubs/{userId}` with the path-provided userId
4. Returns clubs in the same format as existing endpoint

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `new-frontend/src/app/api/clubs/[userId]/route.ts` | New | New dynamic route for user-specific clubs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Backend API doesn't accept userId parameter | Low | Verify backend accepts userId in path; fallback to existing endpoint logic |
| Security: unauthorized access to other users' clubs | Medium | Backend should validate access rights; frontend only calls for authorized users |

## Rollback Plan

1. Delete `/new-frontend/src/app/api/clubs/[userId]/route.ts`
2. Frontend reverts to using query parameter or JWT-based approach

## Dependencies

- Backend API endpoint `/club/clubs/{userId}` must accept userId in path

## Success Criteria

- [ ] New endpoint `/api/clubs/:userId` returns clubs for specified user
- [ ] Returns same data format as existing `/api/clubs` endpoint
- [ ] Properly handles authentication via token cookie
- [ ] Error handling matches existing endpoint patterns
