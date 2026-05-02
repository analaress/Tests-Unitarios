/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'src/config/'],
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/build/', '<rootDir>/dist/'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
