# `@adaptyv/foundry-sdk`

TypeScript client for the **Adaptyv Foundry HTTP API** (experiments, targets, sequences, results, quotes, updates, tokens, feedback). This package lives in a monorepo next to **`@adaptyv/foundry-shared`** (Zod schemas and mock data derived from the public OpenAPI spec).

> **Disclaimer:** The SDK was built and tested against the **mock** implementation aligned with the OpenAPI spec, not against a verified live Foundry account. Minor mismatches or bugs are possible when calling the real API. See the [root README](../../README.md) for the full notice.

## Install (workspace / monorepo)

```bash
pnpm add @adaptyv/foundry-sdk
```

For a published copy from npm, use the same name once the package is released (see [Publishing stance](#publishing-stance-npm)).

## Usage

### Live API

Pass an API key from the [Foundry portal](https://foundry.adaptyvbio.com) (or Adaptyv). Defaults match the public API base URL; override with `baseUrl` or **`FOUNDRY_API_BASE_URL`**.

```typescript
import { FoundryClient } from "@adaptyv/foundry-sdk";

const client = new FoundryClient({
  apiKey: process.env.FOUNDRY_API_TOKEN!,
});

const { items, total } = await client.experiments.list({
  limit: 20,
  offset: 0,
});
```

If you omit `apiKey`, the constructor uses **`FOUNDRY_API_TOKEN`** from the environment when available.

### In-memory mock (tests, demos, MCP)

No network calls; responses come from **`@adaptyv/foundry-shared/mockdata`**.

```typescript
import { createMockFoundryClient } from "@adaptyv/foundry-sdk/mock";

const client = createMockFoundryClient();
const list = await client.experiments.list({});
```

### Errors

Non-success HTTP responses throw **`FoundryApiError`** with **`status`** and **`body`** for debugging.

## API surface

`FoundryClient` exposes:

`targets` · `experiments` · `sequences` · `results` · `quotes` · `updates` · `tokens` · `feedback`

Input/output types are exported from the main entry (see `src/index.ts`). The OpenAPI snapshot used in tests is [`tests/openapi.json`](tests/openapi.json).

## Scripts

```bash
pnpm --filter @adaptyv/foundry-sdk build
pnpm --filter @adaptyv/foundry-sdk test
pnpm --filter @adaptyv/foundry-sdk test:watch
```

## Publishing stance (npm)

The package is **set up like a publishable library** (`exports`, `dist/`, versioning). It is **not published** to npm under **`@adaptyv`** **on purpose**: this project is **not officially affiliated with Adaptyv Bio**, and a vendor-looking scope would imply endorsement without that relationship.

If that changes—or if the package is renamed to a clearly third-party scope—publishing is a matter of `pnpm build` and `npm publish` from this directory with the right registry access.

## Disclaimer

Independent project. Shapes and mocks are aligned with public API / OpenAPI material; validate against a real token before relying on behavior in production.
