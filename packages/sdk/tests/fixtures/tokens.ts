export const tokenFixtures = {
  list: {
    query: { limit: 50, offset: 0 },
    response: {
      items: [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          name: "Production API token",
          kind: "root",
          created_at: "2026-01-01T00:00:00Z",
          expires_at: null,
          parent_token_id: null,
          root_token_id: null,
          revoked_at: null,
          token_type: "user",
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  attenuate: {
    requestBody: {
      token: "abs0_FLOWBIO1deadbeef",
      name: "Read-only dashboard token",
      attenuation: { read_only: true },
    },
    response: {
      token: "abs0_FLOWBIO1childtoken",
      id: "660e8400-e29b-41d4-a716-446655440001",
    },
  },
  revoke: {
    response: {
      token_id: "550e8400-e29b-41d4-a716-446655440000",
      revoked_at: "2026-02-20T18:00:00Z",
      children_revoked: 3,
    },
  },
} as const;
