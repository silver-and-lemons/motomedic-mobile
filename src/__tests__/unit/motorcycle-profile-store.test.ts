import { useMotorcycleProfileStore } from '../../store/motorcycle-profile.store';
import type { MotorcycleProfile } from '../../features/motorcycle-profile/types/motorcycle-profile';

const mockProfile: MotorcycleProfile = {
  make: 'Yamaha',
  model: 'MT-07',
  year: 2022,
  engineType: 'parallel-twin',
  displacementCc: 689,
  customFeatures: ['aftermarket-exhaust', 'crash-guards'],
  primaryUse: 'commuting',
  experienceLevel: 'intermediate',
};

beforeEach(() => {
  const { clearProfile } = useMotorcycleProfileStore.getState();
  clearProfile();
});

describe('useMotorcycleProfileStore', () => {
  it('starts with null profile and isComplete false', () => {
    const state = useMotorcycleProfileStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isComplete).toBe(false);
  });

  it('saveProfile sets profile and isComplete to true', () => {
    const { saveProfile } = useMotorcycleProfileStore.getState();
    saveProfile(mockProfile);

    const state = useMotorcycleProfileStore.getState();
    expect(state.profile).toEqual(mockProfile);
    expect(state.isComplete).toBe(true);
  });

  it('clearProfile resets to initial state', () => {
    const { saveProfile } = useMotorcycleProfileStore.getState();
    saveProfile(mockProfile);

    const { clearProfile } = useMotorcycleProfileStore.getState();
    clearProfile();

    const state = useMotorcycleProfileStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isComplete).toBe(false);
  });

  it('saveProfile overwrites existing profile', () => {
    const store = useMotorcycleProfileStore.getState();
    store.saveProfile(mockProfile);

    const updatedProfile: MotorcycleProfile = {
      ...mockProfile,
      make: 'Kawasaki',
      model: 'Ninja 400',
    };

    store.saveProfile(updatedProfile);

    const state = useMotorcycleProfileStore.getState();
    expect(state.profile).toEqual(updatedProfile);
    expect(state.profile?.make).toBe('Kawasaki');
  });

  it('maintains profile object integrity after save', () => {
    const { saveProfile } = useMotorcycleProfileStore.getState();
    saveProfile(mockProfile);

    const state = useMotorcycleProfileStore.getState();
    expect(state.profile).toMatchObject({
      make: expect.any(String),
      model: expect.any(String),
      year: expect.any(Number),
      engineType: expect.any(String),
      displacementCc: expect.any(Number),
      customFeatures: expect.any(Array),
      primaryUse: expect.any(String),
      experienceLevel: expect.any(String),
    });
  });
});
