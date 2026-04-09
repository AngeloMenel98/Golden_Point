# Tasks: fix-team-duplication-in-quarter-finals

## Phase 1: GroupStage Auto-Creation Fix

### Task 1.1: Review and Fix GroupStage Creation in match.repository.ts
- **File**: `service-backend/src/repository/match.repository.ts`
- **Lines**: 52-92 (create function)
- **Description**: Review the current GroupStage auto-creation logic to ensure it works correctly for knockout stages (Cuartos de Final, Semifinales, Final). The current code checks if groupStage exists by name but may need to filter by tournament to avoid cross-tournament conflicts.
- **Action**: 
  1. Review existing logic at lines 62-73
  2. Add tournament filter to GroupStage lookup if missing
  3. Ensure knockout stage names are properly handled

- [x] Task 1.1: Fixed - Added tournament filter to GroupStage lookup to avoid cross-tournament conflicts

---

## Phase 2: Core Implementation

### Task 2.1: Add Deduplication in getQualifiedTeams
- **File**: `service-backend/src/services/tournamentService.ts`
- **Lines**: 377-450 (getQualifiedTeams function)
- **Description**: Prevent duplicate teamIds from appearing in the qualified teams array. Currently, a team could appear multiple times if they win multiple matches.
- **Action**:
  1. After building qualifiedTeams array (around line 446), add Set-based deduplication
  2. Use a Map or Set to track unique teamIds before returning
  3. Example: `const uniqueTeams = [...new Map(qualifiedTeams.map(t => [t.teamId, t])).values()]`

- [x] Task 2.1: Added deduplication using Map to track unique teamIds before returning`

### Task 2.2: Add Validation in createNextMatches
- **File**: `service-backend/src/services/tournamentService.ts`
- **Lines**: 682-773 (createNextMatches function)
- **Description**: Add safety validation to ensure each team appears in only one matchup before creating matches. This prevents the bug where duplicate teams could be created in quarter-finals.
- **Action**:
  1. After building matchups array (around line 728), add validation check
  2. Create a Set of all teamIds in matchups
  3. If set.size !== matchups.length * 2, throw validationError with clear message
  4. Example: Validate that all teamIds are unique before proceeding to create matches

- [x] Task 2.2: Added validation to check each team appears in only one matchup + sorted groups for deterministic pairing

---

## Phase 3: Testing

### Task 3.1: Run Existing Tests
- **Description**: Run the existing test suite to verify no regressions were introduced by the changes
- **Action**:
  1. Run `npm test` or equivalent test command in service-backend
  2. Verify all tests pass
  3. If any tests fail, analyze and fix issues

- [x] Task 3.1: All 15 tests pass - 3 failed before fix, now all passing

### Task 3.2: Manual Verification (Optional)
- **Description**: If tests pass but issue persists, manually verify the flow
- **Action**:
  1. Create a test tournament with groups
  2. Complete group stage matches
  3. Trigger knockout progression
  4. Verify no duplicate teams appear in quarter-finals
