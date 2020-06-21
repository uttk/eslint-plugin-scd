module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  testMatch: ["**/src/**/*.test.ts"],

  testPathIgnorePatterns: ["/node_modules/", "\\.d\\.ts$", "lib/.*"],

  moduleFileExtensions: ["js", "ts"],
};
