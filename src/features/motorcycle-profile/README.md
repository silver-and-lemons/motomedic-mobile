# Motorcycle Profile Feature

Collects a rider's motorcycle questionnaire, generates a pre-trip checklist via the API, and persists both the profile and checklist locally across sessions.

## Directory Structure

```
features/motorcycle-profile/
  components/                 — Presentational step UI
    VehicleTypeStep.tsx
    EngineSizeStep.tsx
    FuelTypeStep.tsx
    CoolingTypeStep.tsx
    BikeAgeStep.tsx
    PoliciesAgreementStep.tsx
    SummaryOverlay.tsx
  containers/
    QuestionnaireContainer.tsx — Orchestrator: form state, navigation, API mutation
  hooks/
    use-checklist.ts           — TanStack Query mutation hook
  services/
    checklist.service.ts       — Native fetch to POST /api/checklist/generate
    mapper.ts                  — Frontend schema → API schema converter
  queries/
    checklist.queries.ts       — Query key factory
  types/
    motorcycle-profile.ts      — Zod schema + frontend types
  README.md
```

## Data Flow

```
Questionnaire (React Hook Form + Zod)
  │
  ├── handleConfirm()
  │     │
  │     ├── saveProfile(profile) ──► Zustand (persisted to AsyncStorage)
  │     │
  │     └── useGenerateChecklist mutation
  │           │
  │           ├── mapper.ts ──► MotorcycleProfile → MotorcycleQuestionnaire
  │           │
  │           ├── checklist.service.ts ──► POST /api/checklist/generate
  │           │
  │           ├── onSuccess: saveChecklist(result) ──► AsyncStorage
  │           │
  │           └── onError: Alert.alert()
  │
  └── router.back()
```

## Schema Mapping

The frontend collects user-friendly numeric values; the API expects discrete enums. The mapper bridges the gap.

| Frontend Field | Frontend Type | API Field | API Type | Mapping Rule |
|---|---|---|---|---|
| `vehicleType` | enum | `bikeType` | enum | Same values, renamed |
| `engineSizeCc` | `number` (50–2500) | `engineSize` | `"100-125cc" \| "126-155cc" \| "156cc-above"` | ≤125, ≤155, >155 |
| `fuelType` | enum | `fuelSystem` | enum | Same values, renamed |
| `coolingType` | enum | `cooling` | enum | Same values, renamed |
| `bikeAge` | `number` (year) | `bikeAge` | `"2014-and-older" \| "2015-2019" \| "2020-present"` | ≤2014, ≤2019, >2019 |

## Key Types

| Type | Defined In | Purpose |
|---|---|---|
| `MotorcycleProfile` | `types/motorcycle-profile.ts` | Frontend Zod schema for the questionnaire form |
| `MotorcycleQuestionnaire` | `types/api.ts` | Shape sent to the checklist generation API |
| `ChecklistResult` | `types/api.ts` | Response from the checklist generation API |
| `ChecklistItem` | `types/api.ts` | A single checklist entry (id, label, category, status, etc.) |

## State Boundaries

| Data | Owner | Persistence |
|---|---|---|
| Profile (client-entered) | Zustand | ✅ AsyncStorage (via `persist` middleware) |
| Checklist (API-generated) | AsyncStorage | ✅ Direct via `lib/storage.ts` |
| Mutation loading state | TanStack Query | ❌ Transient (mutation lifecycle) |
| Error state | TanStack Query | ❌ Transient (Alert.alert on error) |

## API Endpoint

### `POST /api/checklist/generate`

- **Body:** `MotorcycleQuestionnaire` (after mapper conversion)
- **Response:** `ChecklistResult` with profile echo + checklist items array + `generatedAt` timestamp
- **Status 201:** Success
- **Status 400:** Invalid body

The `POST /api/checklist/evaluate` endpoint exists on the API but is **not yet integrated** in this feature.

API base URL is configured via `EXPO_PUBLIC_API_URL` in `.env` (defaults to `http://localhost:3000`).

## Dependencies

| Package | Purpose |
|---|---|
| `@tanstack/react-query` | Mutation lifecycle management |
| `zustand` + `zustand/middleware` | Client state + persistence |
| `@react-native-async-storage/async-storage` | Cross-session data persistence |
| `react-hook-form` + `@hookform/resolvers` | Form state + Zod integration |
| `zod` | Runtime validation |

## Run with the API

```bash
# Terminal 1: Start the API
cd motomedic-api
npm run dev

# Terminal 2: Start the mobile app
cd motomedic-mobile
npx expo start
```

The app will connect to the API at the URL specified in `.env` (`EXPO_PUBLIC_API_URL`).
