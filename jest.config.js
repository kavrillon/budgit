module.exports = {
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/app/$1',
    '@importer/(.*)': '<rootDir>/importer/$1',
    '@libs/(.*)': '<rootDir>/libs/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@types/(.*)': '<rootDir>/@types/$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '<rootDir>/app/**/*.spec.(ts|tsx|js)',
    '<rootDir>/importer/**/*.spec.(ts|tsx|js)',
    '<rootDir>/libs/**/*.spec.(ts|tsx|js)',
  ],
};
