# Mileage Feature - How To Guide

## Accessing the Mileage Feature

### First-Time Users (Fresh Install)

1. Open the app — you'll see the **Bike Catalogue** screen
2. Select your bike and complete the setup flow (Questionnaire → Pre-Trip Checklist → Checklist Status)
3. On the **Checklist Status** screen, tap **"SET ODOMETER"** button at the bottom
4. Enter your starting mileage in the input field and tap **"Confirm"**
5. You'll see the summary view with wear status — tap **"Back to home"** to go to the Dashboard

### Returning Users (Setup Complete)

- Opening the app takes you directly to the **Dashboard**
- The **Wear gauge board** section shows your mileage in a glowing circular gauge with wear status rings for Oil, Brake, Chains, and Tyre

### Accessing Odometer / Settings

From the **Dashboard**:
- Tap **"Check Odometer"** button → navigates to the **Vehicle Odometer** screen (summary view with status metrics)
- Tap the **gear icon** (top right) → navigates to **Settings** (maintenance status, record oil change, clear data)

### Direct URL Navigation (Development)

| Screen | Route |
|---|---|
| Dashboard (home) | `/` (when profile + odometer are set) |
| Vehicle Odometer | `/odometer-input` |
| Settings | `/settings` |

---

## Screens

### Dashboard

1. **Header** — "My Bike" with settings gear icon
2. **Bike Info Card** — vehicle type, engine, fuel, cooling, year + odometer reading
3. **Wear gauge board** — glowing neon mint circular gauge with motorcycle icon, surrounded by 4 status rings (Oil, Brake, Chains, Tyre), "Check Odometer" button
4. **Pre-Trip Check** — quick link to self-diagnostic

### Vehicle Odometer (Full Screen)

**State A — Initial Entry:**
- Large neon mint gauge with motorcycle icon
- "Enter your starting Mileage" prompt + text input
- "Confirm" button

**State B — Summary:**
- Same gauge now showing "nn km"
- Vertical list of 4 wear status items (Oil, Brake, Chain, Tyre)
- "Go to Maintenance" (coral) + "Back to home" (neon mint) buttons

### Settings (Maintenance Status)

- Current odometer reading + service details
- Wear status cards for Oil, Brake, Chain, Tyre
- "Record Oil Change" + "Clear All Mileage Data" buttons

---

## Theme

| Element | Color |
|---|---|
| Background | `#0D1518` / `#121B1E` |
| Primary accent (neon mint) | `#16FFB0` |
| Warning (coral red) | `#FF6B4A` |
| Headers | `#FFFFFF` |
| Secondary text | `#8A999E` |
| Card borders | `#1e2d33` |

---

## Service Intervals (Fixed by Engine Size)

| Engine Size | Interval |
|---|---|
| ≤ 125cc | 3,000 km |
| 126–155cc | 4,000 km |
| ≥ 156cc | 5,000 km |

---

## File Reference

### Current Files

| File | Purpose |
|---|---|
| `src/config/constants.ts` | Service interval lookup |
| `src/features/mileage/types/mileage.ts` | `OdometerReading` type |
| `src/store/mileage.store.ts` | Zustand store with AsyncStorage persistence |
| `src/features/mileage/hooks/use-mileage.ts` | Computes mileage + service data |
| `src/features/mileage/components/GlowingGauge.tsx` | Reusable neon mint circular gauge |
| `src/features/mileage/components/StatusRing.tsx` | Small status indicator ring |
| `src/features/mileage/components/WearGaugeBoard.tsx` | Dashboard wear gauge section |
| `src/features/mileage/components/VehicleOdometer.tsx` | Full-screen odometer (2 states) |
| `src/features/mileage/containers/OdometerInputContainer.tsx` | Container for odometer screen |
| `src/features/mileage/containers/MileageDashboardContainer.tsx` | Container for dashboard |
| `src/features/mileage/containers/OdometerSettingsContainer.tsx` | Container for settings |
| `src/app/odometer-input.tsx` | Route: vehicle odometer |
| `src/app/dashboard.tsx` | Route: dashboard |
| `src/app/settings.tsx` | Route: settings |

### Modified Files

| File | Change |
|---|---|
| `src/app/index.tsx` | Conditional: Dashboard if setup done, BikeCatalogue otherwise |
| `src/features/pre-trip-checklist/components/PreTripChecklist.tsx` | Added `onSetOdometer` prop |
| `src/features/pre-trip-checklist/components/organisms/PreTripChecklistContent.tsx` | Added "SET ODOMETER" button |
| `src/features/pre-trip-checklist/containers/PreTripChecklistContainer.tsx` | Wired odometer navigation |
