module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  moduleNameMapper: { '\\.(png|svg)$': '<rootDir>/src/test/assetMock.cjs' },
  collectCoverageFrom: ['src/components/**/*.{js,jsx}', 'src/utils/**/*.js'],
  coverageThreshold: { global: { branches: 90, functions: 90, lines: 90, statements: 90 } },
};
