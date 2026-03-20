# TypeScript Conventions: Golden Point

## TypeScript Configuration
- **Version:** TypeScript 4.5.2 (configured in package.json)
- **Target:** ES5
- **Module:** CommonJS
- **Decorators:** Enabled (`experimentalDecorators`, `emitDecoratorMetadata`)
- **Type definitions:** node, express, cors

## Type Patterns

### Interfaces vs Types
```typescript
// Use interface for entity-like structures and public APIs
interface ClubData {
  clubName: string;
  master: number;
  avFrom: Date;
  avTo: Date;
  allHours?: Date[];
  ctNumbers: string[];
  categories: string[];
}

// Use type for unions, intersections, and utility types
type Status = "pending" | "inProgress" | "finish";
```

### Enums
```typescript
// Status enum in Tournament entity
export enum Status {
  FINISH = "finish",
  IN_PROGRESS = "inProgress",
  PENDING = "pending",
}

// UserRole enum
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
```

### Entity Decorators (TypeORM)
```typescript
@Entity()
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Tournament, (tournaments) => tournaments.tour)
  tournaments: Tournament[];

  @ManyToMany(() => Club, (club) => club.tours)
  @JoinTable()
  clubs: Club[];
}
```

## Import Organization
```typescript
// 1. External imports (Node, express, typeorm, etc.)
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Request, Response } from "express";

// 2. Internal imports - entity imports
import { Tour, Tournament } from "../entity";

// 3. Internal imports - services/repositories
import { TourRepository, UserRepository } from "../repository";

// 4. Internal imports - other modules
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
```

## API Typing Patterns
```typescript
// Request body typing
const { title, userId, clubsId } = req.body;

// Response object construction
const response = {
  id: tour.id,
  title: tour.title,
  tourCode: tour.tourCode,
  usersId: tour.users.map((u) => u.id),
};
```

## Error Handling Patterns
```typescript
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

// In services
throw new ServiceCodeError(codeErrors.TOUR_1);

// In controllers
try {
  // business logic
} catch (e) {
  console.error(e);
  if (isServiceCodeError(e)) {
    return res.status(400).json({ error: [{ msg: e.message }] });
  }
  res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
}
```

## Naming Conventions
- **Files:** PascalCase for entities/DTOs (Tour.ts, GroupDTO.ts), camelCase for others
- **Classes:** PascalCase (TourService, TournamentController)
- **Variables/Functions:** camelCase (existingTour, createGroupsDTOPerCat)
- **Enums:** PascalCase name, UPPER_SNAKE for values
- **Interfaces:** PascalCase (ClubData, TourData)
- **Database columns:** snake_case in DB, camelCase in TypeScript

## DTO Pattern
```typescript
export class GroupDTO {
  constructor(
    public teamsId: string[],
    public courtsId: string[],
    public matchDates: Date[],
    public tourPoints: number,
    public tourCoins: number,
    public groupName: string
  ) {}
}
```

## Service Instantiation
Services are instantiated in constructors for dependency management:
```typescript
export class TournamentService {
  private tourService: TourService;
  private categoryService: CategoryService;
  private matchService: MatchService;

  constructor() {
    this.tourService = new TourService();
    this.categoryService = new CategoryService();
    this.matchService = new MatchService();
  }
}
```
