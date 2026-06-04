jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  Stack: {
    Screen: jest.fn(({ children }) => children),
  },
  useLocalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  Link: jest.fn(({ children }) => children),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-gesture-handler', () => {
  const GestureHandler = jest.requireActual('react-native-gesture-handler');
  return {
    ...GestureHandler,
    GestureHandlerRootView: jest.fn(({ children }) => children),
  };
});

jest.mock('expo-status-bar', () => ({
  StatusBar: jest.fn(() => null),
}));
