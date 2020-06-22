module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  testMatch: ["**/tests/**/*.test.ts"],

  testPathIgnorePatterns: ["/node_modules/", "\\.d\\.ts$"],

  moduleFileExtensions: ["js", "ts"],
};
