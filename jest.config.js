module.exports = {
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/app/$1',
    '@libs/(.*)': '<rootDir>/libs/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '<rootDir>/app/**/*.spec.(ts|tsx|js)',
    '<rootDir>/libs/**/*.spec.(ts|tsx|js)',
  ],
};
