module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/__tests__/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-reanimated)/)',
  ],
};
