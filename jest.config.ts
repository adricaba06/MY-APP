import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json"
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};

export default config;
