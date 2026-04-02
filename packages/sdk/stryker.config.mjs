/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  packageManager: "pnpm",
  testRunner: "vitest",
  plugins: ["@stryker-mutator/vitest-runner", "stryker-reporter-llm"],
  mutate: ["src/**/*.ts", "!src/index.ts", "!src/types.ts"],
  reporters: ["html", "json", "stryker-reporter-llm"],
  vitest: {
    configFile: "vitest.config.ts",
  },
};
