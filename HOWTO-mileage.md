# Mileage Feature - How To Guide

## Accessing the Mileage Feature

### First-Time Users (Fresh Install)

1. Open the app — you'll see the **Bike Catalogue** screen
2. Select your bike and complete the setup flow (Questionnaire → Pre-Trip Checklist → Checklist Status)
3. On the **Checklist Status** screen, tap **"SET ODOMETER"** button at the bottom
4. Enter your current odometer reading using the +/- stepper or typing directly
5. Tap **"Save & Continue"** — you'll be taken to the **Dashboard**

### Returning Users (Setup Complete)

- Opening the app takes you directly to the **Dashboard**
- Your bike info, mileage, and service countdown are displayed automatically

### Accessing Odometer / Settings

From the **Dashboard**:
- Tap the **gear icon** (top right) → navigates to **Settings** (edit odometer, record oil change, clear data)
- Tap the **"Edit"** button on the Mileage card → navigates to **Odometer Input** screen

### Direct URL Navigation (Development)

| Screen | Route |
|---|---|
| Dashboard (home) | `/` (when profile + odometer are set) |
| Odometer Input | `/odometer-input` |
| Settings (odometer edit) | `/settings` |

---

## How It Works

### Service Interval Calculation

Oil change intervals are automatically determined by engine size:

| Engine Size | Interval |
|---|---|
| ≤ 125cc | 3,000 km |
| 126–155cc | 4,000 km |
| ≥ 156cc | 5,000 km |

### Service Countdown

The countdown shows how many kilometers remain before the next oil change:
- **Green** (>50% remaining): On track
- **Yellow** (25–50% remaining): Service soon
- **Red** (<25% remaining): Service due soon
- **At 0**: "Service due!" — you should get an oil change

### Recording an Oil Change

1. Tap the gear icon on the Dashboard to open Settings
2. Tap **"Record Oil Change"**
3. Confirm — this resets the service countdown to the full interval

### Data Persistence

- Odometer reading and service data are stored locally using AsyncStorage via Zustand's persist middleware
- Data survives app restarts and logout/re-login
- To reset everything, use **"Clear All Mileage Data"** in Settings

---

## Dashboard Layout

The dashboard displays:
1. **Header** — "My Bike" title with settings gear icon
2. **Bike Info Card** — vehicle type, engine size, fuel type, cooling, year (from motorcycle profile)
3. **Mileage Card** — current odometer reading + cumulative mileage with edit button
4. **Service Countdown** — circular progress ring + km remaining until next oil change
5. **Pre-Trip Check** — quick link to run self-diagnostic

---

## File Reference

### New Files Created

| File | Purpose |
|---|---|
| `src/config/constants.ts` | Service interval lookup by engine size |
| `src/features/mileage/types/mileage.ts` | `OdometerReading` type definition |
| `src/store/mileage.store.ts` | Zustand store with AsyncStorage persistence |
| `src/features/mileage/hooks/use-mileage.ts` | Hook that computes mileage + service data |
| `src/features/mileage/components/OdometerInputForm.tsx` | Stepper + text input form |
| `src/features/mileage/components/MileageCard.tsx` | Dashboard mileage display card |
| `src/features/mileage/components/ServiceCountdown.tsx` | Service countdown with circular progress |
| `src/features/mileage/containers/OdometerInputContainer.tsx` | Container for odometer input screen |
| `src/features/mileage/containers/MileageDashboardContainer.tsx` | Container for dashboard |
| `src/features/mileage/containers/OdometerSettingsContainer.tsx` | Container for settings/edit screen |
| `src/app/odometer-input.tsx` | Route: odometer input screen |
| `src/app/dashboard.tsx` | Route: dashboard screen |
| `src/app/settings.tsx` | Route: settings screen |

### Modified Files

| File | Change |
|---|---|
| `src/app/index.tsx` | Conditional: shows Dashboard if setup complete, Bike Catalogue otherwise |
| `src/features/pre-trip-checklist/components/PreTripChecklist.tsx` | Added optional `onSetOdometer` prop |
| `src/features/pre-trip-checklist/components/organisms/PreTripChecklistContent.tsx` | Added "SET ODOMETER" button (visible in status mode when mileage not set) |
| `src/features/pre-trip-checklist/containers/PreTripChecklistContainer.tsx` | Wired up odometer navigation + mileage store check |
