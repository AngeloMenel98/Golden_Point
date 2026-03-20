# Padel Logic Skill — Golden Point Domain

## Overview

This skill documents the complete domain logic for the Golden Point padel tournament management system.

---

## Tour System

### What is a Tour?

A **Tour** is a container for multiple tournaments. It represents a complete padel circuit/season with its own identity:

- Has a unique `tourCode` (6-character generated code) used for joining
- Contains multiple Tournaments
- Can be associated with multiple Clubs
- Users can join a Tour using the tourCode

### Tour Entity Fields

| Field         | Type         | Description                               |
| ------------- | ------------ | ----------------------------------------- |
| `id`          | UUID         | Primary key                               |
| `title`       | string       | Tour name                                 |
| `tourCode`    | string       | 6-character unique code for joining       |
| `isDeleted`   | boolean      | Soft delete flag                          |
| `users`       | User[]       | Players/admins in the tour (Many-to-Many) |
| `tournaments` | Tournament[] | Tournaments in this tour (One-to-Many)    |
| `clubs`       | Club[]       | Venues for the tour (Many-to-Many)        |

### Tour Operations

| Operation | Endpoint                | Description                                               |
| --------- | ----------------------- | --------------------------------------------------------- |
| Create    | POST /tour/create       | Admin creates a new tour with title and club associations |
| Delete    | POST /tour/delete       | Soft delete a tour                                        |
| Join      | POST /tour/join         | User joins a tour using tourCode                          |
| Get All   | GET /tour/tours/:userId | Get all tours a user belongs to                           |
| Get By ID | GET /tour/:tourId       | Get a specific tour                                       |

### Tour Business Rules

- Only ADMIN users can create/delete tours
- Users join via tourCode (6-character generated code)
- A user cannot join the same tour twice
- Tour codes must be unique

---

## Tournament System

### What is a Tournament?

A **Tournament** is a single competition within a Tour. It belongs to exactly one Tour and can have multiple categories (e.g., Male-A, Female-B).

### Tournament States

```typescript
enum Status {
  PENDING = "pending", // Created but not started
  IN_PROGRESS = "inProgress", // Active and matches being played
  FINISH = "finish", // Completed
}
```

### Tournament Entity Fields

| Field        | Type       | Description                              |
| ------------ | ---------- | ---------------------------------------- |
| `id`         | UUID       | Primary key                              |
| `title`      | string     | Tournament name                          |
| `master`     | number     | Point multiplier (must be > 0)           |
| `status`     | Status     | PENDING, IN_PROGRESS, or FINISH          |
| `isDeleted`  | boolean    | Soft delete flag                         |
| `tour`       | Tour       | Parent tour (Many-to-One)                |
| `categories` | Category[] | Gender/level combinations (Many-to-Many) |
| `matches`    | Match[]    | All matches in tournament (One-to-Many)  |
| `teams`      | Team[]     | Registered teams (One-to-Many)           |

### Tournament Operations

| Operation          | Endpoint                       | Description                                |
| ------------------ | ------------------------------ | ------------------------------------------ |
| Create             | POST /tournament/create        | Admin creates tournament with categories   |
| Delete             | POST /tournament/delete        | Soft delete a tournament                   |
| Start              | POST /tournament/start         | Begin tournament (generate groups/matches) |
| Get All            | GET /tournament/tourns/:tourId | Get all tournaments in a tour              |
| Get Categories     | GET /tournament/cats/:tournId  | Get categories for a tournament            |
| Get My Tournaments | GET /tournament/:userId        | Get user's active tournaments              |

### Tournament Business Rules

- Only ADMIN users can create/delete/start tournaments
- `master` (point multiplier) must be > 0
- At least one category required
- Starting a tournament requires:
  - At least one Club associated via CalendarClub
  - Teams registered in the tournament
  - Tournament status changes to IN_PROGRESS

### Tournament Flow

```
┌─────────────┐
│   CREATE    │  Admin creates with title, master, categories
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  REGISTER   │  Teams sign up for the tournament
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    START    │  Admin triggers start:
│             │  - Fetch clubs and teams data
│             │  - Calculate team points from previous matches
│             │  - Sort teams by category and points
│             │  - Group teams into groups of 3
│             │  - Assign courts and match times
│             │  - Create group stage matches
│             │  - Status → IN_PROGRESS
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   FINISH    │  After all matches complete:
│             │  - Status → FINISH
└─────────────┘
```

---

## Team System

### Team Entity Fields

| Field         | Type        | Description                            |
| ------------- | ----------- | -------------------------------------- |
| `id`          | UUID        | Primary key                            |
| `teamName`    | string      | Team name                              |
| `category`    | string      | Gender/level category (e.g., "Male-A") |
| `isDeleted`   | boolean     | Soft delete flag                       |
| `users`       | User[]      | Exactly 2 players (Many-to-Many)       |
| `tournament`  | Tournament  | Parent tournament (Many-to-One)        |
| `teamMatches` | TeamMatch[] | Match participations (One-to-Many)     |

### Team Business Rules

- Each team must have exactly 2 players
- Teams belong to one category (gender + level)
- Teams can only participate in one Tournament at a time

---

## Match System

### Match Entity Fields

| Field              | Type        | Description                                                    |
| ------------------ | ----------- | -------------------------------------------------------------- |
| `id`               | UUID        | Primary key                                                    |
| `amountTourPoints` | number      | Points earned for winning                                      |
| `amountTourCoins`  | number      | Tour coins earned                                              |
| `matchDate`        | string      | Scheduled date/time                                            |
| `groupStage`       | string      | Group/bracket identifier (e.g., "Grupo 1", "Cuartos de Final") |
| `tournament`       | Tournament  | Parent tournament (Many-to-One)                                |
| `court`            | Court       | Playing venue (Many-to-One)                                    |
| `teamMatches`      | TeamMatch[] | Teams participating (One-to-Many)                              |
| `sets`             | Set[]       | Match results (One-to-Many)                                    |

### Match Flow

1. **Group Stage**: Matches auto-generated when tournament starts
2. **Within Group**: 3 teams = 3 matches total (round-robin: each team plays 2 matches)
   - Team A vs Team B
   - Team A vs Team C
   - Team B vs Team C
3. **Group Ranking**: Teams ranked by:
   - 1st: More matches won
   - 2nd: Higher games difference (if tied on matches)
4. **Advancement to Knockout**: Top 2 teams from each group advance
5. **Knockout**: Manually created via `createNextMatches`

### Match Result Calculation

#### Set Rules

- **Set Win Condition**: A team must win **2 out of 3 sets** to win the match
- **Set Length**: Each set finishes at **6 games**
- **Tiebreak**: If a set is tied **6-6** or **5-5**, it extends to **7 games** (sudden death at 7)
- **Set Tracking**: Game results are tracked in the `Set` entity

#### Match Win Condition

- Team with **most sets won** wins the match
- A match can end **2-0** or **2-1** (best of 3 sets)

#### Group Ranking

1. Total matches won (primary)
2. Games difference (if tied on matches)
3. Head-to-head (if still tied)

### Knockout Advancement Rules

- Top 2 teams from each group advance to knockout
- Tiebreaker order:
  1. More matches won
  2. Higher games difference
  3. Head-to-head result

---

## Category System

### What is a Category?

Categories define gender and skill level combinations for fair competition:

| Category | Description |
|----------|-------------|
| `Male-8` | Male players, lowest level |
| `Male-7` | Male players |
| `Male-6` | Male players |
| `Male-5` | Male players |
| `Male-4` | Male players |
| `Male-3` | Male players |
| `Male-2` | Male players |
| `Male-1` | Male players, highest level |
| `Female-8` | Female players, lowest level |
| `Female-7` | Female players |
| `Female-6` | Female players |
| `Female-5` | Female players |
| `Female-4` | Female players |
| `Female-3` | Female players |
| `Female-2` | Female players |
| `Female-1` | Female players, highest level |
| `Mixed-8` | Mixed gender, lowest level |
| `Mixed-7` | Mixed gender |
| `Mixed-6` | Mixed gender |
| `Mixed-5` | Mixed gender |
| `Mixed-4` | Mixed gender |
| `Mixed-3` | Mixed gender |
| `Mixed-2` | Mixed gender |
| `Mixed-1` | Mixed gender, highest level |

### Level System

- Levels range from **8th** (lowest) to **1st** (highest)
- Higher number = lower skill level
- Lower number = higher skill level

### Category Usage

- Tournaments can have multiple categories
- Teams are assigned one category
- Group stage is organized BY category
- **Mixed teams**: Teams can have male and female players combined

---

## Club/Venue System

### Club Entity Fields

| Field      | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `id`       | UUID   | Primary key                 |
| `clubName` | string | Venue name                  |
| `location` | string | Physical location           |
| `tours`    | Tour[] | Tours hosted (Many-to-Many) |

### CalendarClub (Tour-Club Association)

Links Tours to available Clubs with scheduling info:

| Field           | Type   | Description                  |
| --------------- | ------ | ---------------------------- |
| `availableFrom` | Date   | Start of availability window |
| `availableTo`   | Date   | End of availability window   |
| `courtNumbers`  | string | Comma-separated court IDs    |
| `categories`    | string | Available categories         |

---

## Ranking System

### Points Calculation

- Points are accumulated across all matches in a Tour
- `master` value in Tournament multiplies base points
- Only won matches count for ranking

### User Ranking Query

```typescript
// Aggregates points for users across all won matches in a Tour
SELECT
  u.id,
  pd.lastName,
  pd.firstName,
  SUM(m.amountTourPoints) AS totalPoints
FROM users u
JOIN personal_data pd ON pd.userId = u.id
JOIN team_users_user tuu ON tuu.userId = u.id
JOIN team t ON t.id = tuu.teamId
JOIN team_match tm ON tm.teamId = t.id
JOIN match m ON m.id = tm.matchId
JOIN tournament trn ON trn.id = t.tournamentId
JOIN tour_users_user ttt ON ttt.userId = u.id
JOIN tour t2 ON t2.id = ttt.tourId
WHERE tm.isWinner = true
  AND t2.id = :tourId
  AND t.category = :category
GROUP BY u.id, pd.lastName, pd.firstName
ORDER BY totalPoints DESC
```

---

## Group Stage Generation

### Algorithm

1. Get all teams for the tournament
2. Group teams by category
3. Sort teams within category by accumulated points
4. Divide into groups of 3 teams each
5. For each group, generate round-robin matches (3 teams = 3 matches)
6. Assign courts and time slots from available clubs

### Group DTO

```typescript
class GroupDTO {
  teamsId: string[]; // 3 team IDs
  courtsId: string[]; // Available courts
  matchDates: Date[]; // Scheduled times
  tourPoints: number; // Points for winning
  tourCoins: number; // Coins for winning
  groupName: string; // e.g., "Grupo 1"
}
```

---

## Knockout Stage

### Advancement Rules

- Top 2 teams from each group advance to knockout
- Pairing: 1st place from Group A vs 2nd place from Group B, and vice versa
- If groups are [A, B, C, D]:
  - A1 vs B2, B1 vs A2
  - C1 vs D2, D1 vs C2

### Knockout Progression Flow

```
┌─────────────────────────────────────────────┐
│              GROUP STAGE                     │
│  • Teams play round-robin within groups      │
│  • Uses available hours from clubs           │
│  • Scheduled match dates/times assigned      │
└─────────────────────┬───────────────────────┘
                      │
                      ▼ (when ALL group matches complete)
┌─────────────────────────────────────────────┐
│           QUARTERFINALS (Cuartos)            │
│  • Top 2 from each group advance             │
│  • Bracket pairing based on group results     │
│  • Uses next available hours                 │
└─────────────────────┬───────────────────────┘
                      │
                      ▼ (when ALL quarterfinals complete)
┌─────────────────────────────────────────────┐
│            SEMIFINALS (Semifinales)          │
│  • 4 remaining teams                         │
│  • Winners of QF1 vs QF2, QF3 vs QF4         │
│  • Uses next available hours                 │
└─────────────────────┬───────────────────────┘
                      │
                      ▼ (when ALL semifinals complete)
┌─────────────────────────────────────────────┐
│                 FINALS (Final)               │
│  • 2 remaining teams                         │
│  • Winners of SF1 vs SF2                     │
│  • Champion determined                        │
└─────────────────────────────────────────────┘
```

### Automatic Match Completion Detection

The system SHALL monitor match completion by category:

1. **Completion Check**: Query all matches for a category with current round `groupStage`
2. **All Complete?**: Check if ALL matches have sets recorded (has winner)
3. **Proceed**: If complete → create next round matches using next available hours
4. **Repeat**: Continue until Final match is complete

### Scheduling for Knockout Rounds

- Knockout matches use **remaining available hours** from the club schedule
- Hours are consumed sequentially (FIFO) across all rounds
- Court assignment follows same logic as group stage
- Round names are dynamic based on remaining teams:
  - 8 teams remaining → "Cuartos de Final"
  - 4 teams remaining → "Semifinales"
  - 2 teams remaining → "Final"

### createNextMatches Logic

```typescript
// Sort each group by: matchesWon DESC, gamesDiff DESC
// Select top 2 from each group
// Pairing:
//   - group[N][0] vs group[N+1][1]  (1st of group N vs 2nd of group N+1)
//   - group[N+1][0] vs group[N][1]  (1st of group N+1 vs 2nd of group N)
```

### Set Entity Reference

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| `id`         | UUID   | Primary key                     |
| `setNumber`  | number | 1, 2, or 3 (set order in match) |
| `team1Games` | number | Games won by team 1 (0-7)       |
| `team2Games` | number | Games won by team 2 (0-7)       |
| `match`      | Match  | Parent match (Many-to-One)      |

---

## TourCoin System

### Purpose

TourCoins are a virtual currency earned by winning matches:

- Earned: When winning a match (`amountTourCoins` from Match)
- Tracked: Per-user via TourCoin entity
- Spent: (Future use - rewards/redemptions)

### TourCoin Entity

| Field   | Type   | Description        |
| ------- | ------ | ------------------ |
| `coins` | number | Current balance    |
| `user`  | User   | Owner (One-to-One) |

---

## Notification System

### Notification Entity

| Field     | Type    | Description             |
| --------- | ------- | ----------------------- |
| `message` | string  | Notification content    |
| `isRead`  | boolean | Read status             |
| `user`    | User    | Recipient (Many-to-One) |

---

## Reward System

### Reward Entity

| Field           | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `description`   | string | Reward description               |
| `coinsRequired` | number | Cost in coins                    |
| `users`         | User[] | Users who claimed (Many-to-Many) |

---
