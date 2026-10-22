# Database Schema: Leagues Feature

**Backend:** `service-backend/src/entity/`
**ORM:** TypeORM
**Pattern:** Follows existing entity conventions

---

## Entity Overview

```
League
  └── Season
        └── Group
        │     └── GroupTeam (junction: Group ↔ Team)
        └── LeagueMatch
              └── Set (existing, unchanged)
        └── BracketSeed
        └── SeasonTeam (junction: Season ↔ Team)
```

---

## 1. League Entity

```typescript
// src/entity/League.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Season } from "./Season";

export enum LeagueStatus {
  DRAFT = "draft",
  REGISTRATION_OPEN = "registration_open",
  IN_PROGRESS = "in_progress",
  FINISHED = "finished",
}

@Entity()
@Index("IDX_LEAGUE_CODE", ["leagueCode"], { unique: true })
@Index("IDX_LEAGUE_STATUS", ["status"])
export class League {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ length: 10 })
  leagueCode: string;  // 6-char unique code (e.g., "PPMX24")

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: LeagueStatus,
    default: LeagueStatus.DRAFT,
  })
  status: LeagueStatus;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "ownerId" })
  owner: User;

  @Column({ name: "ownerId" })
  ownerId: string;

  @OneToMany(() => Season, (season) => season.league)
  seasons: Season[];
}
```

---

## 2. Season Entity

```typescript
// src/entity/Season.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { League } from "./League";
import { Group } from "./Group";
import { SeasonTeam } from "./SeasonTeam";
import { LeagueMatch } from "./LeagueMatch";
import { BracketSeed } from "./BracketSeed";

export enum SeasonStatus {
  UPCOMING = "upcoming",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

@Entity()
@Index("IDX_SEASON_LEAGUE", ["league"])
export class Season {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;  // "Temporada 1"

  @Column({ length: 50 })
  category: string;  // "Primera División"

  @Column({ type: "date", nullable: true })
  startDate: string;

  @Column({ type: "date", nullable: true })
  endDate: string;

  @Column({ type: "integer", default: 0 })
  groupStageWeeks: number;  // Calculated: N teams = N weeks

  @Column({ type: "integer", nullable: true })
  bracketStartWeek: number;  // Week when bracket begins

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: SeasonStatus,
    default: SeasonStatus.UPCOMING,
  })
  status: SeasonStatus;

  @ManyToOne(() => League, (league) => league.seasons, { nullable: false })
  @JoinColumn({ name: "leagueId" })
  league: League;

  @Column({ name: "leagueId" })
  leagueId: string;

  @OneToMany(() => Group, (group) => group.season)
  groups: Group[];

  @OneToMany(() => SeasonTeam, (st) => st.season)
  seasonTeams: SeasonTeam[];

  @OneToMany(() => LeagueMatch, (match) => match.season)
  matches: LeagueMatch[];

  @OneToMany(() => BracketSeed, (seed) => seed.season)
  bracketSeeds: BracketSeed[];
}
```

---

## 3. Group Entity

```typescript
// src/entity/Group.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Season } from "./Season";
import { GroupTeam } from "./GroupTeam";
import { LeagueMatch } from "./LeagueMatch";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  name: string;  // "Grupo A", "Grupo B"

  @Column({ type: "integer", default: 0 })
  position: int;  // Display order

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToOne(() => Season, (season) => season.groups, { nullable: false })
  @JoinColumn({ name: "seasonId" })
  season: Season;

  @Column({ name: "seasonId" })
  seasonId: string;

  @OneToMany(() => GroupTeam, (gt) => gt.group)
  groupTeams: GroupTeam[];

  @OneToMany(() => LeagueMatch, (match) => match.group)
  matches: LeagueMatch[];
}
```

---

## 4. SeasonTeam Entity (Junction: Season ↔ Team)

```typescript
// src/entity/SeasonTeam.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { Season } from "./Season";
import { Team } from "./Team";

@Entity()
@Index("IDX_SEASON_TEAM_SEASON", ["season"])
@Index("IDX_SEASON_TEAM_TEAM", ["team"])
@Index("IDX_SEASON_TEAM_UNIQUE", ["season", "team"], { unique: true })
export class SeasonTeam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer", nullable: true })
  seed: number;  // Previous season ranking (null = random)

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "enrolledAt" })
  enrolledAt: Date;

  @ManyToOne(() => Season, (season) => season.seasonTeams, { nullable: false })
  @JoinColumn({ name: "seasonId" })
  season: Season;

  @Column({ name: "seasonId" })
  seasonId: string;

  @ManyToOne(() => Team, { nullable: false })
  @JoinColumn({ name: "teamId" })
  team: Team;

  @Column({ name: "teamId" })
  teamId: string;
}
```

---

## 5. GroupTeam Entity (Junction: Group ↔ Team via SeasonTeam)

```typescript
// src/entity/GroupTeam.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { Group } from "./Group";
import { SeasonTeam } from "./SeasonTeam";

@Entity()
@Index("IDX_GROUP_TEAM_GROUP", ["group"])
@Index("IDX_GROUP_TEAM_SEASON_TEAM", ["seasonTeam"])
@Index("IDX_GROUP_TEAM_UNIQUE", ["group", "seasonTeam"], { unique: true })
export class GroupTeam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "assignedAt" })
  assignedAt: Date;

  @ManyToOne(() => Group, (group) => group.groupTeams, { nullable: false })
  @JoinColumn({ name: "groupId" })
  group: Group;

  @Column({ name: "groupId" })
  groupId: string;

  @ManyToOne(() => SeasonTeam, (st) => st.groupTeams, { nullable: false })
  @JoinColumn({ name: "seasonTeamId" })
  seasonTeam: SeasonTeam;

  @Column({ name: "seasonTeamId" })
  seasonTeamId: string;
}
```

---

## 6. LeagueMatch Entity

```typescript
// src/entity/LeagueMatch.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { Season } from "./Season";
import { Group } from "./Group";
import { Set } from "./Set";
import { TeamMatch } from "./TeamMatch";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  FORFEITED = "forfeited",
}

@Entity()
@Index("IDX_LEAGUE_MATCH_SEASON", ["season"])
@Index("IDX_LEAGUE_MATCH_GROUP", ["group"])
@Index("IDX_LEAGUE_MATCH_WEEK", ["matchWeek"])
export class LeagueMatch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamptz", nullable: true })
  matchDate: string;

  @Column({ type: "date", nullable: true })
  deadlineDate: string;  // Must complete by this date or forfeit

  @Column({ type: "integer", nullable: true })
  matchWeek: number;  // Week number in group stage (1, 2, 3...)

  @Column({ default: false })
  isBracket: boolean;  // true if knockout match

  @Column({ type: "integer", nullable: true })
  round: number;  // 1=quarter, 2=semi, 3=final (null for group stage)

  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.SCHEDULED,
  })
  status: MatchStatus;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToOne(() => Season, (season) => season.matches, { nullable: false })
  @JoinColumn({ name: "seasonId" })
  season: Season;

  @Column({ name: "seasonId" })
  seasonId: string;

  @ManyToOne(() => Group, (group) => group.matches, { nullable: true })
  @JoinColumn({ name: "groupId" })
  group: Group;  // null for bracket matches

  @Column({ name: "groupId", nullable: true })
  groupId: string;

  @OneToMany(() => Set, (set) => set.match)
  sets: Set[];

  @OneToMany(() => TeamMatch, (tm) => tm.match)
  teamMatches: TeamMatch[];
}
```

---

## 7. BracketSeed Entity

```typescript
// src/entity/BracketSeed.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from "typeorm";
import { Season } from "./Season";
import { Team } from "./Team";

@Entity()
@Index("IDX_BRACKET_SEED_SEASON", ["season"])
@Index("IDX_BRACKET_SEED_UNIQUE", ["season", "team"], { unique: true })
export class BracketSeed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer" })
  groupPosition: number;  // 1-4 from group stage

  @Column({ length: 20 })
  groupName: string;  // "Grupo A" - which group they came from

  @ManyToOne(() => Season, (season) => season.bracketSeeds, { nullable: false })
  @JoinColumn({ name: "seasonId" })
  season: Season;

  @Column({ name: "seasonId" })
  seasonId: string;

  @ManyToOne(() => Team, { nullable: false })
  @JoinColumn({ name: "teamId" })
  team: Team;

  @Column({ name: "teamId" })
  teamId: string;
}
```

---

## 8. Database Indexes

```typescript
// src/migrations/XXXXXXXXXXXXX-AddLeagueTables.ts

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLeagueTablesXXXXXXXXX implements MigrationInterface {
  name = 'AddLeagueTablesXXXXXXXXX';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Composite indexes for common queries
    await queryRunner.query(`CREATE INDEX "IDX_LEAGUE_MATCH_SEASON_GROUP" ON "league_match" ("seasonId", "groupId")`);
    await queryRunner.query(`CREATE INDEX "IDX_SEASON_LEAGUE_STATUS" ON "season" ("leagueId", "status")`);
    await queryRunner.query(`CREATE INDEX "IDX_GROUP_SEASON_POSITION" ON "league_group" ("seasonId", "position")`);
    await queryRunner.query(`CREATE INDEX "IDX_BRACKET_SEED_SEASON_POSITION" ON "bracket_seed" ("seasonId", "groupPosition")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_LEAGUE_MATCH_SEASON_GROUP"`);
    await queryRunner.query(`DROP INDEX "IDX_SEASON_LEAGUE_STATUS"`);
    await queryRunner.query(`DROP INDEX "IDX_GROUP_SEASON_POSITION"`);
    await queryRunner.query(`DROP INDEX "IDX_BRACKET_SEED_SEASON_POSITION"`);
  }
}
```

---

## 9. Entity Relationships Diagram

```
┌─────────────┐       ┌─────────────┐
│   League    │───────│    User     │
│  (ownerId)  │       │  (owner)    │
└──────┬──────┘       └─────────────┘
       │
       │ 1:N
       ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Season    │───────┤   Team      │◄──────│ SeasonTeam  │
│ (leagueId)  │       │             │       │(seasonId,   │
└──────┬──────┘       └─────────────┘       │  teamId)    │
       │                                 └───────┬───────┘
       │ 1:N                                       │
       ▼                                     ┌─────┴───────┐
┌─────────────┐       ┌─────────────┐       │             │
│   Group     │───────┤             │◄──────│  GroupTeam  │
│ (seasonId)  │       │             │       │(groupId,    │
└──────┬──────┘       └─────────────┘       │ seasonTeamId)
       │                                       └─────────────┘
       │ 1:N
       ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│LeagueMatch  │───────┤    Set      │       │  TeamMatch  │
│(seasonId,  │       │  (matchId)  │       │ (teamId,    │
│ groupId)   │       └─────────────┘       │  matchId)   │
└─────────────┘                             └─────────────┘
       │
       │ (if bracket)
       ▼
┌─────────────┐
│BracketSeed  │
│(seasonId,   │
│  teamId)    │
└─────────────┘
```

---

## 10. Reused Entities (No Changes)

| Entity | Usage in League |
|--------|-----------------|
| `Team` | Via `SeasonTeam` junction |
| `TeamMatch` | Via `LeagueMatch.teamMatches` |
| `Set` | Via `LeagueMatch.sets` — stores set scores |
| `User` | Via `League.owner` |

---

## 11. Computed Standings (SQL Query Reference)

Standings are computed from `LeagueMatch` + `Set` data:

```sql
-- Example: Get group standings
SELECT 
  gt.id AS teamId,
  t.teamName,
  COUNT(lm.id) AS played,
  SUM(CASE WHEN lm.status = 'completed' AND tm.isWinner = true THEN 1 ELSE 0 END) AS won,
  -- ... calculate won2Sets, won3Sets, lost3Sets, lost2Sets from Set data
  SUM(s.gamesTeam1) AS gamesFor,
  SUM(s.gamesTeam2) AS gamesAgainst,
  -- Calculate points: won2*3 + won3*2 + lost3*1
FROM league_group g
JOIN group_team gt ON gt.groupId = g.id
JOIN season_team st ON st.id = gt.seasonTeamId
JOIN team t ON t.id = st.teamId
LEFT JOIN league_match lm ON lm.groupId = g.id 
  AND (lm.homeTeamId = t.id OR lm.awayTeamId = t.id)
LEFT JOIN set s ON s.matchId = lm.id
WHERE g.id = :groupId AND lm.status = 'completed'
GROUP BY gt.id, t.teamName
ORDER BY points DESC, gameDiff DESC, gamesFor DESC;
```

---

## 12. File Structure

```
service-backend/src/
├── entity/
│   ├── League.ts
│   ├── Season.ts
│   ├── Group.ts
│   ├── SeasonTeam.ts
│   ├── GroupTeam.ts
│   ├── LeagueMatch.ts
│   ├── BracketSeed.ts
│   └── index.ts  (add exports)
├── repository/
│   ├── league.repository.ts
│   ├── season.repository.ts
│   ├── group.repository.ts
│   ├── seasonTeam.repository.ts
│   ├── leagueMatch.repository.ts
│   └── bracketSeed.repository.ts
├── services/
│   ├── leagueService.ts
│   ├── seasonService.ts
│   ├── groupService.ts
│   └── standingsService.ts  (computed standings)
├── routes/
│   └── league.ts
├── migrations/
│   └── XXXXXXXXXXXXX-AddLeagueTables.ts
└── types/dto/
    ├── league.dto.ts
    ├── season.dto.ts
    ├── group.dto.ts
    └── standings.dto.ts
```
