# Backend Skill — Golden Point (Technical)

## Project Context

| Aspect | Value |
|--------|-------|
| **Project** | Golden Point - Padel Tournament Management |
| **Language** | TypeScript 4.5.2 |
| **Runtime** | Express 4.18.2 |
| **ORM** | TypeORM 0.3.19 |
| **Database** | PostgreSQL 15 |
| **Auth** | JWT + bcrypt |

---

## Architecture

### Pattern: Controllers → Services → Repositories → Entities

```
Request → Controller → Service → Repository → Database
                ↓
           Error Handling (ErrorType discriminated union)
```

### Directory Structure

```
src/
├── controllers/      # Route handlers, request/response
├── services/         # Business logic
├── repository/       # Data access (TypeORM custom repos)
├── entity/           # TypeORM entities with decorators
│   └── dto/          # Data Transfer Objects
├── types/            # TypeScript type definitions
│   ├── dto/          # Response/Request DTOs
│   ├── error/        # Error types (discriminated unions)
│   └── response/     # ApiResponse wrapper
├── routes/           # Express route definitions
├── constants/        # Error codes, validation messages
├── helpers/         # Utility functions (bCrypt, validations)
├── utils/            # Interfaces and function helpers
├── errors/           # Error classes (deprecated, use types/error/)
└── index.ts          # Entry point

skills/
├── backend.md        # This file (technical info)
└── padel-logic.md    # Domain logic (Tours, Tournaments, etc.)
```

---

## Type System (Advanced)

### Error Types (Discriminated Union)

Located in `src/types/error/`:

```typescript
type ErrorType = 
  | { type: "NOT_FOUND"; entity: string; id: string }
  | { type: "VALIDATION"; message: string; field?: string }
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "CONFLICT"; message: string; entity: string }
  | { type: "INTERNAL"; message: string };
```

### Error Factory Functions

```typescript
import { notFound, validationError, conflict, internalError } from "./types/error/app-error";

// Usage:
throw notFound("User", userId);
throw validationError("Master is required", "master");
throw conflict("User already exists", "User");
```

### Error Type Guards

```typescript
import { isNotFoundError, isValidationError, isConflictError } from "./types/error/error-guards";

if (isNotFoundError(error)) {
  res.status(404).json(failure(error));
}
```

### API Response Wrapper

Located in `src/types/response/`:

```typescript
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorType };

const success = <T>(data: T): ApiResponse<T> => ({ success: true, data });
const failure = (error: ErrorType): ApiResponse<never> => ({ success: false, error });
```

### Controller Pattern

```typescript
async methodName(req: Request, res: Response): Promise<void> {
  try {
    const data = await this.service.method(...);
    res.status(200).json(success(data));
  } catch (e) {
    res.status(this.getErrorStatus(e)).json(failure(this.handleError(e)));
  }
}

private handleError(e: unknown): ErrorType {
  if (isNotFoundError(e)) return e;
  if (isValidationError(e)) return e;
  if (isConflictError(e)) return e;
  return internalError("Internal server error");
}

private getErrorStatus(e: unknown): number {
  if (isNotFoundError(e)) return 404;
  if (isValidationError(e)) return 400;
  if (isConflictError(e)) return 409;
  return 500;
}
```

### DTO Types

Located in `src/types/dto/`:

```typescript
import { UserResponse, UserCreateRequest, UserListResult } from "./types/dto/user";

type UserResponse = {
  id: string;
  username: string;
  email: string;
  isSingle: boolean;
  role: UserRole;
};
```

---

## Validation

### Express-Validator (Routes)

```typescript
import { body } from "express-validator";

router.post("/create", [
  body("username").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
], controller.create);
```

### class-validator (Entities)

```typescript
import { IsEnum, IsString, IsNotEmpty } from "class-validator";

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Column({ type: "enum", enum: UserRole })
@IsEnum(UserRole)
role: UserRole;
```

---

## Database

### TypeORM Configuration

```typescript
// src/data-source.ts
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,  // Auto-create tables (dev only!)
  logging: false,
  entities: [User, Tour, Tournament, Team, Match, ...],
});
```

### Custom Repository Pattern

```typescript
// src/repository/user.repository.ts
export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByUsername(username: string) {
    return this.findOne({ where: { username } });
  },

  async getAll(tourId: string) {
    return this.createQueryBuilder("u")
      .select(["u.id AS userId", "u.username AS userName"])
      .innerJoin("tour_users_user", "tuu", 'u.id = tuu."userId"')
      .where("tuu.tourId = :tourId", { tourId })
      .getRawMany();
  },
});
```

---

## Authentication

### JWT Flow

```typescript
// Login - Generate Token
const userResponse = { id, username, email, role };
const token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!);
res.json({ token });

// Protected Routes - Verify Token
import jwt from "jsonwebtoken";

const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
```

### Password Hashing

```typescript
import { hashValue, compareHash } from "./helpers/bCrypt.helper";

const hashedPassword = hashValue(plainPassword);
const isMatch = compareHash(plainPassword, hashedPassword);
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 4.5.2 | Language |
| `express` | 4.18.2 | HTTP server |
| `typeorm` | 0.3.19 | ORM |
| `pg` | 8.11.3 | PostgreSQL driver |
| `class-validator` | 0.14.1 | DTO validation |
| `express-validator` | 7.0.1 | Route validation |
| `jsonwebtoken` | 9.0.2 | JWT auth |
| `bcrypt` | 5.1.1 | Password hashing |
| `cors` | 2.8.5 | CORS middleware |
| `dotenv` | 16.4.1 | Environment variables |

---

## Code Conventions

| Rule | Convention |
|------|------------|
| **Variables/Functions** | camelCase |
| **Classes/Types/Interfaces** | PascalCase |
| **Files** | kebab-case (e.g., `user-service.ts`) |
| **Constants** | SCREAMING_SNAKE_CASE |
| **Enums** | PascalCase with UPPER values |

### Import Order

```typescript
// 1. External libraries
import express from "express";
import { DataSource } from "typeorm";

// 2. Internal modules (relative)
import { UserService } from "./services";
import { User } from "./entity";

// 3. Types
import { ApiResponse, success, failure } from "./types/response";
```

---

## Environment Variables

```bash
# .env.dev (loaded in src/index.ts)
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=goldenpoint
DB_USERNAME=postgres
DB_PASSWORD=postgres123
JWT_SECRET_KEY=your-secret-key
JWT_TTL=86400
LOG_LEVEL=debug
```

---

## Available Scripts

```bash
npm start          # Build and run (tsc-watch)
npm run build      # Compile TypeScript
npm run typeCheck  # TypeScript validation (tsc --noEmit)
npm run typeorm    # TypeORM CLI
```

---

## Related Documentation

- **Domain Logic**: See `skills/padel-logic.md` for complete Tour, Tournament, Match, Team, and Category system details
- **Type System**: See `src/types/` directory for DTOs and error types
