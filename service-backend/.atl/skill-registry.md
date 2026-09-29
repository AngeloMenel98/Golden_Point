# Skill Registry — golden-point-backend

Project: Golden Point Backend (padel/tennis tournament management)
Last Updated: 2026-03-19

## Skills Directory

```
skills/
├── backend.md      # Technical info (architecture, patterns, dependencies)
└── padel-logic.md  # Domain logic (Tours, Tournaments, Matches, Teams)
```

## SDD Skills (Core)

| Skill | Purpose | Trigger |
|-------|---------|---------|
| sdd-explore | Investigate ideas, clarify requirements | Feature exploration, requirement clarification |
| sdd-propose | Create change proposal with intent & scope | Starting a new change |
| sdd-spec | Write delta specs with scenarios | Writing or updating specifications |
| sdd-design | Create technical design document | Designing implementation approach |
| sdd-tasks | Break change into implementation tasks | Task breakdown for implementation |
| sdd-apply | Implement tasks following specs | Code implementation |
| sdd-verify | Validate implementation against specs | Verification phase |
| sdd-archive | Sync specs and archive completed changes | Closing a change |

## Domain Skills

| Skill | Purpose | Location |
|-------|---------|----------|
| backend | Technical architecture, patterns, TypeScript setup | `/skills/backend.md` |
| padel-logic | Tour, Tournament, Match, Team, Category system | `/skills/padel-logic.md` |

## TypeScript Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| typescript-advanced-types | Generics, conditional types, utility types | Complex type logic |

## Project Structure

### Backend Technical (`backend.md`)

- **Architecture**: Controllers → Services → Repositories → Entities
- **Type System**: Discriminated union errors, ApiResponse wrapper, DTOs
- **Validation**: express-validator (routes), class-validator (entities)
- **Auth**: JWT + bcrypt
- **Database**: TypeORM with PostgreSQL

### Domain Logic (`padel-logic.md`)

- **Tour System**: Container for tournaments, join via code
- **Tournament System**: Single competition with states (PENDING → IN_PROGRESS → FINISH)
- **Match System**: Group stage + knockout, set-based results
- **Team System**: 2-player teams with category assignment
- **Category System**: Gender + level combinations (Male-A/B/C, Female-A/B/C)
- **Ranking**: Points accumulation across matches

## Type System

### Error Types (`src/types/error/`)

```typescript
type ErrorType = 
  | { type: "NOT_FOUND"; entity: string; id: string }
  | { type: "VALIDATION"; message: string; field?: string }
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "CONFLICT"; message: string; entity: string }
  | { type: "INTERNAL"; message: string };
```

### API Response (`src/types/response/`)

```typescript
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorType };
```

### DTOs (`src/types/dto/`)

| DTO | Purpose |
|-----|---------|
| user.dto.ts | UserResponse, UserCreateRequest, UserListResult |
| tour.dto.ts | TourResponse, TourCreateRequest |
| tournament.dto.ts | TournamentResponse, TournamentData |
| team.dto.ts | TeamResponse, TeamCreateRequest |
| match.dto.ts | MatchResponse, MatchCreateRequest |
| club.dto.ts | ClubResponse, ClubCreateRequest |

## Dependencies

- TypeScript 4.5.2
- Express 4.18.2
- TypeORM 0.3.19
- PostgreSQL (pg 8.11.3)
- class-validator 0.14.1
- express-validator 7.0.1
- jsonwebtoken 9.0.2
- bcrypt 5.1.1
