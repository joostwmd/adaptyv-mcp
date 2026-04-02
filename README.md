# adaptyv-foundry

Monorepo: TypeScript SDK for the Adaptyv Foundry API and an MCP server.

- **Mock MCP / Inspector (no token):** `cd packages/mcp && pnpm run inspector` (sets `FOUNDRY_USE_MOCK`).
- **Live API MCP:** `FOUNDRY_API_TOKEN=… pnpm run inspector:api` in `packages/mcp`.
- **Stdio MCP with mock:** `pnpm mcp:mock` from repo root.

Shared canned data: `@adaptyv/foundry-shared/mockdata`. In-memory client: `createMockFoundryClient` from `@adaptyv/foundry-sdk/mock`.

See `.env.example` for environment variables.
