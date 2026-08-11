/** @type {import('jest').Config} */
const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  preset: 'jest-expo',
  setupFiles: [...expoPreset.setupFiles, './jest.setup.ts'],
  transformIgnorePatterns: [
    ...expoPreset.transformIgnorePatterns,
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|expo|@expo|expo-router|@hookform|@tanstack|react-hook-form|nativewind|react-native-css-interop|zod|zustand|@testing-library|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-worklets|react-native-web|expo-modules-core|expo-constants|expo-secure-store|expo-status-bar|expo-font|expo-linking|expo-device|class-variance-authority|clsx|tailwind-merge)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
  },
};
