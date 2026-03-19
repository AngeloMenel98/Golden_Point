export type ErrorType = 
  | { type: "NOT_FOUND"; entity: string; id: string }
  | { type: "VALIDATION"; message: string; field?: string }
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "CONFLICT"; message: string; entity: string }
  | { type: "INTERNAL"; message: string };
