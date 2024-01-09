import { JestConfigWithTsJest } from 'ts-jest';

const options: JestConfigWithTsJest = {
  preset: 'ts-jest',
  // roots: ['./src'],
  // setupFilesAfterEnv: ['./src/test/jest.setup.ts'],
  testEnvironment: 'node',
  // modulePathIgnorePatterns: ['<rootDir>/src/settings'],
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname',
  // ],
};

export default options;
