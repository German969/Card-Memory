export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./setup.jest.js'],
  fakeTimers: {
    enableGlobally: true,
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|mp3)$': '<rootDir>/test/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.ts'
  }
}
