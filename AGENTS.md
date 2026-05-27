# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

# Mobile Lead Frontend Engineer Standards

Enforce these standards on every file, every review, every scaffold for this Expo/React Native project. No exceptions unless explicitly told otherwise.

## Tech Stack

| Concern       | Tool                     |
| ------------- | ------------------------ |
| Framework     | Expo (React Native)      |
| Language      | TypeScript               |
| Routing       | Expo Router (`app/`)     |
| Styling       | NativeWind (Tailwind)    |
| Data Fetching | TanStack Query           |
| Client State  | Zustand                  |
| Forms         | React Hook Form + Zod    |
| UI Components | react-native-reusables   |
| Testing       | Jest + Detox/Maestro     |
| HTTP          | Native `fetch` only      |

Never suggest Axios or any other HTTP library. Use `View`, `Text`, `Pressable`, etc., instead of HTML tags.

---

## Folder Structure

```
src/
├── app/                        # Expo Router
├── components/
│   ├── atoms/                  # Wrap react-native-reusables or NativeWind
│   ├── molecules/              # Compose atoms
│   ├── organisms/              # Complex UI sections
│   └── ui/                     # react-native-reusables primitives
├── features/
│   └── [feature-name]/
│       ├── components/         # Presentational
│       ├── containers/         # Data + logic
│       ├── hooks/              # TanStack Query hooks
│       ├── services/           # fetch calls
│       ├── queries/            # Query key configs
│       ├── types/              # Interfaces
│       └── data/               # Mock data
├── store/                      # Zustand global stores
├── providers/                  # React Query, Theme wrappers
├── lib/                        # Utilities, helpers
├── config/                     # env.ts, constants.ts
├── styles/                     # global.css (NativeWind)
├── types/                      # Global TS types
└── __tests__/
    ├── unit/
    └── e2e/
```

---

## Container / Presentational Pattern

**Presentational** — UI only, zero data fetching, zero side effects:

```tsx
// features/rides/components/RideList.tsx
import { View, Text, FlatList } from 'react-native';

type RideListProps = {
  rides: Ride[];
  isLoading: boolean;
  error?: string;
};

export default function RideList({ rides, isLoading, error }: RideListProps) {
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  return (
    <FlatList
      data={rides}
      keyExtractor={(r) => r.id}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-slate-200">
          <Text className="text-lg font-bold">{item.destination}</Text>
        </View>
      )}
    />
  );
}
```

**Container** — fetch data, pass to presentational:

```tsx
// features/rides/containers/RideListContainer.tsx
import RideList from '../components/RideList';
import { useRides } from '../hooks/use-rides';

export default function RideListContainer() {
  const { data, isLoading, error } = useRides();
  return (
    <RideList rides={data ?? []} isLoading={isLoading} error={error?.message} />
  );
}
```

---

## Atomic Design

Three levels. Never skip. Never mix.

**Atoms** — always wrap `react-native-reusables` or primitive elements:

```tsx
// components/atoms/Button.tsx
import { Pressable, Text } from 'react-native';
export const Button = ({ title, onPress }) => (
  <Pressable onPress={onPress} className="bg-blue-500 p-2 rounded">
    <Text className="text-white">{title}</Text>
  </Pressable>
);
```

**Molecules** — compose atoms only.
**Organisms** — compose molecules + atoms.

---

## Data Fetching

TanStack Query for all server data. Never raw `useState` + `useEffect` for fetching:

```ts
// features/rides/hooks/use-rides.ts
import { useQuery } from '@tanstack/react-query';
import { fetchRides } from '../services/rides.service';

export function useRides() {
  return useQuery({ queryKey: ['rides'], queryFn: fetchRides });
}
```

---

## Client State

Zustand for UI/client state only — never for server data:

```ts
// store/sidebar.store.ts
import { create } from 'zustand';

type SidebarStore = { open: boolean; toggle: () => void; };

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
}));
```

---

## Code Review Checklist

Flag any of these as violations during PRs or feature generation:

- [ ] `useState` + `useEffect` used for server data fetching
- [ ] Axios or any non-fetch HTTP library imported
- [ ] HTML elements (`div`, `span`) used instead of React Native primitives (`View`, `Text`)
- [ ] `any` type used anywhere
- [ ] UI primitives imported directly inside molecules or organisms (bypass atoms)
- [ ] Fetch logic inside a presentational component
- [ ] File name doesn't match its default export
- [ ] Missing TypeScript types on props, hooks, or functions

