# Motomedic Mobile - Architecture Guidelines

Welcome to the Motomedic React Native (Expo) project.

This project strictly adheres to a **Feature-Based Architecture** guided by Next.js structural principles, adapted for a mobile environment.

## 🏗 Directory Structure

All application code must live inside the `src/` directory.

```text
src/
├── app/                        # Expo Router (Layouts & Screen bindings)
├── components/
│   ├── atoms/                  # Generic RN components (Button, Text) - Wraps react-native-reusables
│   ├── molecules/              # Composed generic components
│   ├── organisms/              # Complex UI (e.g., AppHeader, BottomNav)
│   └── ui/                     # react-native-reusables (shadcn/ui equivalent)
├── features/                   # Feature slices (Auth, Rides, Profile, etc.)
│   └── [feature-name]/
│       ├── components/         # Presentational only (UI)
│       ├── containers/         # Logic & Data Fetching (Smart components)
│       ├── hooks/              # TanStack Query hooks
│       ├── services/           # Native fetch API calls
│       ├── queries/            # Query keys
│       ├── types/              # TS Types
│       └── data/               # Mock data
├── store/                      # Zustand global stores
├── providers/                  # React Query Provider, Theme Provider, etc.
├── lib/                        # Global utilities (utils.ts)
├── config/                     # Constants, Theme configs
├── styles/                     # global.css (NativeWind configuration)
└── types/                      # Global TS types
```

## 🛠 Tech Stack

| Concern | Tool |
| --- | --- |
| Framework | **Expo SDK 56 + React Native** |
| Language | **TypeScript** (Strict) |
| Routing | **Expo Router** (`src/app/`) |
| Styling | **NativeWind** (Tailwind CSS for React Native) |
| UI Components | **react-native-reusables** (shadcn/ui equivalent) |
| Server Data Fetching | **TanStack Query** + **Native `fetch`** (No Axios) |
| Client Global State | **Zustand** |
| Testing | **Jest** (Unit) / **Detox or Maestro** (E2E) |

---

## 📐 Core Principles

### 1. Atomic Design & Styling
We use NativeWind to write Tailwind utility classes directly on React Native primitives (`View`, `Text`, `Pressable`, etc.).
Never write raw `StyleSheet.create` unless absolutely necessary for complex animations.

- **Atoms:** Wrap standard `react-native-reusables` or core NativeWind components.
- **Molecules:** Compose 2-3 Atoms (e.g., Input + Button = SearchBar).
- **Organisms:** Complex layouts that combine molecules (e.g., Header, Card).

### 2. Container / Presentational Pattern
Features are split strictly between logic (Containers) and UI (Presentational).

**Presentational Components (`src/features/.../components/`)**
These only accept props. They do *not* fetch data, read Zustand, or use side-effects.
```tsx
import { View, Text, FlatList } from 'react-native';

export default function RideList({ rides }) {
  return (
    <FlatList 
      data={rides}
      renderItem={({ item }) => (
        <View className="p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-lg font-bold">{item.destination}</Text>
        </View>
      )}
    />
  );
}
```

**Containers (`src/features/.../containers/`)**
These fetch data using TanStack Query, read global state, and pass data down.
```tsx
import RideList from '../components/RideList';
import { useRides } from '../hooks/use-rides';

export default function RideListContainer() {
  const { data: rides, isLoading } = useRides();

  if (isLoading) return <Text>Loading...</Text>;
  return <RideList rides={rides ?? []} />;
}
```

### 3. Routing Layer (`src/app/`)
The `app/` directory serves *only* as a routing layer. Screens should remain extremely thin, merely importing and rendering **Containers** or **Organisms**.

### 4. Data Fetching
Always use TanStack Query (`useQuery`, `useMutation`) wrapping native `fetch` inside the `/services/` folder. Do not use raw `useEffect` + `fetch` inside components.

### 5. Client State (Zustand)
Use Zustand for UI-only state. **Never** store server data in Zustand — use TanStack Query for that.

**Persistence**: Use `zustand/middleware` persist with `AsyncStorage` adapter for state that must survive app restarts (e.g. ride timer sessions). Non-persisted stores reset on app launch.

### 6. Timer Feature
Timer lives in `features/timer/` with a Zustand store (`timer-store.ts`) managing 4 states: `idle`, `running`, `paused`, `stopped`.

- **Start**: Sets `startedAt` timestamp, transitions to `running`.
- **Pause**: Records `pausedAt` timestamp, transitions to `paused`.
- **Resume**: Calculates pause duration, adds to `totalPausedMs`, transitions back to `running`.
- **Stop**: Computes active elapsed time (`stoppedAt - startedAt - totalPausedMs`), saves session to AsyncStorage via `timer-storage.ts`, transitions to `stopped`. After 5s the store auto-resets to `idle`.
- **Elapsed time display**: `useElapsedTime()` hook polls every 1s during `running`, returns `{ formatted: "HH:MM:SS", seconds: number }`. Paused duration is excluded.

**Persistent overlay**: `TimerRunningToast` renders at the app root inside `AppProviders`, so it persists across all screens. It slides in from the top, shows a status bar (green/blue/red), live time, and pause/resume/stop buttons.

**Dashboard integration**: `RideCard` on the mileage dashboard provides start/pause/resume/stop controls. `RideRecordings` modal lists all past sessions from AsyncStorage with totals and a clear-all option.

### 7. Toast System
Reusable toast notifications in `components/toast/`. Five variants: `success` (teal), `warning` (amber), `error` (red + optional Retry), `info` (blue), `running` (persistent — used by timer).

- Stacked auto-dismiss toasts anchored at the **bottom** of the screen.
- Consecutive toasts of the same variant are deduplicated (prevents spam).
- Requires `ToastProvider` at the app root and `ToastContainer` rendered somewhere in the tree.

---

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npx expo start
   ```
## 🛠 Scaffolding a New Feature

When creating a new feature (e.g., `rides`, `profile`, `auth`), follow these steps and maintain the strict folder structure. You can use the `src/features/example/` directory as a template.

1. **Create the Folder:** Create `src/features/[feature-name]/`.
2. **Scaffold Subdirectories:** Create `components`, `containers`, `hooks`, `services`, `queries`, `types`, and `data`.
3. **Types & Services First:** Define your TypeScript interfaces in `/types/` and write your native `fetch` API calls in `/services/`.
4. **TanStack Query:** Define your query keys in `/queries/` and write your custom `useQuery`/`useMutation` hooks in `/hooks/`.
5. **Presentational UI:** Build your dumb UI components in `/components/` using React Native primitives (`View`, `Text`) and NativeWind. Zero fetching here!
6. **Container:** Build your smart component in `/containers/` that calls your hooks and passes the data down to the presentational UI.
7. **Routing Layer:** Finally, import your Container into a screen inside `src/app/` to display it to the user.
