/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ["js", "ts", "json", "node"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/(*.)+(spec|test).[tj]s?(x)*"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};