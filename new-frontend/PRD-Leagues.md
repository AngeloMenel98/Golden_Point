# PRD: Leagues Feature — Golden Point

**Inspired by:** Premier Padel Tour structure

---

## 1. Concept & Vision

**Leagues** is a multi-week competitive framework parallel to Tours, where teams compete in a **group stage followed by bracket progression**. Unlike Tournaments (single elimination), Leagues feature round-robin groups with weekly matches across multiple weeks, culminating in a knockout bracket for top finishers.

**Core Metaphor:** Premier Padel / Sports League — longer duration, recurring weekly matches, standings that update over time.

---

## 2. Data Model

### 2.1 Entity Hierarchy

```
League (parallel to Tour)
  └── Season (e.g., "Temporada 1 - Primera División")
        └── Category (e.g., "Primera División")
              └── Groups[] (round-robin)
                    └── Teams[]
                    └── Standings (computed from Matches)
              └── Bracket (top 4 per group, knockout)
                    └── Matches (reusing existing Match entity)
```

### 2.2 New Entities

#### League
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | string | "Premier Padel México 2024" |
| description | string | Optional description |
| leagueCode | string | 6-char unique code (e.g., "PPMX24") |
| ownerId | UUID | Admin who created |
| status | enum | DRAFT, REGISTRATION_OPEN, IN_PROGRESS, FINISHED |
| createdAt | datetime | |
| updatedAt | datetime | |

#### Season
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| leagueId | UUID | FK to League |
| name | string | "Temporada 1" |
| category | string | "Primera División", "Segunda División" |
| status | enum | UPCOMING, IN_PROGRESS, COMPLETED |
| startDate | date | Season start |
| endDate | date | Season end |
| groupStageWeeks | int | Calculated: N teams = N weeks |
| bracketStartWeek | int | Week when bracket begins |
| createdAt | datetime | |

#### Group
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| seasonId | UUID | FK to Season |
| name | string | "Grupo A", "Grupo B" |
| position | int | Display order |

#### GroupTeam (junction)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| groupId | UUID | FK to Group |
| teamId | UUID | FK to Team |
| seed | int? | Previous season ranking (null = random) |
| enrolledAt | datetime | |

#### BracketSeed
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| seasonId | UUID | FK to Season |
| teamId | UUID | FK to Team |
| groupPosition | int | 1-4 from group stage |
| groupName | string | Which group they came from |

### 2.3 Existing Entities (Reused)

#### Match (Extended)
The existing `Match` entity is reused by adding league-specific fields:

| Field | Type | Description |
|-------|------|-------------|
| leagueId | UUID? | FK to League (NEW) |
| seasonId | UUID? | FK to Season (NEW) |
| groupId | UUID? | FK to Group (NEW — for group stage matches) |
| isBracket | boolean | true if knockout match (NEW) |
| round | int? | Bracket round: 1=quarter, 2=semi, 3=final (NEW) |
| matchWeek | int? | Week number in group stage (NEW) |
| deadlineDate | date | Must complete by this date or forfeit (NEW) |

**All existing Match fields remain unchanged:**
- matchDate, teams, sets, groupStage, category, courtNumber, etc.

#### MatchSet (Unchanged — Already exists)
```typescript
interface MatchSet {
  setNumber: number;
  gamesTeam1: number;  // e.g., 6
  gamesTeam2: number;  // e.g., 2
}
```

#### Team, Club, User (Unchanged — Already exist)

---

## 3. Computed Standings

Instead of storing `LeagueStanding` entity, **standings are computed on-the-fly** from matches.

### 3.1 Standings Data Structure
```typescript
interface Standing {
  teamId: string;
  teamName: string;
  played: number;        // Matches played
  won2Sets: number;      // Won 2-0
  won3Sets: number;      // Won 2-1
  lost3Sets: number;     // Lost 1-2
  lost2Sets: number;     // Lost 0-2
  gamesFor: number;      // Total games won
  gamesAgainst: number;  // Total games lost
  gameDiff: number;      // gamesFor - gamesAgainst
  points: number;        // (won2*3) + (won3*2) + (lost3*1)
}
```

### 3.2 Points System
| Result | Sets | Points |
|--------|------|--------|
| Win | 2-0 | 3 |
| Win | 2-1 | 2 |
| Loss | 1-2 | 1 |
| Loss | 0-2 | 0 |

### 3.3 Tiebreaker (when points are equal)
1. **Head-to-head** — Who won between the tied teams?
2. **Game difference** — (gamesFor - gamesAgainst) across all matches
3. **Total games for** — Higher is better
4. **Alphabetical** — Team name A-Z (last resort)

### 3.4 Forfeit Rule
If a team doesn't complete match by deadline:
- Forfeiting team gets 0 points, 0-2 sets
- Opponent gets 3 points, 2-0 sets
- Games recorded as 6-0, 6-0 for statistical purposes

### 3.5 Bye Week (Odd Teams in Group)
- If odd number of teams in a group, one team gets bye each week
- Rotates so no team has consecutive byes
- Bye team gets 3 points, 2-0 sets (as if they won 2-0)

---

## 4. User Stories

### 4.1 As an Admin

#### League Management
- [ ] Create a League with name, description, unique code
- [ ] Set league status (DRAFT → REGISTRATION_OPEN → IN_PROGRESS → FINISHED)
- [ ] View all leagues I've created
- [ ] Edit league details
- [ ] Delete league (only if no matches played)

#### Season Management
- [ ] Create a Season within a league (specify category, dates)
- [ ] View all seasons in a league
- [ ] Start a season (changes status to IN_PROGRESS, locks enrollment)
- [ ] Close a season (changes status to COMPLETED, crowns champion)
- [ ] Delete season (only if no matches played)

#### Team Enrollment (like Tournaments)
- [ ] Add teams to a season
- [ ] Remove teams from a season (only if no matches played)
- [ ] View enrolled teams
- [ ] Auto-generate groups OR manually assign teams to groups

#### Group Stage
- [ ] View groups and standings for a season
- [ ] View scheduled matches per group
- [ ] Schedule matches for each week
- [ ] Record set scores for matches (reuse EditMatchModal)
- [ ] Mark matches as forfeited (auto-applied at deadline)
- [ ] View updated standings after each match (computed)

#### Bracket Stage
- [ ] Auto-generate bracket from top 4 per group
- [ ] View bracket visualization
- [ ] Schedule bracket matches
- [ ] Record bracket match results (reuse EditMatchModal)
- [ ] Track winner progression

### 4.2 As a Club Owner / Team Captain

- [ ] Browse leagues with open registration
- [ ] Enroll my team in a league (using code)
- [ ] View my team's group and standings
- [ ] View my team's scheduled matches
- [ ] View match results
- [ ] Follow other teams/matches (watch list)

### 4.3 As a Fan / User

- [ ] Browse public leagues
- [ ] View standings by group
- [ ] View bracket progression
- [ ] Follow matches (add to watch list)
- [ ] Follow players/teams

---

## 5. API Endpoints

### League CRUD
```
POST   /api/leagues                    Create league
GET    /api/leagues                    List leagues
GET    /api/leagues/:id                Get league detail
PUT    /api/leagues/:id                Update league
DELETE /api/leagues/:id                Delete league
```

### Season
```
POST   /api/leagues/:id/seasons        Create season
GET    /api/leagues/:id/seasons        List seasons
GET    /api/leagues/:id/seasons/:sid   Get season detail
PUT    /api/leagues/:id/seasons/:sid   Update season
DELETE /api/leagues/:id/seasons/:sid   Delete season
POST   /api/leagues/:id/seasons/:sid/start   Start season
POST   /api/leagues/:id/seasons/:sid/close   Close season
```

### Teams / Enrollment
```
POST   /api/leagues/:id/seasons/:sid/teams         Add team
GET    /api/leagues/:id/seasons/:sid/teams         List teams
DELETE /api/leagues/:id/seasons/:sid/teams/:tid   Remove team
```

### Groups
```
POST   /api/leagues/:id/seasons/:sid/groups/generate   Auto-generate groups
POST   /api/leagues/:id/seasons/:sid/groups            Create group manually
GET    /api/leagues/:id/seasons/:sid/groups            List groups
PUT    /api/leagues/:id/seasons/:sid/groups/:gid       Update group
```

### Standings (Computed — No storage)
```
GET    /api/leagues/:id/seasons/:sid/groups/:gid/standings   Compute group standings
GET    /api/leagues/:id/seasons/:sid/standings               Compute all groups standings
```

### Matches (Reuse existing Match endpoints with league extensions)
```
POST   /api/leagues/:id/seasons/:sid/matches            Create match
GET    /api/leagues/:id/seasons/:sid/matches            List matches (filter by week/group/bracket)
GET    /api/leagues/:id/seasons/:sid/matches/:mid       Get match detail
PUT    /api/leagues/:id/seasons/:sid/matches/:mid        Update match (record result)
DELETE /api/leagues/:id/seasons/:sid/matches/:mid        Delete match
```

### Bracket
```
GET    /api/leagues/:id/seasons/:sid/bracket            Get bracket
POST   /api/leagues/:id/seasons/:sid/bracket/generate  Generate bracket from group results
```

### Enrollment (User side)
```
POST   /api/leagues/join/:code     Join league with code
GET    /api/clubs/:cid/leagues    My club's league enrollments
```

### Public
```
GET    /api/leagues/public         Public leagues (REGISTRATION_OPEN or IN_PROGRESS)
```

---

## 6. Page Structure

### Admin Dashboard

```
/dashboard/leagues
  └── League list table (name, status, season count, category)

/dashboard/leagues/[id]
  └── Tabs: Overview | Seasons | Settings

/dashboard/leagues/[id]/seasons/[sid]
  └── Tabs: Groups | Bracket | Teams | Settings
  └── Groups tab: List of groups with standings tables
  └── Bracket tab: Bracket visualization (when generated)
  └── Teams tab: Enrolled teams list
  └── Settings tab: Season details, dates, category

/dashboard/leagues/[id]/seasons/[sid]/groups/[gid]
  └── Group detail with standings + match list for this group

/dashboard/leagues/[id]/seasons/[sid]/match/[mid]
  └── Match detail + result entry (reuse EditMatchModal)
```

### User Dashboard

```
/leagues
  └── Public leagues browser + my enrolled leagues

/leagues/[id]
  └── League overview, current season, categories

/leagues/[id]/seasons/[sid]
  └── Season detail: groups standings, bracket (if started)

/leagues/[id]/watch
  └── My followed matches
```

---

## 7. UI Components

### New Components
| Component | Description |
|-----------|-------------|
| LeagueCard | League summary card |
| LeagueForm | Create/edit league modal |
| SeasonCard | Season summary |
| SeasonForm | Create season modal |
| GroupStandingsTable | Standings table (computed, not stored) |
| GroupList | List of groups with standings preview |
| BracketView | Tournament bracket visualization |
| WeekScheduleView | Week-by-week match grid |

### Reused Components (No changes needed)
| Component | Source |
|-----------|--------|
| MatchCard | `components/matches/MatchCard.tsx` |
| EditMatchModal | `components/matches/EditMatchModal.tsx` |
| MatchSet | `types/match.ts` (MatchSet interface) |
| Button, Input, Modal, Card | `components/ui/` |

---

## 8. Business Rules

### Group Formation
1. Admin adds teams to season
2. Admin triggers "Generate Groups"
3. If first season: random assignment
4. If subsequent season: seed based on previous final standings
5. Groups balanced: 8 teams → 2 groups of 4, 7 teams → 2 groups (4+3 with bye)

### Bye Week (Odd Teams)
- If odd number of teams in a group, one team gets bye each week
- Rotates so no team has consecutive byes
- Bye team gets 3 points, 2-0 sets (as if they won 2-0)

### Match Scheduling
1. Each week has a fixed match day (e.g., Wednesday)
2. Admin creates matches for the week
3. Deadline is 7 days after match day (next Wednesday)
4. If not played by deadline → forfeit applied

### Bracket Generation
1. Triggered when all groups complete (all matches played)
2. Top 4 from each group advance
3. Bracket seeding: 1st place vs 4th place, 2nd vs 3rd (crossover)
4. Single elimination, best of 3 sets

### Season Completion
1. When bracket final completes → season is done
2. Winner is crowned
3. If divisions exist: promotion/relegation matches scheduled

---

## 9. Out of Scope v1

- [ ] Promotion/relegation between divisions (v2)
- [ ] Multiple brackets per category (v2)
- [ ] Real-time match updates / live scoring
- [ ] Player-level statistics
- [ ] Social features / comments
- [ ] Media uploads (photos, videos)
- [ ] Match reminders / notifications
- [ ] Export standings to PDF/CSV
- [ ] LeagueStanding table (computed on-the-fly)

---

## 10. Technical Notes

### New Directories
```
src/
├── app/
│   ├── (dashboard)/
│   │   └── leagues/
│   │       ├── page.tsx
│   │       └── [leagueId]/
│   │           ├── page.tsx
│   │           └── seasons/
│   │               └── [seasonId]/
│   │                   ├── page.tsx
│   │                   └── groups/
│   │                       └── [groupId]/
│   │                           └── page.tsx
│   └── leagues/
│       ├── page.tsx           # Public browse
│       └── [leagueId]/
│           └── page.tsx       # User view
├── components/
│   └── leagues/
│       ├── LeagueCard.tsx
│       ├── LeagueForm.tsx
│       ├── SeasonCard.tsx
│       ├── SeasonForm.tsx
│       ├── GroupStandingsTable.tsx
│       ├── BracketView.tsx
│       └── index.ts
├── entities/
│   └── League.ts
├── context/
│   └── LeagueContext.tsx
├── hooks/
│   └── useLeagues.ts
└── services/
    └── leagueApi.ts
```

### Reuse Strategy
- **Match entity** — Extended with: `leagueId`, `seasonId`, `groupId`, `isBracket`, `round`, `matchWeek`, `deadlineDate`
- **MatchSet** — Already supports set-by-set games (6-2, 7-5, etc.)
- **EditMatchModal** — Reused for recording results
- **MatchCard** — Reused for displaying matches
- **Context pattern** — From `context/TourContext.tsx`
- **API pattern** — From existing API routes

### Computed Standings Algorithm
```typescript
function computeStandings(matches: Match[], groupTeams: Team[]): Standing[] {
  // 1. Filter matches by groupId and status=COMPLETED
  // 2. For each team:
  //    - played: count matches
  //    - won2Sets: won 2-0 (3 pts)
  //    - won3Sets: won 2-1 (2 pts)
  //    - lost3Sets: lost 1-2 (1 pt)
  //    - lost2Sets: lost 0-2 (0 pts)
  //    - gamesFor/Against: sum from MatchSet
  // 3. Calculate points: won2*3 + won3*2 + lost3*1
  // 4. Sort: points DESC → headToHead → gameDiff DESC → gamesFor DESC → name ASC
  // 5. Handle bye: add virtual win for bye week
}
```

---

## 11. Acceptance Criteria

- [ ] Admin can create a league with unique code
- [ ] Admin can create seasons with category name
- [ ] Admin can add/remove teams to season
- [ ] Groups auto-generate (random or seeded)
- [ ] Admin can schedule weekly matches
- [ ] Admin can record set scores (reuse EditMatchModal)
- [ ] Standings compute correctly with set-based points
- [ ] Forfeit rule applies when deadline passes
- [ ] Bracket generates from top 4 per group
- [ ] Admin can record bracket results
- [ ] Season closes when bracket completes
- [ ] Users can browse public leagues
- [ ] Users can enroll via code
- [ ] Users can view computed standings
- [ ] Users can follow matches
