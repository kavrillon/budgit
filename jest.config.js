module.exports = {
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/libs/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '<rootDir>/libs/**/*.spec.(ts|tsx|js)',
    '<rootDir>/src/**/*.spec.(ts|tsx|js)',
  ],
};
