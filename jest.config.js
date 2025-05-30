module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|@react-navigation'
      + '|react-clone-referenced-element'
      + '|react-native-reanimated'
      + '|react-native-skeleton-placeholder'
      + '|react-native-animatable'
    + ')/)',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest', // ensure Babel handles all js/ts/tsx
  },
};
