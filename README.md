---

### 3. Prepend to **`packages/mcp/README.md`** (keep everything after `# adaptyv-foundry-mcp` that you already have, or merge these sections after the title)

Add **right after** the first line `# adaptyv-foundry-mcp`:

```markdown

## How it works (architecture)

- **Foundry access** — The server constructs a **`FoundryClient`** from [`@adaptyv/foundry-sdk`](../sdk) (see `packages/mcp/src/foundry-client.ts`). All MCP tools delegate to that client.
- **Transports** — **stdio** (default) for local tools and Cursor `command`-style config; **`MODE=http`** runs **Hono** + **`WebStandardStreamableHTTPServerTransport`** on **`/mcp`** (see `packages/mcp/src/server/transports/`).
- **Tool registration** — MCP tools are thin wrappers around SDK methods with Zod-validated arguments (`packages/mcp/src/tools/`).

## Demo / example hosted MCP (Streamable HTTP)

An example deployment (configuration may be **mock** or **live** depending on operator env vars):

- **Health:** `https://adaptyv-foundry.onrender.com/health`
- **MCP endpoint:** `https://adaptyv-foundry.onrender.com/mcp`  
  Send header **`Authorization: Bearer <MCP_HTTP_API_KEY>`** (value is whatever the operator set on Render).

Do not treat this as a guaranteed SLA or as storing your data; it is a **demo**. For production, deploy your own instance (see below).

## One-click deploy (your own instance)

From the **repo root**, Render can provision from [`render.yaml`](../../render.yaml):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/joostwmd/adaptyv-foundry)

After deploy: set **`FOUNDRY_API_TOKEN`** and copy **`MCP_HTTP_API_KEY`** into your client (e.g. Cursor `.cursor/mcp.json`). Use URL **`https://<your-service>.onrender.com/mcp`**.

## Mock mode vs real (Foundry API) mode

| | **Mock** | **Real (live API)** |
|--|----------|---------------------|
| **Env** | `FOUNDRY_USE_MOCK=1` (or `true` / `yes`) | unset or `0` |
| **Foundry** | **`createMockFoundryClient()`** — in-memory data from `@adaptyv/foundry-shared/mockdata`; **no HTTP** to Adaptyv | **`FoundryClient`** calls **`foundry-api-public.adaptyvbio.com`** (or `FOUNDRY_API_BASE_URL`) with **`FOUNDRY_API_TOKEN`** |
| **`FOUNDRY_API_TOKEN`** | Still **required** at process startup (same env contract); not sent to Foundry in mock mode | Used as **Bearer** on every Foundry request |
| **MCP HTTP auth** | Unchanged: **`MCP_HTTP_API_KEY`** still protects **`/mcp`** when `MODE=http` | Same |

---
