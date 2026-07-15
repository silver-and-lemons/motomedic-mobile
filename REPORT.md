What Was Done (feat/mileage-input branch)
1. Bike Catalogue Selection Flow (57cff2d, e3f5c2f)
- Built a full bike catalogue screen where users can browse/search/filter motorcycles by brand
- Created src/features/bike-catalogue/ with screen, container, hooks, service, types, data, and mapper
- Mapper converts a selected catalogue bike into a MotorcycleProfile (vehicle type, engine size, fuel type, cooling type, year)
- "My bike is NOT in the list" button falls back to the manual questionnaire
- Added unit tests for the mapper and container (4/5 passing)
  
2. Odometer Input (797702e)
- Created src/features/mileage/ with types, Zustand store (AsyncStorage persistence), hook, components, and containers
- VehicleOdometer screen with a simple circle display, +/- increment buttons (100 km steps), and direct text input
- After confirming, shows wear status cards (Oil, Brake, Chain, Tyre) with maintenance/home buttons
- Mileage store persists currentKm, lastServiceKm, and serviceIntervalKm
  
3. Dashboard + Navigation + Design (8e46c98)
- WearGaugeBoard: neon mint circular gauge with 4 status rings + "Check Odometer" button
- MileageDashboardContainer: Bike Info card + WearGaugeBoard + Pre-Trip Check link
- OdometerSettingsContainer: maintenance status, wear detail cards, record service, clear data
- StatusRing: reusable small circular indicator with icon/label/status
- GlowingGauge: reusable neon mint circular gauge with glow effect (used in dashboard)
- Added routes: /dashboard, /odometer-input, /settings
- Fixed src/app/index.tsx to always start at bike catalogue (removed conditional dashboard)
- Added "SET ODOMETER" and "GO TO DASHBOARD" buttons to checklist status page
- Changed app entry to always start at bike catalogue
- Dark neon-mint theme applied across all new screens
  
4. Questionnaire Skip + Odometer Simplification (8e46c98)
- Bike catalogue now navigates to /questionnaire (policies step) instead of directly to checklist
- Questionnaire detects existing profile from Zustand and starts at step 5 (Policies Agreement) with form pre-filled
- Replaced complex GlowingGauge in VehicleOdometer with a simple circle
- Added increment/decrement buttons (±100 km) with editable text input
  
5. Merge Conflict Resolution (1b946ce, 7f6c2d9)
- Merged main into feat/mileage-input, resolving 4 conflicts:
- Kept MileageDashboardContainer over DashboardContainer in dashboard.tsx
- Restored expandable guide feature (expandedGuideItemId, onToggleGuide) from main in PreTripChecklistContent, PreTripChecklist, PreTripChecklistContainer
- Restored markCompleted/clearCompleted in pre-trip-checklist.store.ts
- Added expandable guide UI (chevron toggle + "How to check" panel) to ChecklistItemRow
  
6. Documentation (REPORT.md)
- Feature documentation covering navigation flow, screens, theme colours, service intervals, and file reference
  
Files Changed (30 total, +1649 / -9)

---

| Area               | New Files                                                             | Modified Files                                                                        |
| :----------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **Bike Catalogue** | 8 (Screen, Container, Hooks, Service, Mapper, Types, Data, Queries)   | —                                                                                     |
| **Mileage** | 9 (Types, Store, Hook, 4 Components, 3 Containers)                    | —                                                                                     |
| **App Routes** | 3 (`dashboard.tsx`, `odometer-input.tsx`, `settings.tsx`)             | `index.tsx`                                                                           |
| **Questionnaire** | —                                                                     | `QuestionnaireContainer.tsx`                                                          |
| **Checklist** | —                                                                     | `PreTripChecklist.tsx`, `PreTripChecklistContent.tsx`, `PreTripChecklistContainer.tsx` |
| **Config** | —                                                                     | `constants.ts`                                                                        |
| **Tests** | 2 (`BikeCatalogueContainer.test.tsx`, `bike-catalogue-mapper.test.ts`) | —                                                                                     |
| **Docs** | 1 (`REPORT.md`)                                                       | —                                                                                     |
| **Store** | —                                                                     | `pre-trip-checklist.store.ts`       
